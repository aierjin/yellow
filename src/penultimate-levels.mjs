export const PENULTIMATE_LEVELS=[
  {
    "number": 58,
    "name": "星野回环",
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
          "direction": 1,
          "fixed": true
        },
        {
          "height": 6,
          "direction": -1,
          "fixed": true
        },
        {
          "height": 2,
          "direction": 1
        },
        {
          "height": 6,
          "direction": -1
        },
        {
          "height": 6,
          "direction": 1
        }
      ],
      [
        {
          "height": 2,
          "direction": -1,
          "fixed": true
        },
        {
          "height": 6,
          "direction": 1,
          "fixed": true
        },
        {
          "height": 0,
          "direction": -1
        },
        {
          "height": 0,
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
          "height": 5,
          "direction": -1,
          "fixed": true
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
          "direction": -1
        },
        {
          "height": 6,
          "direction": -1,
          "fixed": true
        },
        {
          "height": 2,
          "direction": 1,
          "fixed": true
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
          "direction": -1
        },
        {
          "height": 3,
          "direction": -1
        },
        {
          "height": 2,
          "direction": -1,
          "fixed": true
        },
        {
          "height": 6,
          "direction": -1,
          "fixed": true
        },
        {
          "height": 4,
          "direction": 1
        }
      ]
    ],
    "minMoves": 10,
    "maxClicks": 12,
    "solution": [
      3,
      4,
      8,
      10,
      11,
      11,
      17,
      17,
      21,
      21
    ],
    "tip": "固定石台给出参照；先接通绕行骨架，再调整中央归处的高度。",
    "coverage": {
      "pathLength": 13,
      "rows": 5,
      "cols": 4
    }
  },
  {
    "number": 59,
    "name": "归前合鸣",
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
        "col": 2
      }
    },
    "pillars": [
      [
        {
          "height": 4,
          "direction": 1
        },
        {
          "height": 0,
          "direction": 1,
          "sync": "final-pair"
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
          "height": 6,
          "direction": -1,
          "fixed": true
        }
      ],
      [
        {
          "height": 0,
          "direction": 1,
          "fixed": true
        },
        {
          "height": 6,
          "direction": -1,
          "fixed": true
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
          "height": 3,
          "direction": -1
        }
      ],
      [
        {
          "height": 0,
          "direction": -1
        },
        {
          "height": 4,
          "direction": -1
        },
        {
          "height": 0,
          "direction": -1,
          "fixed": true
        },
        {
          "height": 4,
          "direction": 1
        },
        {
          "height": 0,
          "direction": -1,
          "sync": "final-pair"
        }
      ],
      [
        {
          "height": 2,
          "direction": 1,
          "fixed": true
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
          "height": 1,
          "direction": -1
        },
        {
          "height": 3,
          "direction": -1,
          "fixed": true
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
          "height": 5,
          "direction": 1
        },
        {
          "height": 0,
          "direction": -1
        },
        {
          "height": 5,
          "direction": 1,
          "fixed": true
        }
      ]
    ],
    "minMoves": 9,
    "maxClicks": 11,
    "solution": [
      3,
      3,
      3,
      14,
      18,
      18,
      21,
      22,
      23
    ],
    "tip": "观察联动柱远端的高度变化，别让局部修路破坏另一侧的衔接。",
    "coverage": {
      "pathLength": 12,
      "rows": 5,
      "cols": 5
    }
  }
];