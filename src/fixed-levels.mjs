export const FIXED_LEVELS = [
  {
    "number": 39,
    "name": "不动的石台",
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
          "height": 4,
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
          "height": 2,
          "direction": 1,
          "fixed": true
        },
        {
          "height": 3,
          "direction": -1
        }
      ],
      [
        {
          "height": 1,
          "direction": 1
        },
        {
          "height": 0,
          "direction": 1
        },
        {
          "height": 4,
          "direction": -1
        }
      ]
    ],
    "tip": "先找固定高度，把它当作搭路的参照，再调整两侧。",
    "discovery": "灰褐色刻字的石柱高度固定，不能点击，但可以行走。",
    "minMoves": 3,
    "solution": [
      1,
      2,
      2
    ],
    "coverageBudget": 4,
    "fixedEvidence": {
      "ids": [
        5
      ],
      "allNecessaryInBudget": true,
      "unfreezeEachBreaksExample": true,
      "examplePath": [
        7,
        4,
        5,
        6,
        3
      ]
    }
  },
  {
    "number": 40,
    "name": "接近不变",
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
          "height": 3,
          "direction": 1,
          "fixed": true
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
          "height": 3,
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
      ]
    ],
    "tip": "固定柱不动，看看邻柱下一次升降后，能否接近它。",
    "discovery": "先看归处附近，哪一段高度不会改变？",
    "minMoves": 3,
    "solution": [
      3,
      4,
      8
    ],
    "coverageBudget": 4,
    "fixedEvidence": {
      "ids": [
        2
      ],
      "allNecessaryInBudget": true,
      "unfreezeEachBreaksExample": true,
      "examplePath": [
        7,
        4,
        5,
        2,
        3
      ]
    }
  },
  {
    "number": 41,
    "name": "留住一段",
    "rows": 4,
    "cols": 4,
    "maxHeight": 4,
    "type": "challenge",
    "start": {
      "edge": "bottom",
      "index": 0,
      "height": 4
    },
    "end": {
      "edge": "top",
      "index": 3,
      "height": 0
    },
    "maxClicks": 7,
    "pillars": [
      [
        {
          "height": 2,
          "direction": -1
        },
        {
          "height": 3,
          "direction": 1
        },
        {
          "height": 1,
          "direction": -1,
          "fixed": true
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
          "height": 0,
          "direction": 1
        },
        {
          "height": 3,
          "direction": 1
        },
        {
          "height": 1,
          "direction": 1
        }
      ],
      [
        {
          "height": 3,
          "direction": -1
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
          "height": 4,
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
          "direction": -1
        },
        {
          "height": 1,
          "direction": -1
        },
        {
          "height": 1,
          "direction": -1
        }
      ]
    ],
    "minMoves": 6,
    "solution": [
      2,
      8,
      8,
      8,
      13,
      14
    ],
    "coverageBudget": 6,
    "fixedEvidence": {
      "ids": [
        3
      ],
      "allNecessaryInBudget": true,
      "unfreezeEachBreaksExample": true,
      "examplePath": [
        13,
        9,
        10,
        6,
        7,
        3,
        4
      ]
    }
  },
  {
    "number": 42,
    "name": "分段搭路",
    "rows": 4,
    "cols": 4,
    "maxHeight": 4,
    "type": "normal",
    "start": {
      "edge": "bottom",
      "index": 0,
      "height": 0
    },
    "end": {
      "edge": "top",
      "index": 3,
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
          "height": 0,
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
          "direction": 1,
          "fixed": true
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
          "height": 1,
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
          "height": 1,
          "direction": 1
        },
        {
          "height": 4,
          "direction": -1
        }
      ]
    ],
    "tip": "把固定柱两侧分别看清，再找能兼顾两段的操作。",
    "discovery": "地图变大了，先找不变的参照。",
    "minMoves": 4,
    "solution": [
      7,
      9,
      9,
      13
    ],
    "coverageBudget": 5,
    "fixedEvidence": {
      "ids": [
        6
      ],
      "allNecessaryInBudget": true,
      "unfreezeEachBreaksExample": true,
      "examplePath": [
        13,
        14,
        10,
        6,
        7,
        8,
        4
      ]
    }
  },
  {
    "number": 43,
    "name": "两个参照",
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
      "edge": "top",
      "index": 3,
      "height": 4
    },
    "pillars": [
      [
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
          "direction": 1,
          "fixed": true
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
          "height": 4,
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
          "height": 1,
          "direction": 1,
          "fixed": true
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
          "height": 2,
          "direction": -1
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
          "height": 1,
          "direction": -1
        }
      ]
    ],
    "tip": "两个固定高度之间，也需要能连续行走的过渡。",
    "discovery": "两座固定石台之间，还缺怎样的过渡？",
    "maxClicks": 5,
    "minMoves": 4,
    "solution": [
      4,
      8,
      8,
      9
    ],
    "coverageBudget": 5,
    "fixedEvidence": {
      "ids": [
        10,
        3
      ],
      "allNecessaryInBudget": true,
      "unfreezeEachBreaksExample": true,
      "examplePath": [
        13,
        9,
        10,
        11,
        12,
        8,
        7,
        3,
        4
      ]
    }
  },
  {
    "number": 44,
    "name": "稳中有变",
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
      "edge": "top",
      "index": 3,
      "height": 4
    },
    "pillars": [
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
          "height": 2,
          "direction": 1,
          "fixed": true
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
          "height": 1,
          "direction": -1
        },
        {
          "height": 2,
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
          "height": 3,
          "direction": -1
        },
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
          "direction": 1
        }
      ]
    ],
    "tip": "固定柱旁的操作仍会影响别处，别只检查眼前的一段。",
    "discovery": "归处前有稳定落脚点，观察哪些联动会改变来路。",
    "maxClicks": 5,
    "minMoves": 4,
    "solution": [
      4,
      4,
      9,
      14
    ],
    "coverageBudget": 5,
    "fixedEvidence": {
      "ids": [
        3
      ],
      "allNecessaryInBudget": true,
      "unfreezeEachBreaksExample": true,
      "examplePath": [
        13,
        9,
        5,
        6,
        2,
        3,
        4
      ]
    }
  },
  {
    "number": 45,
    "name": "换个切入点",
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
      "edge": "top",
      "index": 3,
      "height": 4
    },
    "pillars": [
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
          "height": 2,
          "direction": 1
        },
        {
          "height": 0,
          "direction": 1
        },
        {
          "height": 2,
          "direction": 1,
          "fixed": true
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
          "direction": 1
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
          "height": 2,
          "direction": -1
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
          "height": 0,
          "direction": 1
        }
      ]
    ],
    "tip": "从固定高度反推邻柱，比盯着起点一路试更容易找到切入点。",
    "discovery": "先看路中不变的高度，再向两端寻找连接。",
    "maxClicks": 5,
    "minMoves": 4,
    "solution": [
      3,
      3,
      3,
      9
    ],
    "coverageBudget": 5,
    "fixedEvidence": {
      "ids": [
        7
      ],
      "allNecessaryInBudget": false,
      "necessityBudget": 4,
      "unfreezeEachBreaksExample": true,
      "examplePath": [
        13,
        14,
        10,
        11,
        7,
        3,
        4
      ]
    }
  },
  {
    "number": 46,
    "name": "循台而归",
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
      "edge": "top",
      "index": 3,
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
          "height": 3,
          "direction": -1
        },
        {
          "height": 2,
          "direction": -1
        },
        {
          "height": 3,
          "direction": 1,
          "fixed": true
        },
        {
          "height": 0,
          "direction": 1
        }
      ],
      [
        {
          "height": 3,
          "direction": 1
        },
        {
          "height": 1,
          "direction": 1,
          "fixed": true
        },
        {
          "height": 4,
          "direction": -1
        },
        {
          "height": 1,
          "direction": 1
        }
      ],
      [
        {
          "height": 3,
          "direction": -1
        },
        {
          "height": 1,
          "direction": 1
        },
        {
          "height": 0,
          "direction": 1
        },
        {
          "height": 3,
          "direction": 1
        }
      ]
    ],
    "tip": "先用两个固定高度分段，再找能兼顾前后路段的联动。",
    "discovery": "两座石台不会改变，怎样把它们和两端接起来？",
    "maxClicks": 6,
    "minMoves": 5,
    "solution": [
      3,
      4,
      4,
      9,
      9
    ],
    "coverageBudget": 6,
    "fixedEvidence": {
      "ids": [
        10,
        7
      ],
      "allNecessaryInBudget": false,
      "necessityBudget": 5,
      "unfreezeEachBreaksExample": true,
      "examplePath": [
        13,
        14,
        10,
        6,
        7,
        8,
        4
      ]
    }
  }
];
