export const CHAPTER4 = [
  {
    "number": 31,
    "name": "会移动的归处",
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
      "pillar": {
        "row": 0,
        "col": 2
      }
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
      ]
    ],
    "tip": "归处也在石柱上，调它的高度，就能改变最后一段路。",
    "minMoves": 3,
    "solution": [
      3,
      4,
      5
    ],
    "coverageBudget": 4,
    "coverage": {
      "allSolutionsWalkEveryColumn": true,
      "walkColumns": 3,
      "examplePathLength": 5,
      "goalInitial": 4,
      "goalFinal": 3
    },
    "discovery": "归处所在的石柱，也会随点击与联动升降。"
  },
  {
    "number": 32,
    "name": "借力相迎",
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
      "pillar": {
        "row": 0,
        "col": 2
      }
    },
    "pillars": [
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
          "height": 4,
          "direction": -1
        }
      ],
      [
        {
          "height": 2,
          "direction": 1
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
          "height": 0,
          "direction": 1
        },
        {
          "height": 3,
          "direction": 1
        },
        {
          "height": 3,
          "direction": -1
        }
      ]
    ],
    "tip": "调整邻柱，也可以让道路和归处一起靠近。",
    "minMoves": 3,
    "solution": [
      2,
      2,
      8
    ],
    "coverageBudget": 4,
    "coverage": {
      "allSolutionsWalkEveryColumn": true,
      "walkColumns": 3,
      "examplePathLength": 5,
      "goalInitial": 4,
      "goalFinal": 2
    },
    "teachingProof": {
      "allOptimalMoveGoal": true,
      "allOptimalIndirect": true,
      "optimalCombinations": 2
    }
  },
  {
    "number": 33,
    "name": "顾及归处",
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
      "pillar": {
        "row": 0,
        "col": 2
      }
    },
    "pillars": [
      [
        {
          "height": 4,
          "direction": -1
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
          "height": 0,
          "direction": 1
        },
        {
          "height": 3,
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
          "height": 4,
          "direction": -1
        }
      ]
    ],
    "tip": "修归处旁的路时，也要预判归处会升还是降。",
    "minMoves": 3,
    "solution": [
      2,
      4,
      4
    ],
    "coverageBudget": 4,
    "coverage": {
      "allSolutionsWalkEveryColumn": true,
      "walkColumns": 3,
      "examplePathLength": 5,
      "goalInitial": 1,
      "goalFinal": 2
    },
    "teachingProof": {
      "allOptimalMoveGoal": true,
      "allOptimalIndirect": false,
      "optimalCombinations": 12
    }
  },
  {
    "number": 34,
    "name": "远处的小亭",
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
          "height": 3,
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
        }
      ],
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
          "height": 2,
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
          "height": 0,
          "direction": 1
        }
      ]
    ],
    "tip": "地图变大了，仍先看两端，再找能兼顾沿途的联动。",
    "minMoves": 6,
    "solution": [
      8,
      9,
      9,
      9,
      13,
      13
    ],
    "coverageBudget": 10,
    "coverage": {
      "allSolutionsWalkEveryColumn": true,
      "walkColumns": 4,
      "examplePathLength": 11,
      "goalInitial": 0,
      "goalFinal": 1
    },
    "maxClicks": 10
  },
  {
    "number": 35,
    "name": "两种办法",
    "rows": 5,
    "cols": 5,
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
        "col": 4
      }
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
          "height": 3,
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
          "height": 0,
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
          "height": 1,
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
        }
      ]
    ],
    "tip": "可以调整道路，也可以多调归处；比较整条路的代价。",
    "maxClicks": 7,
    "strategies": {
      "road": [
        1,
        10,
        16,
        16,
        21,
        21
      ],
      "destination": [
        5,
        1,
        16,
        16,
        21,
        21
      ]
    },
    "minMoves": 6,
    "solution": [
      1,
      5,
      16,
      16,
      21,
      21
    ],
    "coverageBudget": 7,
    "coverage": {
      "allSolutionsWalkEveryColumn": true,
      "walkColumns": 5,
      "examplePathLength": 15,
      "goalInitial": 0,
      "goalFinal": 1
    }
  },
  {
    "number": 36,
    "name": "向内一步",
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
        "row": 1,
        "col": 2
      }
    },
    "pillars": [
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
        },
        {
          "height": 4,
          "direction": -1
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
          "height": 4,
          "direction": -1
        },
        {
          "height": 4,
          "direction": -1
        },
        {
          "height": 1,
          "direction": 1
        },
        {
          "height": 0,
          "direction": 1
        }
      ]
    ],
    "tip": "归处在地图里时，可以比较从不同邻柱靠近的路线。",
    "maxClicks": 5,
    "minMoves": 4,
    "solution": [
      8,
      9,
      13,
      13
    ],
    "coverageBudget": 5,
    "coverage": {
      "allSolutionsWalkEveryColumn": true,
      "walkColumns": 4,
      "examplePathLength": 7,
      "goalInitial": 3,
      "goalFinal": 4
    },
    "discovery": "小亭四面开放，可以从相邻石柱抵达。"
  },
  {
    "number": 37,
    "name": "绕行相见",
    "rows": 4,
    "cols": 4,
    "maxHeight": 4,
    "type": "challenge",
    "start": {
      "edge": "bottom",
      "index": 3,
      "height": 0
    },
    "end": {
      "pillar": {
        "row": 1,
        "col": 1
      }
    },
    "pillars": [
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
          "height": 0,
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
          "height": 4,
          "direction": -1
        }
      ]
    ],
    "tip": "近路高差大时，绕一段可能更省操作。",
    "maxClicks": 5,
    "minMoves": 4,
    "solution": [
      5,
      12,
      12,
      12
    ],
    "coverageBudget": 5,
    "coverage": {
      "allSolutionsWalkEveryColumn": true,
      "walkColumns": 4,
      "examplePathLength": 7,
      "goalInitial": 3,
      "goalFinal": 4
    }
  },
  {
    "number": 38,
    "name": "随路而归",
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
        "row": 1,
        "col": 2
      }
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
          "height": 1,
          "direction": 1
        },
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
          "direction": 1
        },
        {
          "height": 2,
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
      ]
    ],
    "tip": "把归处当作道路的一部分，连同来路一起预判。",
    "maxClicks": 6,
    "minMoves": 5,
    "solution": [
      8,
      9,
      9,
      9,
      9
    ],
    "coverageBudget": 6,
    "coverage": {
      "allSolutionsWalkEveryColumn": true,
      "walkColumns": 4,
      "examplePathLength": 7,
      "goalInitial": 1,
      "goalFinal": 0
    }
  }
];
