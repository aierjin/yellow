export const CHALLENGE_REPLACEMENTS={
  "44": {
    "number": 44,
    "name": "折返归亭",
    "rows": 5,
    "cols": 5,
    "type": "challenge",
    "maxHeight": 6,
    "start": {
      "edge": "bottom",
      "index": 0,
      "height": 0
    },
    "end": {
      "pillar": {
        "row": 1,
        "col": 3
      }
    },
    "pillars": [
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
          "height": 5,
          "direction": 1,
          "fixed": true
        },
        {
          "height": 6,
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
          "height": 1,
          "direction": 1
        },
        {
          "height": 4,
          "direction": -1,
          "fixed": true
        },
        {
          "height": 0,
          "direction": -1
        },
        {
          "height": 2,
          "direction": 1,
          "fixed": true
        }
      ],
      [
        {
          "height": 4,
          "direction": -1
        },
        {
          "height": 5,
          "direction": -1,
          "fixed": true
        },
        {
          "height": 5,
          "direction": -1
        },
        {
          "height": 5,
          "direction": 1
        },
        {
          "height": 5,
          "direction": -1
        }
      ],
      [
        {
          "height": 5,
          "direction": 1
        },
        {
          "height": 6,
          "direction": -1
        },
        {
          "height": 5,
          "direction": 1,
          "fixed": true
        },
        {
          "height": 3,
          "direction": 1
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
          "height": 3,
          "direction": -1,
          "fixed": true
        },
        {
          "height": 4,
          "direction": 1,
          "fixed": true
        },
        {
          "height": 6,
          "direction": 1
        },
        {
          "height": 2,
          "direction": -1,
          "fixed": true
        }
      ]
    ],
    "minMoves": 7,
    "maxClicks": 9,
    "solution": [
      4,
      4,
      11,
      11,
      16,
      16,
      17
    ],
    "tip": "先看固定石台留下的折返通路，再比较亭子四邻。",
    "coverage": {
      "pathLength": 13,
      "rows": 5,
      "cols": 5
    }
  },
  "45": {
    "number": 45,
    "name": "借高入庭 · 精确七步",
    "rows": 5,
    "cols": 5,
    "type": "challenge",
    "maxHeight": 6,
    "start": {
      "edge": "bottom",
      "index": 0,
      "height": 0
    },
    "end": {
      "pillar": {
        "row": 3,
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
          "direction": 1,
          "fixed": true
        },
        {
          "height": 5,
          "direction": 1
        },
        {
          "height": 1,
          "direction": 1,
          "fixed": true
        },
        {
          "height": 0,
          "direction": -1,
          "fixed": true
        }
      ],
      [
        {
          "height": 2,
          "direction": 1
        },
        {
          "height": 1,
          "direction": 1
        },
        {
          "height": 5,
          "direction": 1
        },
        {
          "height": 6,
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
          "height": 0,
          "direction": 1
        },
        {
          "height": 4,
          "direction": -1
        },
        {
          "height": 5,
          "direction": 1,
          "fixed": true
        },
        {
          "height": 5,
          "direction": 1
        },
        {
          "height": 4,
          "direction": -1,
          "fixed": true
        }
      ],
      [
        {
          "height": 0,
          "direction": -1
        },
        {
          "height": 6,
          "direction": 1,
          "fixed": true
        },
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
          "direction": 1
        }
      ],
      [
        {
          "height": 1,
          "direction": 1
        },
        {
          "height": 5,
          "direction": 1
        },
        {
          "height": 1,
          "direction": 1
        },
        {
          "height": 1,
          "direction": 1,
          "fixed": true
        },
        {
          "height": 5,
          "direction": -1
        }
      ]
    ],
    "minMoves": 7,
    "maxClicks": 7,
    "solution": [
      3,
      3,
      3,
      12,
      18,
      23,
      23
    ],
    "tip": "高处不一定是障碍，注意两侧的衔接高度。",
    "coverage": {
      "pathLength": 12,
      "rows": 5,
      "cols": 4
    }
  },
  "46": {
    "number": 46,
    "name": "错层远望",
    "rows": 5,
    "cols": 5,
    "type": "challenge",
    "maxHeight": 6,
    "start": {
      "edge": "bottom",
      "index": 0,
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
          "height": 6,
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
          "direction": 1,
          "fixed": true
        },
        {
          "height": 1,
          "direction": -1
        },
        {
          "height": 5,
          "direction": 1,
          "fixed": true
        },
        {
          "height": 0,
          "direction": -1
        },
        {
          "height": 4,
          "direction": -1,
          "fixed": true
        }
      ],
      [
        {
          "height": 5,
          "direction": -1,
          "fixed": true
        },
        {
          "height": 5,
          "direction": 1,
          "fixed": true
        },
        {
          "height": 1,
          "direction": 1
        },
        {
          "height": 5,
          "direction": -1,
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
          "direction": 1
        },
        {
          "height": 3,
          "direction": -1
        },
        {
          "height": 5,
          "direction": 1
        },
        {
          "height": 4,
          "direction": -1,
          "fixed": true
        }
      ],
      [
        {
          "height": 1,
          "direction": 1
        },
        {
          "height": 5,
          "direction": -1,
          "fixed": true
        },
        {
          "height": 2,
          "direction": -1
        },
        {
          "height": 3,
          "direction": -1,
          "fixed": true
        },
        {
          "height": 1,
          "direction": 1
        }
      ]
    ],
    "minMoves": 9,
    "maxClicks": 11,
    "solution": [
      2,
      2,
      4,
      4,
      4,
      9,
      17,
      25,
      25
    ],
    "tip": "先检查中段断层，再决定从哪侧接近归处。",
    "coverage": {
      "pathLength": 15,
      "rows": 5,
      "cols": 5
    }
  },
  "53": {
    "number": 53,
    "name": "双环回声",
    "rows": 5,
    "cols": 5,
    "type": "challenge",
    "maxHeight": 6,
    "start": {
      "edge": "bottom",
      "index": 0,
      "height": 0
    },
    "end": {
      "pillar": {
        "row": 2,
        "col": 2
      }
    },
    "pillars": [
      [
        {
          "height": 3,
          "direction": -1
        },
        {
          "height": 0,
          "direction": -1,
          "fixed": true
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
          "height": 4,
          "direction": -1,
          "sync": "a"
        }
      ],
      [
        {
          "height": 3,
          "direction": 1
        },
        {
          "height": 5,
          "direction": 1
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
          "height": 4,
          "direction": -1,
          "sync": "a"
        }
      ],
      [
        {
          "height": 0,
          "direction": 1,
          "fixed": true
        },
        {
          "height": 4,
          "direction": 1
        },
        {
          "height": 4,
          "direction": -1
        },
        {
          "height": 6,
          "direction": -1,
          "fixed": true
        },
        {
          "height": 2,
          "direction": -1,
          "fixed": true
        }
      ],
      [
        {
          "height": 4,
          "direction": 1
        },
        {
          "height": 0,
          "direction": -1,
          "fixed": true
        },
        {
          "height": 5,
          "direction": 1,
          "fixed": true
        },
        {
          "height": 2,
          "direction": -1
        },
        {
          "height": 0,
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
          "height": 5,
          "direction": 1
        },
        {
          "height": 2,
          "direction": 1,
          "fixed": true
        },
        {
          "height": 0,
          "direction": -1
        }
      ]
    ],
    "minMoves": 8,
    "maxClicks": 10,
    "solution": [
      3,
      3,
      4,
      19,
      22,
      22,
      23,
      23
    ],
    "tip": "联动柱相隔较远，考虑一次升降能否同时修复两段路。",
    "coverage": {
      "pathLength": 13,
      "rows": 5,
      "cols": 5
    }
  },
  "54": {
    "number": 54,
    "name": "五岸合流",
    "rows": 5,
    "cols": 5,
    "type": "challenge",
    "maxHeight": 6,
    "start": {
      "edge": "bottom",
      "index": 0,
      "height": 0
    },
    "end": {
      "pillar": {
        "row": 2,
        "col": 3
      }
    },
    "pillars": [
      [
        {
          "height": 0,
          "direction": -1,
          "fixed": true
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
          "height": 6,
          "direction": -1
        },
        {
          "height": 5,
          "direction": -1
        }
      ],
      [
        {
          "height": 6,
          "direction": -1
        },
        {
          "height": 3,
          "direction": 1
        },
        {
          "height": 3,
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
          "direction": -1
        }
      ],
      [
        {
          "height": 0,
          "direction": -1
        },
        {
          "height": 5,
          "direction": -1,
          "fixed": true
        },
        {
          "height": 5,
          "direction": -1,
          "fixed": true
        },
        {
          "height": 0,
          "direction": 1
        },
        {
          "height": 6,
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
          "height": 3,
          "direction": -1
        },
        {
          "height": 5,
          "direction": -1,
          "fixed": true
        },
        {
          "height": 6,
          "direction": 1
        },
        {
          "height": 6,
          "direction": 1,
          "fixed": true
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
          "height": 2,
          "direction": -1,
          "sync": "a"
        },
        {
          "height": 0,
          "direction": -1,
          "fixed": true
        },
        {
          "height": 5,
          "direction": -1
        }
      ]
    ],
    "minMoves": 8,
    "maxClicks": 10,
    "solution": [
      10,
      11,
      11,
      11,
      14,
      14,
      21,
      21
    ],
    "tip": "先找绕行的骨架，再利用联动兼顾远处的落差。",
    "coverage": {
      "pathLength": 12,
      "rows": 4,
      "cols": 5
    }
  }
};
