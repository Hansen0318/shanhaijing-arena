// Accepted pixels; common 0.9 density, hover anchor, canonical right.
export const chiruSpecialAction={
  "kind": "healing",
  "animation": {
    "source": "chiru.specialPoses",
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
    "duration": 0.76,
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
    120,
    200,
    240
  ],
  "impactFrame": 2,
  "coordinateSize": [
    224,
    194
  ],
  "blade": {
    "assetKey": "chiru.specialCaster",
    "offset": [
      -7,
      -66.75
    ],
    "size": [
      250,
      274
    ],
    "layer": 4
  },
  "contact": {
    "assetKey": "chiru.specialRecipient",
    "attach": "target",
    "offset": [
      -155,
      -159.07999999999998
    ],
    "size": [
      310,
      194
    ],
    "layer": 4,
    "durationMs": 440,
    "fullOpacityMs": 360
  }
};
