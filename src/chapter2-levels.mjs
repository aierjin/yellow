export const CHAPTER2 = [
  {
    "number": 11,
    "name": "回落",
    "rows": 3,
    "cols": 3,
    "maxHeight": 4,
    "type": "normal",
    "start": {
      "edge": "bottom",
      "index": 0,
      "height": 4
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
          "height": 3,
          "direction": -1
        }
      ]
    ],
    "discovery": "沿熟悉路线学习向下连接",
    "minMoves": 3,
    "solution": [
      4,
      7,
      8
    ]
  },
  {
    "number": 12,
    "name": "双响",
    "rows": 3,
    "cols": 3,
    "maxHeight": 4,
    "type": "normal",
    "start": {
      "edge": "bottom",
      "index": 0,
      "height": 4
    },
    "end": {
      "edge": "top",
      "index": 2,
      "height": 0
    },
    "pillars": [
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
          "direction": -1
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
          "direction": -1
        }
      ],
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
          "height": 4,
          "direction": -1
        }
      ]
    ],
    "discovery": "利用不同位置的联动完成下降",
    "minMoves": 3,
    "solution": [
      1,
      2,
      4
    ]
  },
  {
    "number": 13,
    "name": "三岸联动",
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
      "index": 1,
      "height": 4
    },
    "pillars": [
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
          "height": 2,
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
          "height": 2,
          "direction": 1
        },
        {
          "height": 3,
          "direction": -1
        }
      ]
    ],
    "discovery": "观察整张棋盘，利用三列联动连接道路",
    "minMoves": 4,
    "solution": [
      2,
      4,
      6,
      6
    ],
    "maxClicks": 4,
    "coverage": {
      "limit": 4,
      "omittedColumnMinWithinLimit": [
        null,
        null,
        null
      ]
    }
  },
  {
    "number": 14,
    "name": "回潮",
    "rows": 3,
    "cols": 3,
    "maxHeight": 4,
    "type": "challenge",
    "start": {
      "edge": "bottom",
      "index": 1,
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
          "height": 1,
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
          "direction": -1
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
          "height": 3,
          "direction": 1
        }
      ]
    ],
    "discovery": "观察整张棋盘，利用三列联动连接道路",
    "minMoves": 5,
    "solution": [
      1,
      2,
      2,
      3,
      3
    ],
    "maxClicks": 5,
    "coverage": {
      "limit": 5,
      "omittedColumnMinWithinLimit": [
        null,
        null,
        null
      ]
    }
  },
  {
    "number": 15,
    "name": "落潮",
    "rows": 3,
    "cols": 3,
    "maxHeight": 4,
    "type": "challenge",
    "start": {
      "edge": "bottom",
      "index": 0,
      "height": 4
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
          "height": 2,
          "direction": -1
        },
        {
          "height": 3,
          "direction": 1
        }
      ]
    ],
    "discovery": "观察整张棋盘，利用三列联动连接道路",
    "minMoves": 5,
    "solution": [
      2,
      2,
      2,
      3,
      4
    ],
    "maxClicks": 6,
    "coverage": {
      "limit": 5,
      "omittedColumnMinWithinLimit": [
        null,
        null,
        null
      ],
      "note": "每列必需性仅保证在最短解内；限步比最短解多1步。"
    }
  },
  {
    "number": 16,
    "name": "共鸣",
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
          "height": 2,
          "direction": 1
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
          "height": 3,
          "direction": 1
        },
        {
          "height": 2,
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
          "height": 2,
          "direction": 1
        },
        {
          "height": 0,
          "direction": 1
        }
      ]
    ],
    "discovery": "观察整张棋盘，利用三列联动连接道路",
    "minMoves": 6,
    "solution": [
      2,
      2,
      2,
      2,
      3,
      4
    ],
    "maxClicks": 7,
    "coverage": {
      "limit": 6,
      "omittedColumnMinWithinLimit": [
        null,
        null,
        null
      ],
      "note": "每列必需性仅保证在最短解内；限步比最短解多1步。"
    }
  },
  {
    "number": 17,
    "name": "开阔",
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
          "height": 3,
          "direction": 1
        },
        {
          "height": 1,
          "direction": 1
        },
        {
          "height": 2,
          "direction": -1
        }
      ],
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
        },
        {
          "height": 0,
          "direction": 1
        }
      ]
    ],
    "discovery": "在更大棋盘寻找连贯路线",
    "minMoves": 3,
    "solution": [
      7,
      9,
      13
    ]
  },
  {
    "number": 18,
    "name": "分流",
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
          "height": 1,
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
          "height": 3,
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
          "height": 2,
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
          "height": 0,
          "direction": 1
        }
      ]
    ],
    "discovery": "比较大棋盘中的调整顺序",
    "minMoves": 4,
    "solution": [
      3,
      3,
      8,
      10
    ],
    "maxClicks": 10
  },
  {
    "number": 19,
    "name": "远岸",
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
          "direction": 1
        },
        {
          "height": 4,
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
          "height": 3,
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
      ]
    ],
    "discovery": "大棋盘与错位出口组合",
    "minMoves": 4,
    "solution": [
      2,
      5,
      5,
      13
    ],
    "maxClicks": 10
  },
  {
    "number": 20,
    "name": "潮汐归处",
    "rows": 4,
    "cols": 4,
    "maxHeight": 4,
    "type": "challenge",
    "start": {
      "edge": "bottom",
      "index": 1,
      "height": 4
    },
    "end": {
      "edge": "top",
      "index": 3,
      "height": 0
    },
    "pillars": [
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
          "height": 1,
          "direction": 1
        },
        {
          "height": 4,
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
          "height": 2,
          "direction": -1
        },
        {
          "height": 1,
          "direction": -1
        }
      ]
    ],
    "discovery": "综合下降与错位出口，宽松限步",
    "minMoves": 5,
    "solution": [
      4,
      10,
      10,
      10,
      13
    ],
    "maxClicks": 6
  }
];
