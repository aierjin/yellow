import test from 'node:test';import assert from 'node:assert/strict';
import {FINALE_LEVELS} from '../src/finale-levels.mjs';import {LEVELS} from '../src/levels.js';import {Level,ChainReactionSystem,PathfindingSystem} from '../src/engine.js';import {searchLevel} from '../src/exact-search.mjs';import {solve,verifySolution} from '../src/solver.mjs';
const play=(d)=>{const l=new Level(d);for(const id of d.solution)ChainReactionSystem.apply(l.pillars,Math.floor((id-1)/d.cols),(id-1)%d.cols,4);return l;};
test('47–55 minima independently verified, budgets and all-column routes',()=>{
 assert.equal(LEVELS.length,60);
 for(const d of FINALE_LEVELS){assert.equal(searchLevel(d,d.minMoves).minMoves,d.minMoves);assert.equal(solve(new Level(d),{maxDepth:d.minMoves,maxStates:500000}).minClicks,d.minMoves);assert.ok(verifySolution(new Level(d),d.solution));assert.ok(d.tip&&d.discovery);assert.ok(!d.end.pillar);assert.ok(d.minMoves>=(d.rows===3?3:4));
 const path=PathfindingSystem.findPath(play(d)).filter(p=>p.type==='pillar');assert.equal(new Set(path.map(p=>p.col)).size,d.cols);assert.ok(d.solution.every(id=>{const p=d.pillars.flat()[id-1];return !p.fixed&&!p.blocked;}));
 const current=LEVELS[d.number-1],budget=current.maxClicks;assert.ok(current.start.platform?budget===current.minMoves:budget>current.minMoves);if(d.type==='challenge')assert.ok(budget<=current.minMoves+2);
 }
});
test('every finale fixed anchor is necessary in optimal roads and its immutability matters',()=>{
 for(const d of FINALE_LEVELS)for(const [i,p] of d.pillars.flat().entries())if(p.fixed){assert.equal(searchLevel(d,d.minMoves,{pathOmitCells:[i]}).solution,null);const free=structuredClone(d);delete free.pillars[Math.floor(i/d.cols)][i%d.cols].fixed;assert.equal(PathfindingSystem.hasPath(play(free)),false);}
});
test('sync and holes affect solutions rather than decorate the board',()=>{
 for(const d of FINALE_LEVELS){const alt=structuredClone(d);if(d.number>=50){for(const p of alt.pillars.flat())delete p.sync;assert.equal(searchLevel(alt,d.minMoves).solution,null);assert.equal(d.pillars.flat().filter(p=>p.sync).length,2);}else{for(const p of alt.pillars.flat())delete p.blocked;const path=PathfindingSystem.findPath(play(alt));assert.ok(!path||searchLevel(alt,d.minMoves).minMoves!==d.minMoves||path.filter(p=>p.type==='pillar').length!==d.evidence.examplePath.length);}}
});

