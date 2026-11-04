import test from 'node:test';
import assert from 'node:assert/strict';
import {Level,GameState,PathfindingSystem} from '../src/engine.js';
import {planRoute,worldPoint} from '../src/route.mjs';
import {searchLevel} from '../src/exact-search.mjs';
import {solve} from '../src/solver.mjs';
const definition=()=>({rows:3,cols:3,maxHeight:4,start:{edge:'bottom',index:0,height:0},end:{pillar:{row:0,col:2}},pillars:Array.from({length:3},()=>Array.from({length:3},()=>({height:0,direction:1})))});
test('movable goal accepts arrival at any current height without an external endpoint',()=>{
 const d=definition();for(const p of d.pillars.flat())p.height=1;d.pillars[0][1].height=0;d.pillars[1][2].height=0;d.pillars[0][2]={height:4,direction:-1};const g=new GameState(new Level(d));
 assert.equal(g.getPath(),null);g.click(0,2);assert.equal(g.level.pillars[0][2].height,3);
 g.click(0,2);assert.ok(g.confirm());
 const path=g.getPath();assert.equal(path.at(-1).type,'pillar');assert.deepEqual([path.at(-1).row,path.at(-1).col],[0,2]);assert.equal(path.at(-1).height,2);
 assert.doesNotThrow(()=>planRoute(g.level,path));assert.deepEqual(worldPoint(g.level,{type:'end',height:2}),worldPoint(g.level,path.at(-1)));
});
test('direct and neighboring clicks move goal under the normal cross rule and undo restores it',()=>{
 const d=definition(),g=new GameState(new Level(d));g.click(0,2);
 assert.deepEqual(g.level.pillars.map(r=>r.map(p=>p.height)),[[0,1,1],[0,0,1],[0,0,0]]);
 g.click(0,1);assert.equal(g.level.pillars[0][2].height,2);g.undo();assert.equal(g.level.pillars[0][2].height,1);g.undo();assert.equal(g.level.pillars[0][2].height,0);
 assert.ok(g.confirm());
});
test('interior pavilion accepts all four approach directions',()=>{
 for(const [edge,index] of [['top',1],['bottom',1],['left',1],['right',1]]){
  const d=definition();d.end={pillar:{row:1,col:1}};d.start={edge,index,height:0};
  const l=new Level(d),p=PathfindingSystem.findPath(l);assert.ok(p);assert.equal(p.length,3);assert.doesNotThrow(()=>planRoute(l,p));
 }
});
test('exact solver agrees with engine BFS for movable goal',()=>{
 const d=definition();d.pillars[0][2].height=4;d.pillars[0][2].direction=-1;
 assert.equal(searchLevel(d,4).minMoves,solve(new Level(d),{maxDepth:4}).minClicks);
 assert.ok(searchLevel(d,4).minMoves>0);
});
