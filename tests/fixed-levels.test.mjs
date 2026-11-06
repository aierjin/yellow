import {CHALLENGE_REPLACEMENTS} from '../src/challenge-replacements.mjs';
import {withPracticeLimit} from '../src/completion-feedback.mjs';
import test from 'node:test';import assert from 'node:assert/strict';
import {FIXED_LEVELS} from '../src/fixed-levels.mjs';import {LEVELS} from '../src/levels.js';
import {Level,GameState,ChainReactionSystem,PathfindingSystem} from '../src/engine.js';import {searchLevel} from '../src/exact-search.mjs';import {solve,verifySolution} from '../src/solver.mjs';
const play=(d,seq)=>{const l=new Level(d);for(const id of seq)ChainReactionSystem.apply(l.pillars,Math.floor((id-1)/d.cols),(id-1)%d.cols,4);return l;};
test('39–46 have verified minima, gentle budgets, one or two fixed pillars and tips',()=>{
 assert.ok(LEVELS.length>=46);assert.equal(FIXED_LEVELS.length,8);assert.deepEqual(LEVELS.slice(38,46),FIXED_LEVELS.map(d=>withPracticeLimit(CHALLENGE_REPLACEMENTS[d.number]??d)));
 for(const d of FIXED_LEVELS){assert.equal(d.rows,d.number<=41?3:4);assert.equal(d.end.pillar,undefined);assert.ok(d.end.edge);assert.ok(d.minMoves>=(d.rows===3?3:4));assert.ok(d.tip.length>8&&d.tip.length<50);assert.ok(d.discovery);
  const ids=d.pillars.flat().flatMap((p,i)=>p.fixed?[i+1]:[]);assert.ok(ids.length>=1&&ids.length<=2);assert.ok(d.solution.every(i=>!ids.includes(i)));
  assert.equal(searchLevel(d,d.minMoves).minMoves,d.minMoves);assert.equal(solve(new Level(d),{maxDepth:d.minMoves,maxStates:500000}).minClicks,d.minMoves);assert.ok(verifySolution(new Level(d),d.solution));
  if(d.maxClicks)assert.ok(d.maxClicks-d.minMoves>=1&&d.maxClicks-d.minMoves<=2);
 }
});
test('each fixed pillar is a necessary road anchor within budget and its immutability matters',()=>{
 for(const d of FIXED_LEVELS){
  for(const id of d.fixedEvidence.ids){assert.equal(searchLevel(d,d.fixedEvidence.necessityBudget??d.coverageBudget,{pathOmitCells:[id-1]}).solution,null,`L${d.number} can omit fixed ${id}`);
   const changed=structuredClone(d);changed.pillars[Math.floor((id-1)/d.cols)][(id-1)%d.cols].fixed=false;
   assert.equal(PathfindingSystem.hasPath(play(changed,d.solution)),false,`L${d.number} fixed ${id} decorative`);
  }
  for(let c=0;c<d.cols;c++)assert.equal(searchLevel(d,d.coverageBudget,{pathOmitColumn:c}).solution,null,`L${d.number} omit col ${c}`);
 }
});
test('fixed anchors keep their height throughout actual play and undo',()=>{
 for(const d of FIXED_LEVELS){const g=new GameState(new Level(d));const values=d.fixedEvidence.ids.map(id=>[id,d.pillars.flat()[id-1].height]);
  const check=()=>{for(const [id,h] of values){const p=g.level.pillars.flat()[id-1];assert.equal(p.height,h);assert.equal(p.fixed,true);}};
  for(const id of d.solution){g.click(Math.floor((id-1)/d.cols),(id-1)%d.cols);check();}
  for(const id of d.solution){g.undo();check();}assert.equal(g.clickCount,0);
 }
});
