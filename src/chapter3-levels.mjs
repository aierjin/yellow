export const CHAPTER3 = [
  {
    "number": 21,
    "name": "新阶",
    "rows": 4,
    "cols": 4,
    "maxHeight": 5,
    "type": "normal",
    "start": {
      "edge": "bottom",
      "index": 0,
      "height": 0
    },
    "end": {
      "edge": "top",
      "index": 3,
      "height": 5
    },
    "pillars": [
      [
        {
          "height": 4,
          "direction": 1
        },
        {
          "height": 3,
          "direction": -1
        },
        {
          "height": 1,
          "direction": 1
        },
        {
          "height": 3,
          "direction": 1
        }
      ],
      [
        {
          "height": 0,
          "direction": 1
        },
        {
          "height": 2,
          "direction": 1
        },
        {
          "height": 0,
          "direction": 1
        },
        {
          "height": 2,
          "direction": -1
        }
      ],
      [
        {
          "height": 1,
          "direction": 1
        },
        {
          "height": 1,
          "direction": 1
        },
        {
          "height": 1,
          "direction": -1
        },
        {
          "height": 1,
          "direction": -1
        }
      ],
      [
        {
          "height": 2,
          "direction": -1
        },
        {
          "height": 3,
          "direction": -1
        },
        {
          "height": 3,
          "direction": -1
        },
        {
          "height": 3,
          "direction": 1
        }
      ]
    ],
    "discovery": "高度上限提高到 5，观察每根柱子的反向时机",
    "minMoves": 3,
    "solution": [
      2,
      4,
      9
    ]
  },
  {
    "number": 22,
    "name": "林间小憩",
    "rows": 3,
    "cols": 3,
    "maxHeight": 5,
    "type": "normal",
    "start": {
      "edge": "bottom",
      "index": 0,
      "height": 0
    },
    "end": {
      "edge": "top",
      "index": 2,
      "height": 5
    },
    "pillars": [
      [
        {
          "height": 3,
          "direction": 1
        },
        {
          "height": 5,
          "direction": -1
        },
        {
          "height": 4,
          "direction": 1
        }
      ],
      [
        {
          "height": 3,
          "direction": -1
        },
        {
          "height": 4,
          "direction": 1
        },
        {
          "height": 0,
          "direction": 1
        }
      ],
      [
        {
          "height": 3,
          "direction": -1
        },
        {
          "height": 0,
          "direction": 1
        },
        {
          "height": 0,
          "direction": 1
        }
      ]
    ],
    "discovery": "在小庭院中练习高度 5 与联动",
    "minMoves": 3,
    "solution": [
      2,
      4,
      8
    ]
  },
  {
    "number": 23,
    "name": "回声庭院",
    "rows": 3,
    "cols": 3,
    "maxHeight": 5,
    "type": "normal",
    "start": {
      "edge": "bottom",
      "index": 0,
      "height": 5
    },
    "end": {
      "edge": "top",
      "index": 2,
      "height": 0
    },
    "pillars": [
      [
        {
          "height": 3,
          "direction": -1
        },
        {
          "height": 3,
          "direction": 1
        },
        {
          "height": 2,
          "direction": -1
        }
      ],
      [
        {
          "height": 0,
          "direction": 1
        },
        {
          "height": 4,
          "direction": 1
        },
        {
          "height": 4,
          "direction": -1
        }
      ],
      [
        {
          "height": 4,
          "direction": 1
        },
        {
          "height": 1,
          "direction": -1
        },
        {
          "height": 2,
          "direction": -1
        }
      ]
    ],
    "discovery": "在小庭院中练习高度 5 与联动",
    "minMoves": 4,
    "solution": [
      1,
      2,
      5,
      5
    ]
  },
  {
    "number": 24,
    "name": "错岸林径",
    "rows": 4,
    "cols": 4,
    "maxHeight": 5,
    "type": "challenge",
    "start": {
      "edge": "bottom",
      "index": 0,
      "height": 0
    },
    "end": {
      "edge": "top",
      "index": 2,
      "height": 5
    },
    "pillars": [
      [
        {
          "height": 5,
          "direction": -1
        },
        {
          "height": 2,
          "direction": -1
        },
        {
          "height": 4,
          "direction": -1
        },
        {
          "height": 3,
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
          "direction": -1
        },
        {
          "height": 1,
          "direction": -1
        },
        {
          "height": 3,
          "direction": 1
        }
      ],
      [
        {
          "height": 5,
          "direction": -1
        },
        {
          "height": 2,
          "direction": -1
        },
        {
          "height": 2,
          "direction": 1
        },
        {
          "height": 5,
          "direction": -1
        }
      ],
      [
        {
          "height": 0,
          "direction": 1
        },
        {
          "height": 5,
          "direction": -1
        },
        {
          "height": 5,
          "direction": -1
        },
        {
          "height": 0,
          "direction": 1
        }
      ]
    ],
    "discovery": "观察整张棋盘，让外围石柱参与连接",
    "maxClicks": 5,
    "coverage": {
      "budget": 5,
      "omittedColumns": [
        {
          "solvable": false,
          "checked": 0
        },
        {
          "solvable": false,
          "checked": 6188
        },
        {
          "solvable": false,
          "checked": 0
        },
        {
          "solvable": false,
          "checked": 6188
        }
      ]
    },
    "minMoves": 4,
    "solution": [
      5,
      5,
      12,
      13
    ]
  },
  {
    "number": 25,
    "name": "林海初见",
    "rows": 5,
    "cols": 5,
    "maxHeight": 5,
    "type": "normal",
    "start": {
      "edge": "bottom",
      "index": 0,
      "height": 0
    },
    "end": {
      "edge": "top",
      "index": 4,
      "height": 5
    },
    "pillars": [
      [
        {
          "height": 4,
          "direction": 1
        },
        {
          "height": 1,
          "direction": 1
        },
        {
          "height": 3,
          "direction": -1
        },
        {
          "height": 2,
          "direction": -1
        },
        {
          "height": 4,
          "direction": 1
        }
      ],
      [
        {
          "height": 3,
          "direction": 1
        },
        {
          "height": 0,
          "direction": 1
        },
        {
          "height": 2,
          "direction": 1
        },
        {
          "height": 1,
          "direction": 1
        },
        {
          "height": 3,
          "direction": -1
        }
      ],
      [
        {
          "height": 4,
          "direction": 1
        },
        {
          "height": 3,
          "direction": 1
        },
        {
          "height": 4,
          "direction": 1
        },
        {
          "height": 4,
          "direction": 1
        },
        {
          "height": 5,
          "direction": -1
        }
      ],
      [
        {
          "height": 1,
          "direction": -1
        },
        {
          "height": 5,
          "direction": -1
        },
        {
          "height": 1,
          "direction": 1
        },
        {
          "height": 4,
          "direction": 1
        },
        {
          "height": 3,
          "direction": 1
        }
      ],
      [
        {
          "height": 1,
          "direction": 1
        },
        {
          "height": 1,
          "direction": 1
        },
        {
          "height": 4,
          "direction": -1
        },
        {
          "height": 1,
          "direction": -1
        },
        {
          "height": 1,
          "direction": 1
        }
      ]
    ],
    "discovery": "棋盘扩大到 5 × 5，先找一条可连接的路线",
    "minMoves": 3,
    "solution": [
      8,
      17,
      18
    ]
  },
  {
    "number": 26,
    "name": "枝间回响",
    "rows": 5,
    "cols": 5,
    "maxHeight": 5,
    "type": "normal",
    "start": {
      "edge": "bottom",
      "index": 0,
      "height": 5
    },
    "end": {
      "edge": "top",
      "index": 4,
      "height": 0
    },
    "pillars": [
      [
        {
          "height": 2,
          "direction": -1
        },
        {
          "height": 1,
          "direction": 1
        },
        {
          "height": 3,
          "direction": -1
        },
        {
          "height": 2,
          "direction": 1
        },
        {
          "height": 0,
          "direction": 1
        }
      ],
      [
        {
          "height": 1,
          "direction": 1
        },
        {
          "height": 3,
          "direction": 1
        },
        {
          "height": 3,
          "direction": -1
        },
        {
          "height": 3,
          "direction": -1
        },
        {
          "height": 4,
          "direction": 1
        }
      ],
      [
        {
          "height": 2,
          "direction": 1
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
          "height": 2,
          "direction": 1
        },
        {
          "height": 4,
          "direction": 1
        },
        {
          "height": 5,
          "direction": -1
        },
        {
          "height": 0,
          "direction": 1
        },
        {
          "height": 2,
          "direction": 1
        }
      ],
      [
        {
          "height": 5,
          "direction": -1
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
          "height": 1,
          "direction": 1
        },
        {
          "height": 4,
          "direction": 1
        }
      ]
    ],
    "discovery": "观察整张棋盘，让外围石柱参与连接",
    "minMoves": 3,
    "solution": [
      1,
      10,
      16
    ]
  },
  {
    "number": 27,
    "name": "侧岸",
    "rows": 5,
    "cols": 5,
    "maxHeight": 5,
    "type": "challenge",
    "start": {
      "edge": "bottom",
      "index": 0,
      "height": 0
    },
    "end": {
      "edge": "top",
      "index": 3,
      "height": 5
    },
    "pillars": [
      [
        {
          "height": 2,
          "direction": 1
        },
        {
          "height": 1,
          "direction": -1
        },
        {
          "height": 1,
          "direction": -1
        },
        {
          "height": 3,
          "direction": 1
        },
        {
          "height": 4,
          "direction": -1
        }
      ],
      [
        {
          "height": 3,
          "direction": 1
        },
        {
          "height": 1,
          "direction": -1
        },
        {
          "height": 0,
          "direction": 1
        },
        {
          "height": 2,
          "direction": -1
        },
        {
          "height": 0,
          "direction": 1
        }
      ],
      [
        {
          "height": 4,
          "direction": 1
        },
        {
          "height": 2,
          "direction": 1
        },
        {
          "height": 5,
          "direction": -1
        },
        {
          "height": 1,
          "direction": 1
        },
        {
          "height": 3,
          "direction": -1
        }
      ],
      [
        {
          "height": 5,
          "direction": -1
        },
        {
          "height": 2,
          "direction": -1
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
          "height": 3,
          "direction": -1
        }
      ],
      [
        {
          "height": 4,
          "direction": -1
        },
        {
          "height": 2,
          "direction": -1
        },
        {
          "height": 1,
          "direction": 1
        },
        {
          "height": 4,
          "direction": 1
        },
        {
          "height": 4,
          "direction": -1
        }
      ]
    ],
    "discovery": "观察整张棋盘，让外围石柱参与连接",
    "maxClicks": 6,
    "coverage": {
      "budget": 6,
      "omittedColumns": [
        {
          "solvable": false,
          "checked": 0
        },
        {
          "solvable": false,
          "checked": 230230
        },
        {
          "solvable": false,
          "checked": 230230
        },
        {
          "solvable": false,
          "checked": 0
        },
        {
          "solvable": false,
          "checked": 230230
        }
      ]
    },
    "minMoves": 5,
    "solution": [
      5,
      15,
      16,
      16,
      22
    ]
  },
  {
    "number": 28,
    "name": "林间落阶",
    "rows": 5,
    "cols": 5,
    "maxHeight": 5,
    "type": "challenge",
    "start": {
      "edge": "bottom",
      "index": 1,
      "height": 5
    },
    "end": {
      "edge": "top",
      "index": 4,
      "height": 0
    },
    "pillars": [
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
          "height": 3,
          "direction": -1
        },
        {
          "height": 1,
          "direction": 1
        },
        {
          "height": 3,
          "direction": -1
        }
      ],
      [
        {
          "height": 2,
          "direction": -1
        },
        {
          "height": 5,
          "direction": -1
        },
        {
          "height": 3,
          "direction": 1
        },
        {
          "height": 3,
          "direction": -1
        },
        {
          "height": 1,
          "direction": -1
        }
      ],
      [
        {
          "height": 5,
          "direction": -1
        },
        {
          "height": 5,
          "direction": -1
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
          "height": 1,
          "direction": -1
        }
      ],
      [
        {
          "height": 5,
          "direction": -1
        },
        {
          "height": 1,
          "direction": -1
        },
        {
          "height": 1,
          "direction": 1
        },
        {
          "height": 4,
          "direction": 1
        },
        {
          "height": 4,
          "direction": -1
        }
      ],
      [
        {
          "height": 3,
          "direction": -1
        },
        {
          "height": 5,
          "direction": -1
        },
        {
          "height": 1,
          "direction": -1
        },
        {
          "height": 5,
          "direction": -1
        },
        {
          "height": 3,
          "direction": -1
        }
      ]
    ],
    "discovery": "观察整张棋盘，让外围石柱参与连接",
    "maxClicks": 5,
    "coverage": {
      "budget": 5,
      "omittedColumns": [
        {
          "solvable": false,
          "checked": 53130
        },
        {
          "solvable": false,
          "checked": 0
        },
        {
          "solvable": false,
          "checked": 53130
        },
        {
          "solvable": false,
          "checked": 53130
        },
        {
          "solvable": false,
          "checked": 0
        }
      ]
    },
    "minMoves": 4,
    "solution": [
      2,
      5,
      10,
      17
    ]
  },
  {
    "number": 29,
    "name": "合流",
    "rows": 5,
    "cols": 5,
    "maxHeight": 5,
    "type": "normal",
    "start": {
      "edge": "bottom",
      "index": 0,
      "height": 0
    },
    "end": {
      "edge": "top",
      "index": 4,
      "height": 5
    },
    "pillars": [
      [
        {
          "height": 5,
          "direction": -1
        },
        {
          "height": 4,
          "direction": -1
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
          "height": 3,
          "direction": 1
        }
      ],
      [
        {
          "height": 0,
          "direction": 1
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
          "height": 5,
          "direction": -1
        },
        {
          "height": 4,
          "direction": 1
        }
      ],
      [
        {
          "height": 3,
          "direction": -1
        },
        {
          "height": 4,
          "direction": 1
        },
        {
          "height": 1,
          "direction": -1
        },
        {
          "height": 0,
          "direction": 1
        },
        {
          "height": 3,
          "direction": 1
        }
      ],
      [
        {
          "height": 4,
          "direction": -1
        },
        {
          "height": 2,
          "direction": 1
        },
        {
          "height": 3,
          "direction": -1
        },
        {
          "height": 3,
          "direction": -1
        },
        {
          "height": 1,
          "direction": 1
        }
      ],
      [
        {
          "height": 0,
          "direction": 1
        },
        {
          "height": 4,
          "direction": 1
        },
        {
          "height": 4,
          "direction": 1
        },
        {
          "height": 2,
          "direction": -1
        },
        {
          "height": 1,
          "direction": -1
        }
      ]
    ],
    "discovery": "观察整张棋盘，让外围石柱参与连接",
    "minMoves": 4,
    "solution": [
      1,
      4,
      11,
      16
    ]
  },
  {
    "number": 30,
    "name": "森谷归途",
    "rows": 5,
    "cols": 5,
    "maxHeight": 5,
    "type": "challenge",
    "start": {
      "edge": "bottom",
      "index": 0,
      "height": 5
    },
    "end": {
      "edge": "top",
      "index": 3,
      "height": 0
    },
    "pillars": [
      [
        {
          "height": 4,
          "direction": 1
        },
        {
          "height": 2,
          "direction": 1
        },
        {
          "height": 3,
          "direction": 1
        },
        {
          "height": 2,
          "direction": -1
        },
        {
          "height": 3,
          "direction": -1
        }
      ],
      [
        {
          "height": 3,
          "direction": 1
        },
        {
          "height": 3,
          "direction": -1
        },
        {
          "height": 3,
          "direction": -1
        },
        {
          "height": 5,
          "direction": -1
        },
        {
          "height": 3,
          "direction": 1
        }
      ],
      [
        {
          "height": 2,
          "direction": -1
        },
        {
          "height": 2,
          "direction": 1
        },
        {
          "height": 5,
          "direction": -1
        },
        {
          "height": 1,
          "direction": 1
        },
        {
          "height": 4,
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
          "direction": -1
        },
        {
          "height": 3,
          "direction": 1
        },
        {
          "height": 4,
          "direction": -1
        },
        {
          "height": 4,
          "direction": 1
        }
      ],
      [
        {
          "height": 0,
          "direction": 1
        },
        {
          "height": 4,
          "direction": 1
        },
        {
          "height": 1,
          "direction": 1
        },
        {
          "height": 3,
          "direction": 1
        },
        {
          "height": 2,
          "direction": -1
        }
      ]
    ],
    "discovery": "观察整张棋盘，让外围石柱参与连接",
    "maxClicks": 6,
    "coverage": {
      "budget": 6,
      "omittedColumns": [
        {
          "solvable": false,
          "checked": 0
        },
        {
          "solvable": false,
          "checked": 230230
        },
        {
          "solvable": false,
          "checked": 230230
        },
        {
          "solvable": false,
          "checked": 0
        },
        {
          "solvable": false,
          "checked": 230230
        }
      ]
    },
    "minMoves": 5,
    "solution": [
      4,
      16,
      16,
      22,
      22
    ]
  }
];
