// Approved source-preserving Basic review geometry. Combat owns endpoints/timing.
export const chiruBasicAction={
  "animation": {
    "source": "chiru.basicPoses",
    "frames": [
      {
        "x": 0,
        "y": 0,
        "width": 168,
        "height": 168
      },
      {
        "x": 168,
        "y": 0,
        "width": 168,
        "height": 168
      },
      {
        "x": 336,
        "y": 0,
        "width": 168,
        "height": 168
      },
      {
        "x": 504,
        "y": 0,
        "width": 168,
        "height": 168
      }
    ],
    "duration": 0.4,
    "loop": false,
    "staticFrame": 2,
    "origin": [
      0.5595238095238095,
      0.9702380952380952
    ],
    "scale": 2.1
  },
  "frameDurationsMs": [
    120,
    60,
    100,
    120
  ],
  "impactFrame": 2,
  "coordinateSize": [
    168,
    168
  ],
  "anticipation": {
    "assetKey": "chiru.basicCharge",
    "offset": [
      85.5,
      41.0
    ],
    "frameOffsets": [
      [
        88.5,
        41.0
      ],
      [
        82.5,
        40.0
      ],
      [
        107.5,
        44.0
      ],
      [
        87.5,
        41.0
      ]
    ],
    "size": [
      69,
      48
    ],
    "layer": 4
  },
  "blade": {
    "assetKey": "chiru.basicArrow",
    "attach": "line",
    "offset": [
      142,
      68
    ],
    "size": [
      328,
      122
    ],
    "targetOffset": [
      0,
      -95
    ],
    "lineRange": [
      0.06402439024390244,
      0.9451219512195121
    ],
    "layer": 4
  },
  "contact": {
    "assetKey": "chiru.basicImpact",
    "attach": "target",
    "offset": [
      -49.5,
      -148.0
    ],
    "size": [
      119,
      82
    ],
    "layer": 6
  }
};
