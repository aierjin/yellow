import test from 'node:test';
import assert from 'node:assert/strict';
import { Level, GameState, bridgeAxis } from '../src/engine.js';
import { BRIDGE_DEMOS } from '../src/bridge-demo-levels.mjs';
import { searchLevel } from '../src/exact-search.mjs';
import { boardConnections, previewOperation } from '../src/preview.mjs';
import { createWalkTimeline, sampleWalk } from '../src/walk-route.mjs';
import { HEIGHT } from '../src/route.mjs';

const coordinates = (level, id) => [Math.floor((id - 1) / level.cols), (id - 1) % level.cols];
const turn = (game, id) => game.click(...coordinates(game.level, id));
const cases = [
  { definition: BRIDGE_DEMOS[0], covered: 10, traversable: 13 },
  { definition: BRIDGE_DEMOS[1], covered: 16, traversable: 20 }
];

for (const { definition, covered, traversable } of cases) {
  test(`${definition.name}: exact minimum, compulsory bridge crossings and continuous walking route`, () => {
    const game = new GameState(new Level(definition));
    const cells = game.level.pillars.flat();
    const bridgeIds = cells.flatMap((cell, i) => cell.bridge ? [i] : []);
    assert.equal(cells.filter(cell => !cell.blocked).length, traversable);
    assert.equal(game.getPath(), null);

    const result = searchLevel(definition, definition.minMoves);
    assert.equal(result.complete, true);
    assert.equal(result.minMoves, definition.minMoves);
    for (const id of bridgeIds) {
      const locked = searchLevel(definition, definition.maxClicks, { lockedBridges: [id] });
      assert.equal(locked.complete, true);
      assert.equal(locked.solution, null, 'No solution in the move limit with this bridge locked');
    }

    for (const id of definition.solution) assert.ok(turn(game, id)?.length);
    assert.equal(game.clickCount, result.minMoves);
    assert.ok(game.confirm());
    const path = game.getPath();
    assert.equal(path[0].type, 'start');
    assert.equal(path.at(-1).type, 'end');
    assert.equal(path.filter(node => node.type === 'pillar').length, covered);
    const boardIds = path.slice(1, -1).map(node => node.row * game.level.cols + node.col);
    assert.ok(bridgeIds.every(id => boardIds.includes(id)));
    for (const id of bridgeIds) {
      const index = boardIds.indexOf(id) + 1;
      const along = bridgeAxis(cells[id]);
      for (const neighbor of [path[index - 1], path[index + 1]]) {
        assert.equal(neighbor.type, 'pillar');
        assert.equal(neighbor.row === path[index].row ? 'row' : 'col', along);
      }
    }

    // The route planner rejects any discontinuous or overly high step.
    const timeline = createWalkTimeline(game.level, path);
    assert.equal(timeline.segments.length, path.length - 1);
    assert.ok(timeline.totalDistance > 0);
    const arrival = sampleWalk(timeline, timeline.totalDistance);
    assert.ok(arrival.done);
    assert.equal(arrival.y, definition.end.height * HEIGHT);
  });
}

test('A neighboring click turns the bridge; preview and undo match the resulting board', () => {
  const level = new Level(BRIDGE_DEMOS[0]);
  const game = new GameState(level);
  const bridge = level.pillars[1][3];
  const before = [...boardConnections(level).keys()];
  assert.equal(bridgeAxis(bridge), 'row');
  const preview = previewOperation(level, 0, 3);
  assert.equal(bridgeAxis(bridge), 'row');
  assert.equal(bridgeAxis(preview.next.pillars[1][3]), 'col');
  turn(game, 4);
  assert.equal(bridgeAxis(bridge), 'col');
  assert.deepEqual([...boardConnections(level).keys()], [...boardConnections(preview.next).keys()]);
  assert.ok(game.undo());
  assert.equal(bridgeAxis(bridge), 'row');
  assert.deepEqual([...boardConnections(level).keys()], before);
});
