export const splitKeys = ['training', 'testing', 'validation'] as const;
export type Split = typeof splitKeys[number];
export type CountRow = { Expression?: string; count?: string; split?: string };
export type ExpressionCount = {
  expression: string;
  counts: Record<Split, number | null>;
  declaredTotal: number | null;
  splitSum: number;
  missing: Split[];
  discrepancy: number | null;
};
export type ExpressionDataset = {
  expressions: ExpressionCount[];
  splitTotals: Record<Split, number>;
  splitCoverage: Record<Split, number>;
  recordedSplitSum: number;
  declaredTotal: number;
  missingRows: number;
  completeExpressions: number;
  incompleteExpressions: number;
  mismatchedExpressions: number;
  trainingDistribution: { label: string; min: number; max: number | null; count: number }[];
};
export type ExpressionFilter = 'all' | 'missing' | 'inconsistent' | 'low-training';
export type ExpressionSort = 'name' | Split | 'declared' | 'splitSum';
export type ExpressionQuery = {
  search?: string;
  filter?: ExpressionFilter;
  threshold?: number;
  sort?: ExpressionSort;
  direction?: 'asc' | 'desc';
};

const collator = new Intl.Collator('en', { sensitivity: 'base', numeric: true });

export function buildExpressionDataset(rows: readonly CountRow[]): ExpressionDataset {
  if (!rows.length) throw new Error('No expression counts were found in the snapshot.');
  const grouped = new Map<string, Map<string, number>>();
  rows.forEach((row) => {
    const expression = row.Expression?.trim();
    const split = row.split?.trim();
    const rawCount = row.count?.trim() ?? '';
    if (!expression) throw new Error('A count row is missing its expression name.');
    if (!split || ![...splitKeys, 'total'].includes(split)) throw new Error(`Unknown split for ${expression}.`);
    const count = Number(rawCount);
    if (!/^\d+$/.test(rawCount) || !Number.isSafeInteger(count)) throw new Error(`Invalid count for ${expression}.`);
    const group = grouped.get(expression) ?? new Map<string, number>();
    if (group.has(split)) throw new Error(`Duplicate expression and split: ${expression}, ${split}.`);
    group.set(split, count);
    grouped.set(expression, group);
  });

  const expressions = Array.from(grouped, ([expression, values]): ExpressionCount => {
    const counts = Object.fromEntries(splitKeys.map(split => [split, values.get(split) ?? null])) as Record<Split, number | null>;
    const missing = splitKeys.filter(split => counts[split] === null);
    const splitSum = splitKeys.reduce((sum, split) => sum + (counts[split] ?? 0), 0);
    const declaredTotal = values.get('total') ?? null;
    // A partial sum below its declared total cannot establish a discrepancy.
    const canCompare = declaredTotal !== null && (!missing.length || splitSum > declaredTotal);
    return { expression, counts, declaredTotal, splitSum, missing, discrepancy: canCompare ? splitSum - declaredTotal! : null };
  });
  const splitTotals = Object.fromEntries(splitKeys.map(split => [split, expressions.reduce((sum, row) => sum + (row.counts[split] ?? 0), 0)])) as Record<Split, number>;
  const splitCoverage = Object.fromEntries(splitKeys.map(split => [split, expressions.filter(row => row.counts[split] !== null).length])) as Record<Split, number>;
  const trainingDistribution = [
    { label: '0–4', min: 0, max: 4 },
    { label: '5–9', min: 5, max: 9 },
    { label: '10–14', min: 10, max: 14 },
    { label: '15+', min: 15, max: null },
  ].map(bin => ({ ...bin, count: expressions.filter(row => {
    const value = row.counts.training;
    return value !== null && value >= bin.min && (bin.max === null || value <= bin.max);
  }).length }));
  const completeExpressions = expressions.filter(row => !row.missing.length).length;
  return {
    expressions, splitTotals, splitCoverage, trainingDistribution,
    recordedSplitSum: splitKeys.reduce((sum, split) => sum + splitTotals[split], 0),
    declaredTotal: expressions.reduce((sum, row) => sum + (row.declaredTotal ?? 0), 0),
    missingRows: expressions.reduce((sum, row) => sum + row.missing.length, 0),
    completeExpressions,
    incompleteExpressions: expressions.length - completeExpressions,
    mismatchedExpressions: expressions.filter(row => row.discrepancy !== null && row.discrepancy !== 0).length,
  };
}

export function queryExpressions(expressions: readonly ExpressionCount[], options: ExpressionQuery = {}): ExpressionCount[] {
  const search = options.search?.trim().toLocaleLowerCase('en') ?? '';
  const threshold = Number.isFinite(options.threshold) ? Math.max(0, options.threshold!) : 5;
  const filtered = expressions.filter(row => {
    if (search && !row.expression.toLocaleLowerCase('en').includes(search)) return false;
    if (options.filter === 'missing') return row.missing.length > 0;
    if (options.filter === 'inconsistent') return row.discrepancy !== null && row.discrepancy !== 0;
    if (options.filter === 'low-training') return row.counts.training !== null && row.counts.training <= threshold;
    return true;
  });
  const sort = options.sort ?? 'name';
  const direction = options.direction === 'desc' ? -1 : 1;
  return filtered.sort((a, b) => {
    if (sort === 'name') return direction * collator.compare(a.expression, b.expression);
    const value = (row: ExpressionCount) => sort === 'declared' ? row.declaredTotal : sort === 'splitSum' ? row.splitSum : row.counts[sort];
    const left = value(a), right = value(b);
    if (left === null && right !== null) return 1;
    if (right === null && left !== null) return -1;
    return (left !== null && right !== null ? direction * (left - right) : 0) || collator.compare(a.expression, b.expression);
  });
}

export function paginateExpressions(expressions: readonly ExpressionCount[], page: number, pageSize: number) {
  if (!Number.isInteger(pageSize) || pageSize < 1) throw new Error('Page size must be a positive integer.');
  const pageCount = Math.max(1, Math.ceil(expressions.length / pageSize));
  const safePage = Math.max(0, Math.min(pageCount - 1, Number.isFinite(page) ? Math.floor(page) : 0));
  return { items: expressions.slice(safePage * pageSize, (safePage + 1) * pageSize), page: safePage, pageCount };
}
