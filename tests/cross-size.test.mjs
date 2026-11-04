import test from 'node:test';
import assert from 'node:assert/strict';
import { Level, PathfindingSystem } from '../src/engine.js';
import { LEVELS } from '../src/levels.js';
import { worldPoint, CELL } from '../src/route.mjs';

test('2×3 与 3×3 起终点空间语义一致（入口底部最左、出口顶部最右）', () => {
  const l2 = new Level(LEVELS[1]); // 第 2 关 2×3
  const l6 = new Level(LEVELS[5]); // 第 6 关 3×3

  // 起点均为 bottom index 0
  assert.equal(l2.start.edge, 'bottom');
  assert.equal(l2.start.index, 0);
  assert.equal(l6.start.edge, 'bottom');
  assert.equal(l6.start.index, 0);

  // 终点均为 top 最右列（cols-1）
  assert.equal(l2.end.edge, 'top');
  assert.equal(l2.end.index, l2.cols - 1);
  assert.equal(l6.end.edge, 'top');
  assert.equal(l6.end.index, l6.cols - 1);
});

test('worldPoint 对 2×3 与 3×3 均把棋盘居中，边缘连接正确', () => {
  const l2 = new Level(LEVELS[1]);
  const l6 = new Level(LEVELS[5]);

  // 3×3：ox=oz=(3-1)*1.5/2=1.5；起点 (x=-1.5, z=3)（棋盘下沿外一格），终点 (x=1.5, z=-3)
  const s6 = worldPoint(l6, { type: 'start', height: 0 });
  assert.equal(s6.x, -1.5);
  assert.equal(s6.z, 3);
  const e6 = worldPoint(l6, { type: 'end', height: 4 });
  assert.equal(e6.x, 1.5);
  assert.equal(e6.z, -3);

  // 2×3：棋盘更窄（ox=(3-1)*1.5/2=1.5, oz=(2-1)*1.5/2=0.75）
  const s2 = worldPoint(l2, { type: 'start', height: 0 });
  assert.equal(s2.x, -1.5);
  assert.equal(s2.z, 0.75 + CELL);
  const e2 = worldPoint(l2, { type: 'end', height: 3 });
  assert.equal(e2.x, 1.5);
  assert.equal(e2.z, -0.75 - CELL);
});

test('_edgePillar 对 2×3 的 top index=1 与 3×3 的 top index=2 都映射到最右列', () => {
  const l2 = new Level(LEVELS[1]);
  const l6 = new Level(LEVELS[5]);
  const ep2 = PathfindingSystem._edgePillar(l2, l2.end);
  const ep6 = PathfindingSystem._edgePillar(l6, l6.end);
  assert.equal(ep2.col, l2.cols - 1);
  assert.equal(ep6.col, l6.cols - 1);
  assert.equal(ep2.row, 0);
  assert.equal(ep6.row, 0);
});
