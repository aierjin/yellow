import test from 'node:test';import assert from 'node:assert/strict';import {CHAPTER2} from '../src/chapter2-levels.mjs';import {Level} from '../src/engine.js';import {solve,verifySolution} from '../src/solver.mjs';
test('13–16 cannot omit an entire column within the certified coverage budget',()=>{
 for(const d of CHAPTER2.filter(d=>d.number>=13&&d.number<=16)){
  assert.ok(d.maxClicks);for(let col=0;col<d.cols;col++){
   const r=solve(new Level(d),{maxDepth:d.coverage.limit,allowedClicks:Array.from({length:d.rows*d.cols},(_,i)=>i+1).filter(i=>(i-1)%d.cols!==col)});
   assert.equal(r.solvable,false,`L${d.number} column ${col+1}`);assert.notEqual(r.limitReason,'states');
  }
  assert.equal(verifySolution(new Level(d),d.solution),true);
 }
});

