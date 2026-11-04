export const FINALE_LEVELS = [
  {
    "number": 47,
    "name": "缺口后的路",
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
          "direction": 1,
          "blocked": true
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
          "height": 0,
          "direction": 1,
          "blocked": true
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
          "direction": -1
        },
        {
          "height": 3,
          "direction": -1
        },
        {
          "height": 1,
          "direction": -1
        }
      ]
    ],
    "tip": "遇到缺口，先找必经位置，再围绕固定高度搭路。",
    "discovery": "缺口不能走，也不会参与联动；先看看剩下的路。",
    "minMoves": 3,
    "solution": [
      2,
      2,
      9
    ],
    "coverageBudget": 3,
    "evidence": {
      "fixedNecessaryAtMinimum": true,
      "unfreezingBreaksExample": true,
      "filledMinimum": 2,
      "fillingChangesExample": false,
      "filledExamplePathLength": 5,
      "examplePath": [
        7,
        8,
        5,
        6,
        3
      ]
    }
  },
  {
    "number": 48,
    "name": "绕过空处",
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
          "direction": 1
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
          "height": 1,
          "direction": -1
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
        },
        {
          "height": 2,
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
          "direction": 1,
          "blocked": true
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
          "height": 4,
          "direction": -1
        }
      ]
    ],
    "tip": "走得更远不一定操作更多，比较缺口两侧的高差。",
    "discovery": "中央缺口隔开两侧，哪条路更容易接近固定石台？",
    "minMoves": 4,
    "solution": [
      3,
      3,
      4,
      14
    ],
    "coverageBudget": 4,
    "evidence": {
      "fixedNecessaryAtMinimum": true,
      "unfreezingBreaksExample": true,
      "filledMinimum": 4,
      "fillingChangesExample": false,
      "filledExamplePathLength": 7,
      "examplePath": [
        13,
        9,
        5,
        1,
        2,
        3,
        7,
        8,
        4
      ]
    }
  },
  {
    "number": 49,
    "name": "少一分牵连",
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
          "direction": 1,
          "blocked": true
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
          "height": 0,
          "direction": 1
        },
        {
          "height": 2,
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
          "height": 1,
          "direction": 1
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
          "height": 2,
          "direction": 1
        }
      ]
    ],
    "tip": "缺口旁少了邻柱，可以寻找牵连更少的调整位置。",
    "discovery": "先看缺口边缘，哪些操作只会影响少量石柱？",
    "minMoves": 4,
    "solution": [
      3,
      3,
      4,
      10
    ],
    "coverageBudget": 4,
    "evidence": {
      "fixedNecessaryAtMinimum": true,
      "unfreezingBreaksExample": true,
      "filledMinimum": 3,
      "fillingChangesExample": false,
      "filledExamplePathLength": 7,
      "examplePath": [
        13,
        14,
        10,
        11,
        7,
        3,
        4
      ]
    },
    "maxClicks": 6
  },
  {
    "number": 50,
    "name": "远处的回应",
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
          "height": 1,
          "direction": 1,
          "sync": "a"
        },
        {
          "height": 0,
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
          "height": 0,
          "direction": 1
        },
        {
          "height": 0,
          "direction": 1,
          "sync": "a"
        },
        {
          "height": 3,
          "direction": 1
        }
      ]
    ],
    "tip": "同纹石柱会一起响应，各自仍按升降颜色移动。",
    "discovery": "双环纹是同步柱：一根受到操作，另一根也移动一级。",
    "minMoves": 3,
    "solution": [
      2,
      6,
      6
    ],
    "coverageBudget": 3,
    "evidence": {
      "fixedNecessaryAtMinimum": true,
      "unfreezingBreaksExample": true,
      "linkNecessaryAtMinimum": true,
      "examplePath": [
        7,
        8,
        5,
        2,
        3
      ]
    }
  },
  {
    "number": 51,
    "name": "借邻传意",
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
          "direction": 1,
          "sync": "a"
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
          "height": 3,
          "direction": 1
        },
        {
          "height": 2,
          "direction": 1,
          "fixed": true
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
          "height": 2,
          "direction": 1
        },
        {
          "height": 1,
          "direction": 1,
          "sync": "a"
        }
      ]
    ],
    "tip": "同步柱被邻柱带动时，也会带动远端的同纹柱。",
    "discovery": "不直接点双环柱，也能让远处的一根响应。",
    "minMoves": 3,
    "solution": [
      4,
      4,
      7
    ],
    "coverageBudget": 3,
    "evidence": {
      "fixedNecessaryAtMinimum": true,
      "unfreezingBreaksExample": true,
      "linkNecessaryAtMinimum": true,
      "examplePath": [
        7,
        4,
        5,
        8,
        9,
        6,
        3
      ]
    }
  },
  {
    "number": 52,
    "name": "各动一次",
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
          "height": 3,
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
          "height": 3,
          "direction": 1,
          "sync": "a"
        },
        {
          "height": 1,
          "direction": -1
        },
        {
          "height": 3,
          "direction": -1,
          "sync": "a"
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
          "height": 4,
          "direction": -1
        }
      ]
    ],
    "tip": "同一次操作碰到两根同步柱，它们也各只移动一级。",
    "discovery": "观察同时包含两根双环柱的十字范围。",
    "minMoves": 3,
    "solution": [
      5,
      6,
      6
    ],
    "coverageBudget": 3,
    "evidence": {
      "fixedNecessaryAtMinimum": true,
      "unfreezingBreaksExample": true,
      "linkNecessaryAtMinimum": true,
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
    "number": 53,
    "name": "照顾两端",
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
          "height": 0,
          "direction": 1
        },
        {
          "height": 3,
          "direction": 1,
          "sync": "a"
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
          "direction": -1
        },
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
          "height": 0,
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
          "height": 3,
          "direction": -1,
          "sync": "a"
        },
        {
          "height": 1,
          "direction": -1
        }
      ]
    ],
    "tip": "操作前一起检查近处和远处，别让远端的路被推开。",
    "discovery": "双环相隔更远了，先比较两处的升降方向。",
    "minMoves": 4,
    "solution": [
      3,
      8,
      8,
      9
    ],
    "coverageBudget": 4,
    "evidence": {
      "fixedNecessaryAtMinimum": true,
      "unfreezingBreaksExample": true,
      "linkNecessaryAtMinimum": true,
      "examplePath": [
        13,
        14,
        15,
        16,
        12,
        8,
        7,
        3,
        4
      ]
    }
  },
  {
    "number": 54,
    "name": "借远修近",
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
          "height": 1,
          "direction": -1,
          "sync": "a"
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
          "height": 2,
          "direction": 1,
          "fixed": true
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
          "height": 3,
          "direction": -1,
          "sync": "a"
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
          "height": 0,
          "direction": 1
        }
      ],
      [
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
        },
        {
          "height": 0,
          "direction": 1
        }
      ]
    ],
    "tip": "可以从远处调整关键石柱，比较哪一侧操作的牵连更少。",
    "discovery": "同一对双环，从哪一侧操作更容易保住已有连接？",
    "minMoves": 4,
    "solution": [
      2,
      9,
      9,
      9
    ],
    "coverageBudget": 4,
    "evidence": {
      "fixedNecessaryAtMinimum": true,
      "unfreezingBreaksExample": true,
      "linkNecessaryAtMinimum": true,
      "examplePath": [
        13,
        9,
        5,
        6,
        2,
        3,
        4
      ]
    },
    "maxClicks": 6
  },
  {
    "number": 55,
    "name": "黄昏归途",
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
          "height": 4,
          "direction": -1
        },
        {
          "height": 0,
          "direction": 1,
          "sync": "a"
        },
        {
          "height": 2,
          "direction": -1
        },
        {
          "height": 2,
          "direction": -1
        }
      ],
      [
        {
          "height": 4,
          "direction": -1
        },
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
        }
      ],
      [
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
          "direction": 1,
          "sync": "a"
        },
        {
          "height": 2,
          "direction": -1
        }
      ]
    ],
    "tip": "先看两端和固定高度，再用同步关系兼顾整条路线。",
    "discovery": "把不变的高度、两处响应和来路一起考虑。",
    "minMoves": 5,
    "solution": [
      3,
      3,
      3,
      3,
      8
    ],
    "coverageBudget": 5,
    "evidence": {
      "fixedNecessaryAtMinimum": true,
      "unfreezingBreaksExample": true,
      "linkNecessaryAtMinimum": true,
      "examplePath": [
        13,
        14,
        15,
        16,
        12,
        11,
        7,
        3,
        4
      ]
    },
    "maxClicks": 7
  }
];
