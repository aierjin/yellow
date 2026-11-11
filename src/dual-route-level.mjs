import { searchLevel } from './exact-search.mjs';

export const DUAL_ROUTE_LEVEL = {
  number: 57,
  name: '双路择一',
  rows: 4,
  cols: 9,
  maxHeight: 4,
  type: 'challenge',
  maxClicks: 5,
  minMoves: 5,
  start: { platform: { row: 3, col: 4 }, height: 0 },
  end: { platform: { row: 0, col: 4 }, height: 4 },
  discovery: '左右两片石林共用五步。选一侧，从起点连到归处。',
  tip: '先比较两侧入口和出口的高度，再决定从哪一边搭路。',
  pillars: [
    [{"height":1,"direction":-1},{"height":1,"direction":-1},{"height":4,"direction":-1},{"height":2,"direction":-1},{"height":4,"direction":-1,"fixed":true},{"height":2,"direction":-1},{"height":3,"direction":-1},{"height":4,"direction":-1},{"height":1,"direction":-1}],
    [{"height":0,"direction":1},{"height":3,"direction":1},{"height":0,"direction":1},{"height":4,"direction":-1},{"height":0,"direction":1,"blocked":true},{"height":3,"direction":1},{"height":0,"direction":1},{"height":3,"direction":1},{"height":0,"direction":1}],
    [{"height":0,"direction":1},{"height":0,"direction":1},{"height":3,"direction":1},{"height":2,"direction":1},{"height":0,"direction":1,"blocked":true},{"height":3,"direction":1},{"height":3,"direction":1},{"height":1,"direction":1},{"height":0,"direction":1}],
    [{"height":2,"direction":1},{"height":2,"direction":-1},{"height":0,"direction":1},{"height":0,"direction":1},{"height":0,"direction":1,"fixed":true},{"height":0,"direction":1},{"height":1,"direction":1},{"height":1,"direction":1},{"height":3,"direction":1}]
  ],
  solution: [6,7,7,15,15],
};

// The fixed platforms cannot transmit clicks between the two boards.
// Search each side separately using only the remaining shared budget.
export function dualRouteHint(level, remaining) {
  for (const offset of [0, 5]) {
    const edge = offset === 0 ? 'right' : 'left';
    const branch = {
      rows: 4,
      cols: 4,
      maxHeight: level.maxHeight,
      start: { edge, index: 3, height: level.start.height },
      end: { edge, index: 0, height: level.end.height },
      pillars: level.pillars.map(row => row.slice(offset, offset + 4)),
    };
    const result = searchLevel(branch, remaining);
    if (result.solution?.length) {
      const index = result.solution[0] - 1;
      return Math.floor(index / 4) * level.cols + offset + index % 4;
    }
  }
  return null;
}
