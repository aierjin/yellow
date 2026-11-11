import test from 'node:test';
import assert from 'node:assert/strict';
import { LEVELS } from '../src/levels.js';
import { GameState, Level } from '../src/engine.js';
import { planRoute } from '../src/route.mjs';
import { searchLevel } from '../src/exact-search.mjs';
import { dualRouteHint } from '../src/dual-route-level.mjs';

for(const number of [18,47,57])test('dual route '+number+' minimum, distributed operation, approach roads, hints and undo',()=>{
 const def=LEVELS[number-1],size=def.rows,offsets=[0,def.cols-size],minima=[];
 for(const offset of offsets){
   const edge=offset===0?'right':'left';
   const branch={rows:size,cols:size,maxHeight:4,start:{edge,index:def.start.branchRow??size-1,height:0},end:{edge,index:def.end.branchRow??0,height:4},pillars:def.pillars.map(row=>row.slice(offset,offset+size))};
   const result=searchLevel(branch,def.maxClicks+1);minima.push(result.minMoves);
   if(result.minMoves===def.maxClicks)for(let col=0;col<size;col++)assert.equal(searchLevel(branch,def.maxClicks,{pathOmitColumn:col}).solution,null);
 }
 assert.deepEqual(minima.toSorted((a,b)=>a-b),[def.minMoves,def.minMoves+1]);
 const game=new GameState(new Level(def));
 if(number!==18){
  assert.equal(new Set(def.solution.map(n=>Math.floor((n-1)/def.cols))).size>=4,true);
  assert.equal(new Set(def.solution.map(n=>(n-1)%def.cols)).size>=4,true);
  assert.equal(def.start.branchRow,1);
  assert.equal(game.click(1,size),null);
 }
 for(let remaining=def.maxClicks;remaining>0;remaining--){
  const index=dualRouteHint(game.level,remaining);assert.ok(Number.isInteger(index));
  const state=JSON.stringify(game.level.pillars);
  assert.ok(game.click(Math.floor(index/def.cols),index%def.cols));
  assert.ok(game.undo());assert.equal(JSON.stringify(game.level.pillars),state);
  game.click(Math.floor(index/def.cols),index%def.cols);
 }
 assert.ok(game.confirm());
 const path=game.getPath();assert.equal(planRoute(game.level,path).length,path.length-1);
 assert.equal(path[0].height,0);assert.equal(path.at(-1).height,4);
});
