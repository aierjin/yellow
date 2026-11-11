import test from 'node:test';
import assert from 'node:assert/strict';
import { LEVELS } from '../src/levels.js';
import { GameState, Level } from '../src/engine.js';
import { planRoute } from '../src/route.mjs';
import { searchLevel } from '../src/exact-search.mjs';
import { dualRouteHint } from '../src/dual-route-level.mjs';

test('level 57 has two independent branches and continuous hints within the shared limit', () => {
  const def = LEVELS[56];
  const game = new GameState(new Level(def));
  assert.equal(searchLevel(def, 4).solution, null);
  assert.equal(searchLevel(def, 5, { pathOmitColumn: 5 }).solution, null);
  for (let col = 5; col < 9; col++) {
    assert.equal(searchLevel(def, 5, { pathOmitColumn: col }).solution, null);
  }
  assert.equal(searchLevel(def, 6, { pathOmitColumn: 5 }).minMoves, 6);
  assert.equal(game.click(3, 4), null);
  assert.equal(game.click(1, 4), null);
  game.click(0, 0);
  assert.equal(dualRouteHint(game.level, 4), null);
  assert.ok(game.undo());
  for (let remaining = 5; remaining > 0; remaining--) {
    const index = dualRouteHint(game.level, remaining);
    assert.ok(Number.isInteger(index) && index % 9 >= 5);
    game.click(Math.floor(index / 9), index % 9);
  }
  assert.equal(game.click(0, 5), null);
  assert.ok(game.confirm());
  const path = game.getPath();
  assert.deepEqual([path[0], path.at(-1)], [{ type: 'start', height: 0 }, { type: 'end', height: 4 }]);
  assert.equal(planRoute(game.level, path).length, path.length - 1);
});
