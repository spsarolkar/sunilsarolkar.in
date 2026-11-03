"use client";

import { useEffect, useId, useMemo, useState } from 'react';
import { csvParse } from 'd3';
import {
  buildExpressionDataset, paginateExpressions, queryExpressions, splitKeys,
  type ExpressionDataset, type ExpressionFilter, type ExpressionSort,
} from './expressionData';
import './expression-explorer.css';

const splitLabels = { training: 'Training', testing: 'Testing', validation: 'Validation' };
const number = (value: number) => value.toLocaleString('en-IN');
const sortOptions: { value: string; label: string; sort: ExpressionSort; direction: 'asc' | 'desc' }[] = [
  { value: 'name', label: 'Expression A–Z', sort: 'name', direction: 'asc' },
  { value: 'training-desc', label: 'Training: most first', sort: 'training', direction: 'desc' },
  { value: 'training-asc', label: 'Training: fewest first', sort: 'training', direction: 'asc' },
  { value: 'testing-asc', label: 'Testing: fewest first', sort: 'testing', direction: 'asc' },
  { value: 'validation-asc', label: 'Validation: fewest first', sort: 'validation', direction: 'asc' },
  { value: 'declared-desc', label: 'Declared total: most first', sort: 'declared', direction: 'desc' },
];

export default function ExpressionsPlot() {
  const id = useId();
  const [dataset, setDataset] = useState<ExpressionDataset | null>(null);
  const [error, setError] = useState(false);
  const [attempt, setAttempt] = useState(0);
  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState<ExpressionFilter>('all');
  const [sortValue, setSortValue] = useState('name');
  const [threshold, setThreshold] = useState('5');
  const [view, setView] = useState<'bars' | 'bubbles'>('bars');
  const [page, setPage] = useState(0);
  const pageSize = 12;

  useEffect(() => {
    const controller = new AbortController();
    setError(false);
    setDataset(null);
    async function load() {
      try {
        const response = await fetch('/projects/ISL/expression_counts.csv', { signal: controller.signal });
        if (!response.ok) throw new Error('Count snapshot unavailable');
        const data = buildExpressionDataset(csvParse(await response.text()));
        if (!controller.signal.aborted) setDataset(data);
      } catch {
        if (!controller.signal.aborted) setError(true);
      }
    }
    void load();
    return () => controller.abort();
  }, [attempt]);

  const sort = sortOptions.find(option => option.value === sortValue) ?? sortOptions[0];
  const results = useMemo(() => queryExpressions(dataset?.expressions ?? [], {
    search, filter, threshold: threshold === '' ? 5 : Number(threshold), sort: sort.sort, direction: sort.direction,
  }), [dataset, search, filter, threshold, sort.sort, sort.direction]);
  const paged = paginateExpressions(results, page, pageSize);

  function reset() {
    setSearch(''); setFilter('all'); setSortValue('name'); setThreshold('5'); setPage(0);
  }

  if (error) return <div className="demo-empty" role="status"><p>The expression-count snapshot could not be loaded. Please try again, or open the source CSV.</p><div className="lab-actions mt-4"><button type="button" className="lab-button secondary" onClick={() => setAttempt(value => value + 1)}>Try again</button><a className="lab-link" href="/projects/ISL/expression_counts.csv">Open count CSV ↗</a></div></div>;
  if (!dataset) return <p className="demo-empty" role="status">Loading the expression-count snapshot…</p>;

  const maxCount = Math.max(1, ...dataset.expressions.flatMap(row => splitKeys.map(split => row.counts[split] ?? 0)));
  const maxSplit = Math.max(1, ...Object.values(dataset.splitTotals));
  const maxBin = Math.max(1, ...dataset.trainingDistribution.map(bin => bin.count));
  const controlsId = `${id}-controls`;
  const mismatchExample = dataset.expressions.find(row => row.discrepancy !== null && row.discrepancy !== 0);

  return <div className="expression-explorer">
    <p className="prose-copy">A closer look at the site’s bundled count snapshot: {dataset.expressions.length} expressions. This is a separate snapshot from the historical 263-word dataset described above. <a href="/projects/ISL/expression_counts.csv" download>Download the source CSV ↓</a></p>

    <dl className="dataset-metrics">
      <div><dt>Expressions in this snapshot</dt><dd>{number(dataset.expressions.length)}</dd></div>
      <div><dt>Sum of recorded split counts</dt><dd>{number(dataset.recordedSplitSum)}</dd></div>
      <div><dt>Expressions with all three rows</dt><dd>{dataset.completeExpressions}<span> / {dataset.expressions.length}</span></dd></div>
    </dl>

    <details className="snapshot-audit">
      <summary>Data checks: {dataset.mismatchedExpressions} totals differ; {dataset.incompleteExpressions} expressions have missing split rows</summary>
      <div className="prose-copy">
        <p>The declared totals sum to <strong>{number(dataset.declaredTotal)}</strong>, while the recorded training, testing and validation counts sum to <strong>{number(dataset.recordedSplitSum)}</strong>. {mismatchExample && <>For example, {mismatchExample.expression} has a recorded split sum of {mismatchExample.splitSum}, with a declared total of {mismatchExample.declaredTotal}.</>}</p>
        <p><strong>{dataset.missingRows} split rows are not recorded.</strong> Missing entries are shown explicitly; they are not treated as zero. An incomplete sum below a declared total cannot establish a discrepancy.</p>
        <p>These are metadata checks. They do not establish a unique video count, split overlap, signer independence or model performance. The original CSV is unchanged.</p>
      </div>
    </details>

    <div className="data-overview-grid">
      <figure className="data-panel">
        <figcaption><h3>Recorded split counts</h3><p>Compare counts and expression coverage.</p></figcaption>
        <ul className="overview-bars">
          {splitKeys.map(split => <li key={split}>
            <div className="chart-value-line"><span><i className={`split-key ${split}`} aria-hidden="true" />{splitLabels[split]}</span><strong>{number(dataset.splitTotals[split])}</strong></div>
            <div className="overview-track" aria-hidden="true"><span className={split} style={{ width: `${100 * dataset.splitTotals[split] / maxSplit}%` }} /></div>
            <p>{dataset.splitCoverage[split]} / {dataset.expressions.length} expressions have a recorded row</p>
          </li>)}
        </ul>
      </figure>
      <figure className="data-panel">
        <figcaption><h3>How much training data per expression?</h3><p>Distribution across {dataset.splitCoverage.training} expressions with training rows.</p></figcaption>
        <ul className="distribution-bars">
          {dataset.trainingDistribution.map(bin => <li key={bin.label}>
            <span>{bin.label}<small> recorded</small></span>
            <div className="overview-track" aria-hidden="true"><span className="training" style={{ width: `${100 * bin.count / maxBin}%` }} /></div>
            <strong>{bin.count}<span className="sr-only"> expressions</span></strong>
          </li>)}
        </ul>
        <p className="chart-caption">Bar length shows the number of expressions in each count range. Missing training rows are excluded.</p>
      </figure>
    </div>

    <div id={controlsId} className="explorer-heading">
      <h3>Explore each expression</h3>
      <p>Find coverage gaps, compare raw counts, or inspect a total.</p>
    </div>
    <div className="explorer-controls">
      <div><label htmlFor={`${id}-search`}>Find an expression</label><input id={`${id}-search`} type="search" value={search} placeholder="Search, e.g. Hello" onChange={event => { setSearch(event.target.value); setPage(0); }} /></div>
      <div><label htmlFor={`${id}-filter`}>Show</label><select id={`${id}-filter`} value={filter} onChange={event => { setFilter(event.target.value as ExpressionFilter); setPage(0); }}>
        <option value="all">All expressions</option><option value="missing">Missing split rows</option><option value="inconsistent">Inconsistent totals</option><option value="low-training">Low training counts</option>
      </select></div>
      <div><label htmlFor={`${id}-sort`}>Sort by</label><select id={`${id}-sort`} value={sortValue} onChange={event => { setSortValue(event.target.value); setPage(0); }}>
        {sortOptions.map(option => <option key={option.value} value={option.value}>{option.label}</option>)}
      </select></div>
      {filter === 'low-training' && <div><label htmlFor={`${id}-threshold`}>Training count at most</label><input id={`${id}-threshold`} type="number" min="0" step="1" value={threshold} placeholder="5" onChange={event => { setThreshold(event.target.value === '' ? '' : String(Math.max(0, Math.floor(Number(event.target.value))))); setPage(0); }} /></div>}
    </div>
    <div className="explorer-view-line">
      <fieldset className="explorer-view"><legend className="sr-only">Count display</legend><button type="button" aria-pressed={view === 'bars'} onClick={() => setView('bars')}>Bars</button><button type="button" aria-pressed={view === 'bubbles'} onClick={() => setView('bubbles')}>Bubbles</button></fieldset>
      <button type="button" className="lab-link" onClick={reset}>Reset filters</button>
    </div>
    <p className="chart-caption">Shared count scale: 0–{maxCount}. {view === 'bars' ? 'Bar length is proportional to the recorded count.' : 'Bubble area is proportional to the recorded count.'} Exact counts stay visible; “Not recorded” indicates a missing row.</p>

    <div className="explorer-result-line">
      <p role="status" aria-live="polite">{results.length ? `${paged.page * pageSize + 1}–${Math.min((paged.page + 1) * pageSize, results.length)} of ${results.length} ${results.length === 1 ? 'expression' : 'expressions'}` : 'No matching expressions'}</p>
      <div className="explorer-pagination"><button type="button" onClick={() => setPage(paged.page - 1)} disabled={paged.page === 0} aria-label="Previous expression page">← Previous</button><span>{paged.page + 1} / {paged.pageCount}</span><button type="button" onClick={() => setPage(paged.page + 1)} disabled={paged.page + 1 === paged.pageCount} aria-label="Next expression page">Next →</button></div>
    </div>

    {!results.length && <p className="demo-empty">Try another expression, or reset the filters to return to the full snapshot.</p>}
    <ol className={`expression-rows view-${view}`}>
      {paged.items.map(row => <li className="expression-row" key={row.expression}>
        <div className="expression-row-heading"><h4>{row.expression}</h4>{row.discrepancy !== null && row.discrepancy !== 0 && <span className="data-flag">Total differs</span>}{row.missing.length > 0 && <span className="data-flag missing-flag">Missing {row.missing.length} {row.missing.length === 1 ? 'row' : 'rows'}</span>}</div>
        <div className="expression-splits">{splitKeys.map(split => {
          const count = row.counts[split];
          const diameter = count === null ? 0 : 30 * Math.sqrt(count / maxCount);
          return <div className="split-metric" key={split}>
            <div className="chart-value-line"><span><i className={`split-key ${split}`} aria-hidden="true" />{splitLabels[split]}</span>{count !== null && <strong>{count}</strong>}</div>
            {count === null ? <span className="not-recorded">Not recorded</span> : <div className="count-visual" aria-hidden="true"><span className={split} style={view === 'bars' ? { width: `${100 * count / maxCount}%` } : { width: diameter, height: diameter }} /></div>}
          </div>;
        })}</div>
        <details className="expression-total"><summary>Totals & data checks</summary><div><p>Recorded split sum: <strong>{row.splitSum}</strong>{row.missing.length > 0 ? ' (partial)' : ''}. Declared total: <strong>{row.declaredTotal ?? 'Not recorded'}</strong>.</p>{row.declaredTotal === null ? <p>The declared total is not recorded; reconciliation cannot be checked.</p> : row.discrepancy !== null && row.discrepancy !== 0 ? <p>The recorded split sum differs from the declared total by {row.discrepancy > 0 ? '+' : ''}{row.discrepancy}.</p> : row.missing.length > 0 ? <p>Split coverage is incomplete; missing entries do not establish zero examples.</p> : <p>The recorded counts reconcile to the declared total.</p>}</div></details>
      </li>)}
    </ol>
    {results.length > pageSize && <a className="lab-link" href={`#${controlsId}`}>Back to explorer controls ↑</a>}

    <details className="analysis-next">
      <summary>What else could we learn from the data?</summary>
      <div className="prose-copy"><p>This snapshot helps identify uneven class counts and incomplete split records. Further analysis would need richer evidence:</p><ul>
        <li><strong>Clip duration and usable frames:</strong> distributions by expression and split, from a full per-clip inventory.</li>
        <li><strong>Pose completeness and movement:</strong> body/hand detection coverage and motion ranges across all clips. The bundled pose sample contains only one demonstration clip.</li>
        <li><strong>Signer balance and overlap:</strong> signer IDs to check whether people appear across training and evaluation splits.</li>
        <li><strong>Confusions and errors:</strong> held-out predictions to compare per-expression precision, recall and recurring mistakes.</li>
      </ul></div>
    </details>
  </div>;
}
