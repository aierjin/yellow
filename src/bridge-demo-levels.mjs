// Each token is height + next direction, f for fixed, R/C for bridge axis at even heights.
function board(rows) {
  return rows.map(row => row.split(' ').map(token => {
    if (token === '#') return { height: 0, direction: 1, blocked: true };
    const [height, motion, axis] = token;
    return {
      height: Number(height), direction: motion === '-' ? -1 : 1,
      ...(motion === 'f' ? { fixed: true } : {}),
      ...(axis ? { bridge: axis === 'R' ? 'row' : 'col' } : {})
    };
  }));
}

export const BRIDGE_DEMOS = [
  {
    number: 61, name: '横桥转身', rows: 4, cols: 4, maxHeight: 4,
    type: 'challenge', minMoves: 6, maxClicks: 9,
    start: { edge: 'bottom', index: 0, height: 0 },
    end: { edge: 'top', index: 0, height: 4 },
    pillars: board([
      '4f 4- 2f 1-',
      '# # # 2+R',
      '3- 0f 3- 1+',
      '0f 0+ 2+ 1-'
    ]),
    solution: [2, 4, 4, 4, 11, 15],
    discovery: '青色桥面每升降一级就转向 90°，只能沿桥面方向通行。也可以借邻柱转桥。',
    tip: '先找缺口唯一的跨越点，再用邻柱同时修正桥面方向和桥头高差。'
  },
  {
    number: 62, name: '双桥回廊', rows: 5, cols: 5, maxHeight: 4,
    type: 'challenge', minMoves: 7, maxClicks: 10,
    start: { edge: 'bottom', index: 0, height: 0 },
    end: { edge: 'bottom', index: 3, height: 4 },
    pillars: board([
      '0+ 1f # 3+ 4-',
      '2f 2- 2-C 4f 2-',
      '2- 3- # # 2-R',
      '4- 0f # 4- 1+',
      '0f 1+ # 4f 4-'
    ]),
    solution: [4, 7, 7, 7, 7, 8, 20],
    discovery: '两座青桥的通行方向不同。先看清各自连接哪片区域，再从固定石台倒推桥头高度。',
    tip: '分别找出两座桥必须朝向哪里，再检查调整一段时会不会拆掉另一段。'
  }
];
