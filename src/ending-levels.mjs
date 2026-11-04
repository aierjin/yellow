export const ENDING_LEVELS = [
  {
    "number": 56,
    "name": "暮色回响",
    "rows": 4,
    "cols": 4,
    "maxHeight": 4,
    "type": "challenge",
    "start": {
      "edge": "bottom",
      "index": 0,
      "height": 0
    },
    "end": {
      "pillar": {
        "row": 0,
        "col": 3
      }
    },
    "pillars": [
      [
        {
          "height": 0,
          "direction": 1,
          "sync": "a"
        },
        {
          "height": 0,
          "direction": 1,
          "blocked": true
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
          "height": 1,
          "direction": -1
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
          "height": 2,
          "direction": 1,
          "fixed": true
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
          "height": 0,
          "direction": 1,
          "blocked": true
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
          "height": 1,
          "direction": -1
        },
        {
          "height": 3,
          "direction": 1
        },
        {
          "height": 1,
          "direction": -1,
          "sync": "a"
        }
      ]
    ],
    "tip": "先看两端，再把固定高度、缺口和远处的响应一起考虑。",
    "discovery": "熟悉的规则相遇了，先找不能绕过的连接。",
    "minMoves": 7,
    "solution": [
      1,
      1,
      1,
      3,
      13,
      13,
      13
    ],
    "maxClicks": 9
  },
  {
    "number": 57,
    "name": "长夜归途",
    "rows": 4,
    "cols": 4,
    "maxHeight": 4,
    "type": "challenge",
    "start": {
      "edge": "bottom",
      "index": 0,
      "height": 0
    },
    "end": {
      "pillar": {
        "row": 0,
        "col": 3
      }
    },
    "pillars": [
      [
        {
          "height": 1,
          "direction": -1,
          "sync": "a"
        },
        {
          "height": 0,
          "direction": 1,
          "blocked": true
        },
        {
          "height": 4,
          "direction": -1
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
          "direction": 1,
          "blocked": true
        },
        {
          "height": 0,
          "direction": 1,
          "blocked": true
        },
        {
          "height": 2,
          "direction": 1,
          "fixed": true
        }
      ],
      [
        {
          "height": 1,
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
        }
      ],
      [
        {
          "height": 4,
          "direction": -1
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
          "direction": -1,
          "sync": "a"
        }
      ]
    ],
    "tip": "先看两端，再把固定高度、缺口和远处的响应一起考虑。",
    "discovery": "熟悉的规则相遇了，先找不能绕过的连接。",
    "minMoves": 7,
    "solution": [
      1,
      1,
      1,
      3,
      9,
      9,
      9
    ],
    "maxClicks": 9
  },
  {
    "number": 58,
    "name": "最后的路",
    "rows": 4,
    "cols": 4,
    "maxHeight": 6,
    "type": "challenge",
    "maxClicks": 11,
    "start": {
      "edge": "bottom",
      "index": 0,
      "height": 0
    },
    "end": {
      "edge": "top",
      "index": 3,
      "height": 6
    },
    "pillars": [
      [
        {
          "height": 1,
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
          "height": 0,
          "direction": 1
        }
      ],
      [
        {
          "height": 6,
          "direction": -1
        },
        {
          "height": 6,
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
          "height": 2,
          "direction": -1
        }
      ]
    ],
    "tip": "先看两端，再让每一次升降兼顾整条路。",
    "discovery": "最后一次，只用熟悉的升降搭出归途。",
    "minMoves": 9,
    "solution": [
      4,
      4,
      4,
      4,
      4,
      9,
      9,
      13,
      14
    ],
    "minimumProof": "起点首柱5降至1至少4次，终点首柱0升至5至少5次；两者可影响操作集合不相交，故至少9次。附9步可行解。"
  }
];
