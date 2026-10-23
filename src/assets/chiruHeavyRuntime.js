// Accepted source pixels, shared 0.9 runtime pixel density and hover anchor.
export const chiruHeavyAction={
  "kind": "launched-line",
  "animation": {
    "source": "chiru.heavyPoses",
    "frames": [
      {
        "x": 0,
        "y": 0,
        "width": 224,
        "height": 194
      },
      {
        "x": 224,
        "y": 0,
        "width": 224,
        "height": 194
      },
      {
        "x": 448,
        "y": 0,
        "width": 224,
        "height": 194
      },
      {
        "x": 672,
        "y": 0,
        "width": 224,
        "height": 194
      }
    ],
    "duration": 0.95,
    "loop": false,
    "staticFrame": 2,
    "origin": [
      0.5267857142857143,
      0.8917525773195877
    ],
    "scale": 2.8
  },
  "frameDurationsMs": [
    200,
    150,
    400,
    200
  ],
  "impactFrame": 2,
  "coordinateSize": [
    224,
    194
  ],
  "anticipation": {
    "assetKey": "chiru.heavyCharge",
    "offset": [
      31.0,
      64.0
    ],
    "frameOffsets": [
      [
        31.0,
        64.0
      ],
      [
        26.0,
        47.0
      ],
      [
        109.0,
        62.0
      ],
      [
        94.0,
        59.0
      ]
    ],
    "size": [
      98,
      68
    ],
    "layer": 4
  },
  "blade": {
    "assetKey": "chiru.heavyColumn",
    "attach": "line",
    "offset": [
      158,
      96
    ],
    "size": [
      381,
      141
    ],
    "targetOffset": [
      0,
      -98
    ],
    "lineRange": [
      0.03412073490813648,
      0.9658792650918635
    ],
    "layer": 4
  },
  "contact": {
    "assetKey": "chiru.heavyImpact",
    "attach": "target",
    "offset": [
      -107.12,
      -218.7
    ],
    "size": [
      206,
      142
    ],
    "layer": 6
  }
};
