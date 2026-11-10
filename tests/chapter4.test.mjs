import {withPracticeLimit} from '../src/completion-feedback.mjs';
import test from 'node:test';import assert from 'node:assert/strict';
import {CHAPTER4} from '../src/chapter4-levels.mjs';import {LEVELS} from '../src/levels.js';
import {searchLevel} from '../src/exact-search.mjs';
import {Level,GameState,PathfindingSystem} from '../src/engine.js';
import {solve,verifySolution} from '../src/solver.mjs';import {planRoute} from '../src/route.mjs';
test('31–38 exact minima and playable solutions; smaller boards also agree with BFS',()=>{
 assert.ok(LEVELS.length>=38);assert.deepEqual(LEVELS.slice(30,38),CHAPTER4.map(withPracticeLimit));
 for(const d of CHAPTER4){assert.equal(d.rows,d.number===35?5:d.number<=33?3:4);assert.ok(d.minMoves>=(d.rows===3?3:4));
  assert.equal(searchLevel(d,d.minMoves).minMoves,d.minMoves);
  if(![34,35].includes(d.number)){
   const bfs=solve(new Level(d),{maxDepth:d.minMoves,maxStates:500000});assert.equal(bfs.minClicks,d.minMoves,`L${d.number} ${JSON.stringify(bfs)}`);
  }
  assert.ok(verifySolution(new Level(d),d.solution));assert.ok(d.tip);assert.equal(PathfindingSystem.hasPath(new Level(d)),false);
 }
});
test('34 and 35 have the requested budgets and preserve ordinary pillars with a movable goal',()=>{
 for(const number of [34,35]){
  const d=LEVELS[number-1];
  assert.equal(d.minMoves,6);
  assert.equal(d.maxClicks,number===34?10:7);
  assert.equal(d.cols,number===34?4:5);
  assert.ok(d.end.pillar);
  assert.ok(d.pillars.flat().every(p=>!p.fixed&&!p.blocked&&!p.sync&&!p.bridge));
 }
});
test('allowed budget cannot ignore a column; example walking routes cover every column',()=>{
 for(const d of CHAPTER4){
  if(d.number===34)assert.equal(d.maxClicks,10);
  else if(d.maxClicks)assert.ok(d.maxClicks-d.minMoves>=1&&d.maxClicks-d.minMoves<=2);
  for(let c=0;c<d.cols;c++)assert.equal(searchLevel(d,d.coverageBudget,{omitColumn:c}).solution,null,`L${d.number} column ${c}`);
  for(let c=0;c<d.cols;c++)assert.equal(searchLevel(d,d.coverageBudget,{pathOmitColumn:c}).solution,null);
  const g=new GameState(new Level(d));for(const id of d.solution)g.click(Math.floor((id-1)/d.cols),(id-1)%d.cols);
  const path=g.getPath();assert.equal(new Set(path.filter(p=>p.type==='pillar').map(p=>p.col)).size,d.cols);
  assert.doesNotThrow(()=>planRoute(g.level,path));
 }
});
test('onboarding teaches direct, indirect and alternative destination strategies',()=>{
 const first=CHAPTER4[0],second=CHAPTER4[1],choice=CHAPTER4[4];
 assert.ok(first.solution.includes(first.end.pillar.row*first.cols+first.end.pillar.col+1));
 assert.ok(!second.solution.includes(second.end.pillar.row*second.cols+second.end.pillar.col+1));
 for(const d of CHAPTER4){const {row,col}=d.end.pillar;assert.ok(Math.abs(d.rows-1-row)+Math.abs(d.start.index-col)>=4);
  if(d.number<=35)assert.equal(row,0);else assert.ok(row>0&&row<d.rows-1&&col>0&&col<d.cols-1);
  assert.notEqual(d.coverage.goalInitial,d.coverage.goalFinal);
 }
 for(const seq of Object.values(choice.strategies))assert.ok(verifySolution(new Level(choice),seq));
});
test('budget cannot be exceeded even when road exists at the last click',()=>{
 const d={...CHAPTER4[0],type:'challenge',maxClicks:3};const g=new GameState(new Level(d));
 for(const id of d.solution)g.click(Math.floor((id-1)/3),(id-1)%3);
 assert.ok(g.getPath());const snapshot=g.level.clone();assert.equal(g.click(0,0),null);assert.deepEqual(g.level,snapshot);assert.ok(g.confirm());
});
test('32 and 33 cannot bypass moving-goal lessons with an optimal solution',()=>{
 for(const d of CHAPTER4.filter(d=>[32,33].includes(d.number))){
  let solutions=0;
  for(let a=1;a<=9;a++)for(let b=a;b<=9;b++)for(let c=b;c<=9;c++){
   const g=new GameState(new Level(d));for(const id of [a,b,c])g.click(Math.floor((id-1)/3),(id-1)%3);
   if(!g.getPath())continue;solutions++;
   assert.notEqual(g.level.pillars[0][2].height,d.pillars[0][2].height);
   if(d.number===32)assert.ok(![a,b,c].includes(3));
   assert.ok([a,b,c].some(id=>[2,6].includes(id)));
  }assert.ok(solutions>0);
 }
});
