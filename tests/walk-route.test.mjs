import test from 'node:test';
import assert from 'node:assert/strict';
import { Level, GameState } from '../src/engine.js';
import { LEVELS } from '../src/levels.js';
import { createWalkTimeline, sampleWalk, walkingFootY } from '../src/walk-route.mjs';

function solvedLevel() {
  const game = new GameState(new Level(LEVELS[0]));
  game.click(0, 1);
  return game;
}

test('walk timeline starts at the entrance and ends inside the exit', () => {
  const game = solvedLevel();
  const timeline = createWalkTimeline(game.level, game.getPath());
  const start = sampleWalk(timeline, 0);
  const end = sampleWalk(timeline, timeline.totalDistance);
  assert.deepEqual({ x: start.x, y: start.y, z: start.z }, { x: -1.5, y: 0, z: 3 });
  assert.deepEqual({ x: end.x, y: end.y, z: end.z }, { x: 1.5, y: 2.88, z: -3 });
  assert.equal(end.done, true);
  assert.ok(timeline.segments.some(segment => segment.kind === 'stairs'));
});

test('walking faces the next tread and clamps beyond both ends', () => {
  const game = solvedLevel();
  const timeline = createWalkTimeline(game.level, game.getPath());
  const before = sampleWalk(timeline, -10);
  const after = sampleWalk(timeline, timeline.totalDistance + 10);
  assert.deepEqual(before, sampleWalk(timeline, 0));
  assert.equal(after.done, true);
  assert.ok(Math.abs(timeline.segments[0].heading) < 1e-9);
  assert.ok(Math.abs(timeline.segments[3].heading + Math.PI / 2) < 1e-9);
});

test('stairs and bridges keep a constant travel speed', () => {
  const game = solvedLevel();
  const timeline = createWalkTimeline(game.level, game.getPath(), 2);
  assert.ok(Math.abs(timeline.totalDuration - timeline.totalDistance / 2) < 1e-9);
  const halfway = sampleWalk(timeline, timeline.totalDistance / 2);
  assert.equal(halfway.done, false);
  assert.ok(Number.isFinite(halfway.heading));
});

test('feet reach the upper platform before crossing its face, not along a center-to-center slope',()=>{
  const game=solvedLevel(),timeline=createWalkTimeline(game.level,game.getPath());
  const first=timeline.segments[0];
  const atUpperFace=sampleWalk(timeline,first.start+first.length*(1.0/1.5));
  assert.ok(Math.abs(atUpperFace.y-first.high.y)<1e-6);
  const atFoot=sampleWalk(timeline,first.start+first.length*(.01/1.5));
  assert.ok(Math.abs(atFoot.y-first.low.y)<1e-6);
});

test('feet clear raised bridge trim and stair treads without clipping',()=>{
  assert.ok(walkingFootY({y:1,kind:'bridge',done:false})>1.077);
  assert.ok(walkingFootY({y:1,kind:'stairs',done:false})>1.03);
  assert.equal(walkingFootY({y:2.88,kind:'stairs',done:true}),2.895);
});
