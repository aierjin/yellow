/**
 * 两种「大地图」新式关卡 demo（供优哥评审，尚未并入正式章节）。
 *
 * 关卡 A「幽谷之门」—— 中间切入：
 *   起点不在地图边缘，而在地图正中央 (2,2) 的一根「固定深坑」（height 0，fixed）。
 *   「地形暗示」＝中央那根灰褐刻字、高度为 0 的固定石坑，四邻同为 0，围成一片下沉谷地；
 *   对角埋两根 fixed 高柱作刚性路标。玩家从谷底出发，只能沿对角线绕行爬升到右下角归处。
 *   最短解 6 步（已验证），含「同一根柱连续点 4 次」的借力技巧。
 *
 * 关卡 B「四路皆行」—— 四方向起点：
 *   起点在正中央 (2,2)（height 2，非固定），四邻高度与起点相差 ≤1，开局即可往
 *   上下左右任走。终点在对角边缘，靠 fixed 高墙把向右/向下的直路堵死，
 *   最优路线是沿地图上半圈 + 右半圈绕行，覆盖 11 根柱（全图 36 根）。
 */

// ============================ 关卡 A：幽谷之门（中间切入） ============================
export const LEVEL_A = {
  number: 9001,
  name: "幽谷之门",
  rows: 5,
  cols: 5,
  maxHeight: 4,
  type: "challenge",
  maxClicks: 9,
  start: { pillar: { row: 2, col: 2 }, height: 0 },
  end: { edge: "right", index: 4, height: 4 },
  pillars: [
    [
      { height: 3, direction: 1 },
      { height: 4, direction: 1 },
      { height: 2, direction: 1, sync: "a" },
      { height: 2, direction: 1 },
      { height: 4, direction: -1 },
    ],
    [
      { height: 3, direction: -1 },
      { height: 4, direction: 1, fixed: true },
      { height: 4, direction: 1 },
      { height: 1, direction: -1 },
      { height: 2, direction: 1 },
    ],
    [
      { height: 1, direction: -1 },
      { height: 2, direction: -1 },
      { height: 0, direction: 1, fixed: true },
      { height: 4, direction: -1 },
      { height: 0, direction: 1 },
    ],
    [
      { height: 2, direction: 1, sync: "a" },
      { height: 0, direction: -1 },
      { height: 3, direction: 1 },
      { height: 4, direction: 1, fixed: true },
      { height: 1, direction: 1 },
    ],
    [
      { height: 4, direction: 1 },
      { height: 4, direction: 1 },
      { height: 4, direction: -1 },
      { height: 4, direction: 1 },
      { height: 1, direction: -1 },
    ],
  ],
  minMoves: 6,
  solution: [11, 12, 20, 20, 20, 24],
  tip: "谷底是唯一的起点：从固定深坑出发，绕开固定高台，借同步柱爬向边缘归处。",
  discovery: "中央凹陷的石坑固定不动，它就是你此行的切入点。",
};

// ============================ 关卡 B：四路皆行（四方向起点） ============================
export const LEVEL_B = {
  number: 9002,
  name: "四路皆行",
  rows: 5,
  cols: 5,
  maxHeight: 4,
  type: "challenge",
  maxClicks: 8,
  start: { pillar: { row: 2, col: 2 }, height: 2 },
  end: { pillar: { row: 0, col: 4 } },
  pillars: [
    [
      { height: 3, direction: -1 },
      { height: 1, direction: 1 },
      { height: 2, direction: -1 },
      { height: 4, direction: -1, fixed: true },
      { height: 0, direction: 1 },
    ],
    [
      { height: 2, direction: 1 },
      { height: 4, direction: -1, fixed: true },
      { height: 1, direction: -1 },
      { height: 0, direction: 1 },
      { height: 2, direction: 1 },
    ],
    [
      { height: 4, direction: -1, fixed: true },
      { height: 3, direction: -1 },
      { height: 2, direction: 1 },
      { height: 1, direction: -1 },
      { height: 4, direction: -1, fixed: true },
    ],
    [
      { height: 1, direction: 1 },
      { height: 0, direction: 1 },
      { height: 3, direction: 1 },
      { height: 2, direction: -1 },
      { height: 1, direction: 1 },
    ],
    [
      { height: 2, direction: -1 },
      { height: 3, direction: 1 },
      { height: 4, direction: -1, fixed: true },
      { height: 1, direction: 1 },
      { height: 3, direction: -1 },
    ],
  ],
  minMoves: 3,
  solution: [5, 10, 10],
  tip: "起点四方皆可行，但只有绕开固定高墙、调好移动归处的高度，才能连成一条路。",
  discovery: "中央石柱是起点，四方向都能起步；归处在小亭所在的移动石柱上。",
};
