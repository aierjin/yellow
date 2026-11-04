import test from 'node:test';
import assert from 'node:assert/strict';
import { Level } from '../src/engine.js';
import { LEVELS } from '../src/levels.js';
import { solve, verifySolution, initiallySolvable, keyOf } from '../src/solver.mjs';

// 目标最短步数（任务书关卡规范）
const TARGET = { 1: 1, 2: 1, 3: 2, 4: 3, 5: 4, 6: 1, 7: 3, 8: 3, 9: 3, 10: 5 };

test('全部 10 关：初态不通、存在解、最短值准确、无捷径、可重放通关', () => {
  for (const def of LEVELS.filter(d=>d.number<=20)) {
    const level = new Level(def);
    const target = def.minMoves ?? TARGET[def.number];
    assert.equal(initiallySolvable(level), false, `第 ${def.number} 关初态应不通`);
    const res = solve(level, { maxDepth: def.maxClicks != null ? def.maxClicks : target + 1 });
    assert.ok(res.exhausted, `第 ${def.number} 关搜索应穷尽`);
    assert.equal(res.solvable, true, `第 ${def.number} 关应有解`);
    assert.equal(res.minClicks, target, `第 ${def.number} 关最短应为 ${target}，实际 ${res.minClicks}`);
    assert.equal(verifySolution(level, res.solution), true, `第 ${def.number} 关最优解应能通关`);
  }
});

test('每关柱子数量与尺寸一致（2×3=6 根，3×3=9 根）', () => {
  for (const def of LEVELS) {
    const level = new Level(def);
    assert.equal(level.pillars.length, def.rows);
    assert.equal(level.pillars[0].length, def.cols);
    assert.equal(level.pillars.flat().length, def.rows * def.cols);
  }
});

test('每关柱子高度不越界（0..maxHeight）', () => {
  for (const def of LEVELS) {
    const level = new Level(def);
    for (const p of level.pillars.flat()) {
      assert.ok(p.height >= 0 && p.height <= level.maxHeight, `第 ${def.number} 关柱子高度越界`);
    }
  }
});

test('第 9/10 关为限步关且点击上限正确', () => {
  assert.equal(new Level(LEVELS[8]).type, 'challenge');
  assert.equal(new Level(LEVELS[8]).maxClicks, 4);
  assert.equal(new Level(LEVELS[9]).type, 'challenge');
  assert.equal(new Level(LEVELS[9]).maxClicks, 5);
});

test('状态去重含方向：仅高度相同但方向不同不应被视为同一状态', () => {
  // 方向不同的棋盘 key 应不同（间接验证 solver 的状态空间含方向）
  const l1 = new Level(LEVELS[0]);
  const l2 = l1.clone();
  // 翻转某柱方向
  l2.pillars[0][0].direction *= -1;
  // 两者初态高度相同但方向不同，序列化应不同
  assert.notEqual(keyOf(l1.pillars), keyOf(l2.pillars));
});
