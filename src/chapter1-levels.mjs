export const CHAPTER1 = [
  {
    "number": 1,
    "name": "先看归处",
    "type": "normal",
    "rows": 3,
    "cols": 3,
    "maxHeight": 4,
    "start": {
      "edge": "bottom",
      "index": 0,
      "height": 0
    },
    "end": {
      "edge": "top",
      "index": 2,
      "height": 4
    },
    "pillars": [
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
          "height": 1,
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
          "height": 1,
          "direction": 1
        }
      ]
    ],
    "minMoves": 1,
    "solution": [
      2
    ],
    "tip": "先看两端：起点能迈出去吗，归处能接上吗？",
    "teaching": "出口附近的断口；初始两端本身可达，需检查归处前的连接。"
  },
  {
    "number": 2,
    "name": "第一步的高度",
    "rows": 2,
    "cols": 3,
    "maxHeight": 3,
    "type": "normal",
    "start": {
      "edge": "bottom",
      "index": 0,
      "height": 0
    },
    "end": {
      "edge": "top",
      "index": 2,
      "height": 3
    },
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
          "height": 3,
          "direction": -1
        }
      ],
      [
        {
          "height": 3,
          "direction": -1
        },
        {
          "height": 2,
          "direction": -1
        },
        {
          "height": 2,
          "direction": -1
        }
      ]
    ],
    "tip": "先估必要调整次数，再找哪些联动能影响入口。",
    "minMoves": 2,
    "solution": [
      1,
      1
    ],
    "optimalCombinationCount": 2
  },
  {
    "number": 3,
    "name": "选一条好走的路",
    "rows": 2,
    "cols": 3,
    "maxHeight": 4,
    "type": "normal",
    "start": {
      "edge": "bottom",
      "index": 0,
      "height": 0
    },
    "end": {
      "edge": "top",
      "index": 2,
      "height": 4
    },
    "pillars": [
      [
        {
          "height": 1,
          "direction": -1
        },
        {
          "height": 4,
          "direction": -1
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
          "height": 4,
          "direction": -1
        },
        {
          "height": 3,
          "direction": -1
        }
      ]
    ],
    "tip": "比较入口旁的两条路，先考虑高差更小的一边。",
    "minMoves": 2,
    "solution": [
      1,
      2
    ],
    "optimalCombinationCount": 6
  },
  {
    "number": 4,
    "name": "借邻柱的力",
    "rows": 2,
    "cols": 3,
    "maxHeight": 4,
    "type": "normal",
    "start": {
      "edge": "bottom",
      "index": 0,
      "height": 0
    },
    "end": {
      "edge": "top",
      "index": 2,
      "height": 4
    },
    "pillars": [
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
          "height": 2,
          "direction": 1
        }
      ],
      [
        {
          "height": 0,
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
    "tip": "想改变一根柱子，不一定要直接点击它。",
    "minMoves": 2,
    "solution": [
      2,
      4
    ],
    "optimalCombinationCount": 1
  },
  {
    "number": 5,
    "name": "一举两得",
    "rows": 3,
    "cols": 3,
    "maxHeight": 4,
    "type": "normal",
    "start": {
      "edge": "bottom",
      "index": 0,
      "height": 0
    },
    "end": {
      "edge": "top",
      "index": 2,
      "height": 4
    },
    "pillars": [
      [
        {
          "height": 0,
          "direction": 1
        },
        {
          "height": 4,
          "direction": -1
        },
        {
          "height": 4,
          "direction": -1
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
          "direction": -1
        },
        {
          "height": 1,
          "direction": -1
        }
      ]
    ],
    "tip": "观察十字范围：一次联动能否同时修好两处断口？",
    "demonstration": {
      "seq": [
        5,
        6
      ],
      "click": 5,
      "repairedEdges": 2
    },
    "minMoves": 2,
    "solution": [
      5,
      6
    ],
    "optimalCombinationCount": 7
  },
  {
    "number": 6,
    "name": "保留与调整",
    "rows": 3,
    "cols": 3,
    "maxHeight": 4,
    "type": "normal",
    "start": {
      "edge": "bottom",
      "index": 0,
      "height": 0
    },
    "end": {
      "edge": "top",
      "index": 2,
      "height": 4
    },
    "pillars": [
      [
        {
          "height": 1,
          "direction": -1
        },
        {
          "height": 2,
          "direction": -1
        },
        {
          "height": 1,
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
          "height": 4,
          "direction": 1
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
          "height": 2,
          "direction": 1
        }
      ]
    ],
    "tip": "区分走路的位置和操作的位置，路外的柱子也能帮忙。",
    "demonstration": {
      "seq": [
        2,
        2,
        8
      ],
      "path": [
        {
          "type": "start",
          "height": 0
        },
        {
          "type": "pillar",
          "row": 2,
          "col": 0,
          "height": 1
        },
        {
          "type": "pillar",
          "row": 2,
          "col": 1,
          "height": 2
        },
        {
          "type": "pillar",
          "row": 2,
          "col": 2,
          "height": 3
        },
        {
          "type": "pillar",
          "row": 1,
          "col": 2,
          "height": 4
        },
        {
          "type": "pillar",
          "row": 0,
          "col": 2,
          "height": 3
        },
        {
          "type": "end",
          "height": 4
        }
      ]
    },
    "minMoves": 3,
    "solution": [
      2,
      2,
      8
    ],
    "optimalCombinationCount": 11
  },
  {
    "number": 7,
    "name": "同高不同向",
    "rows": 3,
    "cols": 3,
    "maxHeight": 4,
    "type": "normal",
    "start": {
      "edge": "bottom",
      "index": 0,
      "height": 0
    },
    "end": {
      "edge": "top",
      "index": 2,
      "height": 4
    },
    "pillars": [
      [
        {
          "height": 1,
          "direction": -1
        },
        {
          "height": 2,
          "direction": -1
        },
        {
          "height": 1,
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
          "height": 4,
          "direction": 1
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
          "height": 2,
          "direction": -1
        }
      ]
    ],
    "tip": "高度相同不代表下一步相同，也要看升降颜色。",
    "pairChangedCell": 9,
    "minMoves": 3,
    "solution": [
      2,
      3,
      7
    ],
    "optimalCombinationCount": 8
  },
  {
    "number": 8,
    "name": "从归处倒推",
    "rows": 2,
    "cols": 3,
    "maxHeight": 4,
    "type": "normal",
    "start": {
      "edge": "bottom",
      "index": 0,
      "height": 0
    },
    "end": {
      "edge": "top",
      "index": 2,
      "height": 4
    },
    "pillars": [
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
          "height": 1,
          "direction": -1
        },
        {
          "height": 3,
          "direction": -1
        }
      ]
    ],
    "tip": "归处旁的柱子需要多高？从那里往回找连接。",
    "minMoves": 3,
    "solution": [
      2,
      2,
      3
    ],
    "optimalCombinationCount": 2
  },
  {
    "number": 9,
    "name": "分配每一步",
    "rows": 3,
    "cols": 3,
    "maxHeight": 4,
    "type": "challenge",
    "start": {
      "edge": "bottom",
      "index": 0,
      "height": 0
    },
    "end": {
      "edge": "top",
      "index": 2,
      "height": 4
    },
    "pillars": [
      [
        {
          "height": 3,
          "direction": -1
        },
        {
          "height": 3,
          "direction": -1
        },
        {
          "height": 2,
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
          "height": 2,
          "direction": 1
        }
      ],
      [
        {
          "height": 3,
          "direction": -1
        },
        {
          "height": 2,
          "direction": 1
        },
        {
          "height": 4,
          "direction": -1
        }
      ]
    ],
    "tip": "先估两端各需几次变化，再安排有限的操作。",
    "minMoves": 3,
    "solution": [
      2,
      4,
      4
    ],
    "optimalCombinationCount": 13,
    "maxClicks": 4
  },
  {
    "number": 10,
    "name": "自己的判断",
    "rows": 3,
    "cols": 3,
    "maxHeight": 4,
    "type": "challenge",
    "start": {
      "edge": "bottom",
      "index": 0,
      "height": 0
    },
    "end": {
      "edge": "top",
      "index": 2,
      "height": 4
    },
    "pillars": [
      [
        {
          "height": 0,
          "direction": 1
        },
        {
          "height": 1,
          "direction": 1
        },
        {
          "height": 2,
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
          "height": 1,
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
          "height": 2,
          "direction": 1
        }
      ]
    ],
    "tip": "看两端、比邻路、找联动，再用预览验证判断。",
    "minMoves": 4,
    "solution": [
      2,
      4,
      4,
      4
    ],
    "optimalCombinationCount": 21,
    "maxClicks": 5
  }
];
