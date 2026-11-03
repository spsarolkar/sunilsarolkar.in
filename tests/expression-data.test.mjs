import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { csvParse } from 'd3';

const model = await import('../app/projects/ISL-IndianSignLanguageTranslation/components/expressionData.ts').catch(() => null);
function api() {
  assert.ok(model, 'The typed expression-count model must be implemented');
  return model;
}
const row = (Expression, split, count) => ({ Expression, split, count: String(count) });
const fixture = [
  row('Adult','training',15), row('Adult','testing',5), row('Adult','validation',4), row('Adult','total',20),
  row('Today','testing',1), row('Today','total',1),
  row('Zero','training',0), row('Zero','testing',2), row('Zero','validation',1), row('Zero','total',3),
  row('Partial','training',3), row('Partial','total',5),
];

test('aggregates raw split counts separately from declared totals', () => {
  const data = api().buildExpressionDataset(fixture);
  assert.deepEqual(data.splitTotals, { training:18, testing:8, validation:5 });
  assert.equal(data.recordedSplitSum,31);
  assert.equal(data.declaredTotal,29);
  assert.deepEqual(data.splitCoverage, { training:3, testing:3, validation:2 });
  assert.equal(data.completeExpressions,2);
  assert.equal(data.missingRows,4);
});

test('distinguishes absent rows from measured zero', () => {
  const data = api().buildExpressionDataset(fixture);
  const today = data.expressions.find(x => x.expression === 'Today');
  const zero = data.expressions.find(x => x.expression === 'Zero');
  assert.equal(today.counts.training,null);
  assert.deepEqual(today.missing,['training','validation']);
  assert.equal(zero.counts.training,0);
  assert.deepEqual(zero.missing,[]);
});

test('flags impossible totals without declaring partial sums complete', () => {
  const data = api().buildExpressionDataset(fixture);
  assert.equal(data.expressions.find(x=>x.expression==='Adult').discrepancy,4);
  assert.equal(data.expressions.find(x=>x.expression==='Partial').discrepancy,null);
  assert.equal(data.mismatchedExpressions,1);
  const partial = api().buildExpressionDataset([row('X','training',7),row('X','total',5)]);
  assert.equal(partial.expressions[0].discrepancy,2);
});

test('rejects ambiguous or invalid count records', () => {
  const {buildExpressionDataset: build} = api();
  assert.throws(()=>build([]),/No expression/i);
  assert.throws(()=>build([row('X','training',-1)]),/count/i);
  assert.throws(()=>build([row('X','training','2.5')]),/count/i);
  assert.throws(()=>build([row('X','training','')]),/count/i);
  assert.throws(()=>build([row('X','training','9007199254740992')]),/count/i);
  assert.throws(()=>build([row('','training',1)]),/expression/i);
  assert.throws(()=>build([row('X','train',1)]),/split/i);
  assert.throws(()=>build([row('X','training',1),row('X','training',2)]),/duplicate/i);
});

test('search and integrity filters preserve missing-value semantics', () => {
  const {buildExpressionDataset: build, queryExpressions: query} = api();
  const data = build(fixture).expressions;
  assert.deepEqual(query(data,{search:'  ADU  '}).map(x=>x.expression),['Adult']);
  assert.deepEqual(query(data,{filter:'missing'}).map(x=>x.expression),['Partial','Today']);
  assert.deepEqual(query(data,{filter:'inconsistent'}).map(x=>x.expression),['Adult']);
  assert.deepEqual(query(data,{filter:'low-training',threshold:0}).map(x=>x.expression),['Zero']);
  assert.deepEqual(query(data,{filter:'low-training',threshold:3}).map(x=>x.expression),['Partial','Zero']);
  assert.deepEqual(query(data,{search:'zzzz'}),[]);
  assert.deepEqual(query(data,{search:'Today',filter:'inconsistent'}),[]);
});

test('sorts raw counts with missing values last in both directions', () => {
  const {buildExpressionDataset: build, queryExpressions: query} = api();
  const data = build(fixture).expressions;
  assert.deepEqual(query(data,{sort:'training',direction:'asc'}).map(x=>x.expression),['Zero','Partial','Adult','Today']);
  assert.deepEqual(query(data,{sort:'training',direction:'desc'}).map(x=>x.expression),['Adult','Partial','Zero','Today']);
  assert.deepEqual(query(data,{sort:'name',direction:'desc'}).map(x=>x.expression),['Zero','Today','Partial','Adult']);
  assert.equal(data[0].expression,'Adult');
});

test('pagination clamps pages and represents an empty result safely', () => {
  const {buildExpressionDataset: build, paginateExpressions: paginate} = api();
  const data = build(fixture).expressions;
  assert.deepEqual(paginate(data,99,3).items.map(x=>x.expression),[data[3].expression]);
  assert.equal(paginate(data,99,3).page,1);
  assert.equal(paginate(data,-10,3).page,0);
  assert.deepEqual(paginate([],5,12),{items:[],page:0,pageCount:1});
  assert.throws(()=>paginate(data,0,0),/page size/i);
});

test('real snapshot reconciles to its audited counts and coverage', () => {
  const raw=readFileSync(new URL('../public/projects/ISL/expression_counts.csv',import.meta.url),'utf8');
  const data=api().buildExpressionDataset(csvParse(raw));
  assert.equal(data.expressions.length,167);
  assert.deepEqual(data.splitTotals,{training:1293,testing:412,validation:336});
  assert.deepEqual(data.splitCoverage,{training:166,testing:146,validation:144});
  assert.equal(data.declaredTotal,1986);
  assert.equal(data.recordedSplitSum,2041);
  assert.equal(data.missingRows,45);
  assert.equal(data.completeExpressions,128);
  assert.equal(data.incompleteExpressions,39);
  assert.equal(data.mismatchedExpressions,23);
  assert.equal(data.trainingDistribution.reduce((n,b)=>n+b.count,0),166);
});
