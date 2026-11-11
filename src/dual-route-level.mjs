import { searchLevel } from './exact-search.mjs';

export const DUAL_ROUTE_LEVELS = {
  "18": {
    "number": 18,
    "name": "双路择一",
    "rows": 4,
    "cols": 9,
    "maxHeight": 4,
    "type": "challenge",
    "maxClicks": 5,
    "minMoves": 5,
    "start": {
      "platform": {
        "row": 3,
        "col": 4
      },
      "height": 0
    },
    "end": {
      "platform": {
        "row": 0,
        "col": 4
      },
      "height": 4
    },
    "discovery": "左右两片石林共用五步。选一侧，从起点连到归处。",
    "tip": "观察两片石林的变化，选择一条能在步数内连通的路。",
    "pillars": [
      [
        {
          "height": 1,
          "direction": -1
        },
        {
          "height": 1,
          "direction": -1
        },
        {
          "height": 4,
          "direction": -1
        },
        {
          "height": 2,
          "direction": -1
        },
        {
          "height": 4,
          "direction": -1,
          "fixed": true
        },
        {
          "height": 2,
          "direction": -1
        },
        {
          "height": 3,
          "direction": -1
        },
        {
          "height": 4,
          "direction": -1
        },
        {
          "height": 1,
          "direction": -1
        }
      ],
      [
        {
          "height": 0,
          "direction": 1
        },
        {
          "height": 3,
          "direction": 1
        },
        {
          "height": 0,
          "direction": 1
        },
        {
          "height": 4,
          "direction": -1
        },
        {
          "height": 0,
          "direction": 1,
          "blocked": true
        },
        {
          "height": 3,
          "direction": 1
        },
        {
          "height": 0,
          "direction": 1
        },
        {
          "height": 3,
          "direction": 1
        },
        {
          "height": 0,
          "direction": 1
        }
      ],
      [
        {
          "height": 0,
          "direction": 1
        },
        {
          "height": 0,
          "direction": 1
        },
        {
          "height": 3,
          "direction": 1
        },
        {
          "height": 2,
          "direction": 1
        },
        {
          "height": 0,
          "direction": 1,
          "blocked": true
        },
        {
          "height": 3,
          "direction": 1
        },
        {
          "height": 3,
          "direction": 1
        },
        {
          "height": 1,
          "direction": 1
        },
        {
          "height": 0,
          "direction": 1
        }
      ],
      [
        {
          "height": 2,
          "direction": 1
        },
        {
          "height": 2,
          "direction": -1
        },
        {
          "height": 0,
          "direction": 1
        },
        {
          "height": 0,
          "direction": 1
        },
        {
          "height": 0,
          "direction": 1,
          "fixed": true
        },
        {
          "height": 0,
          "direction": 1
        },
        {
          "height": 1,
          "direction": 1
        },
        {
          "height": 1,
          "direction": 1
        },
        {
          "height": 3,
          "direction": 1
        }
      ]
    ],
    "solution": [
      6,
      7,
      7,
      15,
      15
    ]
  },
  "47": {
    "number": 47,
    "name": "岔路回廊",
    "rows": 5,
    "cols": 13,
    "maxHeight": 4,
    "type": "challenge",
    "maxClicks": 8,
    "minMoves": 8,
    "start": {
      "platform": {
        "row": 0,
        "col": 6
      },
      "height": 0,
      "branchRow": 1
    },
    "end": {
      "platform": {
        "row": 4,
        "col": 6
      },
      "height": 4,
      "branchRow": 4
    },
    "discovery": "从起点出发，连接通往归处的道路。",
    "tip": "留意一次升降会改变哪些相邻道路。",
    "pillars": [
      [
        {
          "height": 2,
          "direction": 1,
          "fixed": false
        },
        {
          "height": 0,
          "direction": 1,
          "fixed": false
        },
        {
          "height": 1,
          "direction": -1,
          "fixed": true
        },
        {
          "height": 2,
          "direction": 1,
          "fixed": false
        },
        {
          "height": 2,
          "direction": -1,
          "fixed": true
        },
        {
          "height": 0,
          "direction": 1,
          "blocked": true
        },
        {
          "height": 0,
          "direction": 1,
          "fixed": true
        },
        {
          "height": 0,
          "direction": 1,
          "blocked": true
        },
        {
          "height": 2,
          "direction": -1,
          "fixed": true
        },
        {
          "height": 0,
          "direction": 1,
          "fixed": false
        },
        {
          "height": 1,
          "direction": -1,
          "fixed": true
        },
        {
          "height": 0,
          "direction": 1,
          "fixed": false
        },
        {
          "height": 2,
          "direction": 1,
          "fixed": false
        }
      ],
      [
        {
          "height": 0,
          "direction": 1,
          "fixed": false
        },
        {
          "height": 1,
          "direction": -1,
          "fixed": false
        },
        {
          "height": 4,
          "direction": -1,
          "fixed": false
        },
        {
          "height": 4,
          "direction": -1,
          "fixed": true
        },
        {
          "height": 4,
          "direction": -1
        },
        {
          "height": 0,
          "direction": 1,
          "fixed": true
        },
        {
          "height": 0,
          "direction": 1,
          "fixed": true
        },
        {
          "height": 0,
          "direction": 1,
          "fixed": true
        },
        {
          "height": 4,
          "direction": -1
        },
        {
          "height": 4,
          "direction": -1,
          "fixed": true
        },
        {
          "height": 4,
          "direction": -1,
          "fixed": false
        },
        {
          "height": 1,
          "direction": -1,
          "fixed": false
        },
        {
          "height": 0,
          "direction": 1,
          "fixed": false
        }
      ],
      [
        {
          "height": 2,
          "direction": -1,
          "fixed": false
        },
        {
          "height": 0,
          "direction": 1,
          "fixed": true
        },
        {
          "height": 4,
          "direction": -1,
          "fixed": true
        },
        {
          "height": 2,
          "direction": -1,
          "fixed": true
        },
        {
          "height": 3,
          "direction": 1,
          "fixed": true
        },
        {
          "height": 0,
          "direction": 1,
          "blocked": true
        },
        {
          "height": 0,
          "direction": 1,
          "blocked": true
        },
        {
          "height": 0,
          "direction": 1,
          "blocked": true
        },
        {
          "height": 3,
          "direction": 1,
          "fixed": true
        },
        {
          "height": 2,
          "direction": -1,
          "fixed": true
        },
        {
          "height": 4,
          "direction": -1,
          "fixed": true
        },
        {
          "height": 0,
          "direction": 1,
          "fixed": true
        },
        {
          "height": 2,
          "direction": -1,
          "fixed": false
        }
      ],
      [
        {
          "height": 4,
          "direction": -1,
          "fixed": false
        },
        {
          "height": 4,
          "direction": -1,
          "fixed": false
        },
        {
          "height": 1,
          "direction": -1,
          "fixed": false
        },
        {
          "height": 4,
          "direction": -1,
          "fixed": false
        },
        {
          "height": 4,
          "direction": -1,
          "fixed": false
        },
        {
          "height": 0,
          "direction": 1,
          "blocked": true
        },
        {
          "height": 0,
          "direction": 1,
          "blocked": true
        },
        {
          "height": 0,
          "direction": 1,
          "blocked": true
        },
        {
          "height": 4,
          "direction": -1,
          "fixed": false
        },
        {
          "height": 4,
          "direction": -1,
          "fixed": false
        },
        {
          "height": 1,
          "direction": -1,
          "fixed": false
        },
        {
          "height": 4,
          "direction": -1,
          "fixed": false
        },
        {
          "height": 4,
          "direction": -1,
          "fixed": false
        }
      ],
      [
        {
          "height": 1,
          "direction": 1,
          "fixed": true
        },
        {
          "height": 1,
          "direction": 1,
          "fixed": false
        },
        {
          "height": 0,
          "direction": 1,
          "fixed": false
        },
        {
          "height": 0,
          "direction": 1,
          "fixed": false
        },
        {
          "height": 0,
          "direction": 1
        },
        {
          "height": 4,
          "direction": -1,
          "fixed": true
        },
        {
          "height": 4,
          "direction": -1,
          "fixed": true
        },
        {
          "height": 4,
          "direction": -1,
          "fixed": true
        },
        {
          "height": 0,
          "direction": 1
        },
        {
          "height": 0,
          "direction": 1,
          "fixed": false
        },
        {
          "height": 0,
          "direction": 1,
          "fixed": false
        },
        {
          "height": 1,
          "direction": 1,
          "fixed": false
        },
        {
          "height": 1,
          "direction": 1,
          "fixed": true
        }
      ]
    ],
    "solution": [
      1,
      18,
      18,
      18,
      44,
      44,
      41,
      56
    ]
  },
  "57": {
    "number": 57,
    "name": "两岸迷局",
    "rows": 5,
    "cols": 13,
    "maxHeight": 4,
    "type": "challenge",
    "maxClicks": 10,
    "minMoves": 10,
    "start": {
      "platform": {
        "row": 0,
        "col": 6
      },
      "height": 0,
      "branchRow": 1
    },
    "end": {
      "platform": {
        "row": 4,
        "col": 6
      },
      "height": 4,
      "branchRow": 4
    },
    "discovery": "从起点出发，连接通往归处的道路。",
    "tip": "留意一次升降会改变哪些相邻道路。",
    "pillars": [
      [
        {
          "height": 2,
          "direction": 1,
          "fixed": false
        },
        {
          "height": 0,
          "direction": 1,
          "fixed": false
        },
        {
          "height": 4,
          "direction": -1,
          "fixed": true
        },
        {
          "height": 2,
          "direction": 1,
          "fixed": false
        },
        {
          "height": 2,
          "direction": -1,
          "fixed": true
        },
        {
          "height": 0,
          "direction": 1,
          "blocked": true
        },
        {
          "height": 0,
          "direction": 1,
          "fixed": true
        },
        {
          "height": 0,
          "direction": 1,
          "blocked": true
        },
        {
          "height": 2,
          "direction": -1,
          "fixed": true
        },
        {
          "height": 2,
          "direction": 1,
          "fixed": false
        },
        {
          "height": 4,
          "direction": -1,
          "fixed": true
        },
        {
          "height": 0,
          "direction": 1,
          "fixed": false
        },
        {
          "height": 2,
          "direction": 1,
          "fixed": false
        }
      ],
      [
        {
          "height": 0,
          "direction": 1,
          "fixed": false
        },
        {
          "height": 1,
          "direction": -1,
          "fixed": false
        },
        {
          "height": 4,
          "direction": -1,
          "fixed": false
        },
        {
          "height": 4,
          "direction": -1,
          "fixed": true
        },
        {
          "height": 4,
          "direction": -1
        },
        {
          "height": 0,
          "direction": 1,
          "fixed": true
        },
        {
          "height": 0,
          "direction": 1,
          "fixed": true
        },
        {
          "height": 0,
          "direction": 1,
          "fixed": true
        },
        {
          "height": 4,
          "direction": -1
        },
        {
          "height": 4,
          "direction": -1,
          "fixed": true
        },
        {
          "height": 4,
          "direction": -1,
          "fixed": false
        },
        {
          "height": 1,
          "direction": -1,
          "fixed": false
        },
        {
          "height": 0,
          "direction": 1,
          "fixed": false
        }
      ],
      [
        {
          "height": 4,
          "direction": -1,
          "fixed": false
        },
        {
          "height": 0,
          "direction": 1,
          "fixed": true
        },
        {
          "height": 4,
          "direction": -1,
          "fixed": true
        },
        {
          "height": 2,
          "direction": -1,
          "fixed": true
        },
        {
          "height": 3,
          "direction": 1,
          "fixed": true
        },
        {
          "height": 0,
          "direction": 1,
          "blocked": true
        },
        {
          "height": 0,
          "direction": 1,
          "blocked": true
        },
        {
          "height": 0,
          "direction": 1,
          "blocked": true
        },
        {
          "height": 3,
          "direction": 1,
          "fixed": true
        },
        {
          "height": 2,
          "direction": -1,
          "fixed": true
        },
        {
          "height": 4,
          "direction": -1,
          "fixed": true
        },
        {
          "height": 0,
          "direction": 1,
          "fixed": true
        },
        {
          "height": 2,
          "direction": -1,
          "fixed": false
        }
      ],
      [
        {
          "height": 4,
          "direction": -1,
          "fixed": false
        },
        {
          "height": 1,
          "direction": 1,
          "fixed": false
        },
        {
          "height": 1,
          "direction": -1,
          "fixed": false
        },
        {
          "height": 4,
          "direction": -1,
          "fixed": false
        },
        {
          "height": 4,
          "direction": -1,
          "fixed": false
        },
        {
          "height": 0,
          "direction": 1,
          "blocked": true
        },
        {
          "height": 0,
          "direction": 1,
          "blocked": true
        },
        {
          "height": 0,
          "direction": 1,
          "blocked": true
        },
        {
          "height": 4,
          "direction": -1,
          "fixed": false
        },
        {
          "height": 4,
          "direction": -1,
          "fixed": false
        },
        {
          "height": 1,
          "direction": -1,
          "fixed": false
        },
        {
          "height": 1,
          "direction": 1,
          "fixed": false
        },
        {
          "height": 4,
          "direction": -1,
          "fixed": false
        }
      ],
      [
        {
          "height": 1,
          "direction": 1,
          "fixed": true
        },
        {
          "height": 1,
          "direction": 1,
          "fixed": false
        },
        {
          "height": 0,
          "direction": 1,
          "fixed": false
        },
        {
          "height": 0,
          "direction": 1,
          "fixed": false
        },
        {
          "height": 0,
          "direction": 1
        },
        {
          "height": 4,
          "direction": -1,
          "fixed": true
        },
        {
          "height": 4,
          "direction": -1,
          "fixed": true
        },
        {
          "height": 4,
          "direction": -1,
          "fixed": true
        },
        {
          "height": 0,
          "direction": 1
        },
        {
          "height": 0,
          "direction": 1,
          "fixed": false
        },
        {
          "height": 0,
          "direction": 1,
          "fixed": false
        },
        {
          "height": 1,
          "direction": 1,
          "fixed": false
        },
        {
          "height": 1,
          "direction": 1,
          "fixed": true
        }
      ]
    ],
    "solution": [
      10,
      12,
      22,
      22,
      22,
      24,
      26,
      48,
      48,
      62
    ]
  }
};

// Both branches share fixed approach roads and a single click budget.
export function dualRouteHint(level, remaining) {
  const size = level.rows;
  const offsets = [0, level.cols - size];
  for (const offset of offsets) {
    const edge = offset === 0 ? 'right' : 'left';
    const branch = {
      rows: size,
      cols: size,
      maxHeight: level.maxHeight,
      start: { edge, index: level.start.branchRow ?? size - 1, height: level.start.height },
      end: { edge, index: level.end.branchRow ?? 0, height: level.end.height },
      pillars: level.pillars.map(row => row.slice(offset, offset + size)),
    };
    const result = searchLevel(branch, remaining);
    if (result.solution?.length) {
      const index = result.solution[0] - 1;
      return Math.floor(index / size) * level.cols + offset + index % size;
    }
  }
  return null;
}
