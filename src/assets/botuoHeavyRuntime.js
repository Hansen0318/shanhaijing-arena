// Source-preserving accepted Heavy review geometry; combat timing is not owned here.
export const botuoHeavyAction={
  "animation": {
    "source": "botuo.heavyPoses",
    "frames": [
      {
        "x": 0,
        "y": 0,
        "width": 175,
        "height": 162
      },
      {
        "x": 175,
        "y": 0,
        "width": 175,
        "height": 162
      },
      {
        "x": 350,
        "y": 0,
        "width": 175,
        "height": 162
      },
      {
        "x": 525,
        "y": 0,
        "width": 175,
        "height": 162
      }
    ],
    "duration": 0.64,
    "loop": false,
    "staticFrame": 2,
    "origin": [
      0.24,
      0.9320987654320988
    ],
    "scale": 2.4305555555555554
  },
  "frameDurationsMs": [
    160,
    160,
    160,
    160
  ],
  "impactFrame": 2,
  "coordinateSize": [
    175,
    162
  ],
  "blade": {
    "assetKey": "botuo.heavySource",
    "offset": [
      30,
      1
    ],
    "size": [
      230,
      144
    ],
    "layer": 4,
    "startMs": 160,
    "holdAfterResolveMs": 280
  },
  "contact": {
    "assetKey": "botuo.heavyContact",
    "offset": [
      -102,
      -152
    ],
    "size": [
      204,
      161
    ],
    "layer": 6,
    "attach": "target",
    "retainOnNextCast": true,
    "durationMs": 280
  }
};
