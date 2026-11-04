import test from 'node:test';
import assert from 'node:assert/strict';
import { nextDirection } from '../src/next-direction.mjs';
import { Level } from '../src/engine.js';
import { LEVELS } from '../src/levels.js';
import { solve } from '../src/solver.mjs';
test('boundary labels follow actual movement',()=>{
 assert.equal(nextDirection({height:4,direction:1},4),-1);
 assert.equal(nextDirection({height:0,direction:-1},4),1);
 assert.equal(nextDirection({height:2,direction:-1},4),-1);
});
test('depth cap does not prove unsolvability',()=>{
 const r=solve(new Level(LEVELS[0]),{maxDepth:0});
 assert.equal(r.exhausted,false);
});
