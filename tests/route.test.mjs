import test from 'node:test';
import assert from 'node:assert/strict';
import { Level, GameState, PathfindingSystem } from '../src/engine.js';
import { LEVELS } from '../src/levels.js';
import { planRoute, worldPoint, CELL, HEIGHT } from '../src/route.mjs';

test('first level retains its one-click solution and undo restores direction', () => {
  const game = new GameState(new Level(LEVELS[0]));
  const initial = JSON.stringify(game.level.pillars);
  assert.equal(game.confirm(), false);
  game.click(0, 1);
  assert.ok(PathfindingSystem.findPath(game.level));
  assert.equal(game.clickCount, 1);
  game.undo();
  assert.equal(JSON.stringify(game.level.pillars), initial);
  game.click(0, 1);
  assert.equal(game.confirm(), true);
  assert.equal(game.click(1, 1), null);
});
test('route covers all valid path edges without modifying board', () => {
  const game = new GameState(new Level(LEVELS[0]));
  game.click(0, 1);
  const path = game.getPath();
  const before = JSON.stringify(game.level);
  const segments = planRoute(game.level, path);
  assert.equal(segments.length, path.length - 1);
  assert.equal(JSON.stringify(game.level), before);
  assert.deepEqual(segments[0].from, worldPoint(game.level, path[0]));
  assert.deepEqual(segments.at(-1).to, worldPoint(game.level, path.at(-1)));
  assert.ok(segments.some(s => s.kind === 'stairs'));
  assert.ok(segments.some(s => s.kind === 'bridge'));
});
test('up and down produce the same staircase footprint', () => {
  const level = new Level(LEVELS[0]);
  const a = {type:'pillar', row:1,col:0,height:1};
  const b = {type:'pillar', row:1,col:1,height:2};
  const up = planRoute(level,[a,b])[0];
  const down = planRoute(level,[b,a])[0];
  assert.deepEqual(up.low, down.low);
  assert.deepEqual(up.high, down.high);
  assert.equal(up.high.y - up.low.y, HEIGHT);
  assert.equal(up.high.x - up.low.x, CELL);
});
test('missing paths and invalid height jumps cannot create decorative routes', () => {
  const level = new Level(LEVELS[0]);
  assert.deepEqual(planRoute(level, null), []);
  assert.throws(() => planRoute(level,[{type:'pillar',row:0,col:0,height:0},{type:'pillar',row:0,col:1,height:3}]));
});
