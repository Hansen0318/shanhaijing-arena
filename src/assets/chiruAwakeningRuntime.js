// Approved pixels; shared .9 display density and hover pivot.
export const chiruAwakeningAction={
  "kind": "healing",
  "animation": {
    "source": "chiru.awakeningPoses",
    "frames": [
      {
        "x": 0,
        "y": 0,
        "width": 164,
        "height": 176
      },
      {
        "x": 164,
        "y": 0,
        "width": 164,
        "height": 176
      },
      {
        "x": 328,
        "y": 0,
        "width": 164,
        "height": 176
      },
      {
        "x": 492,
        "y": 0,
        "width": 164,
        "height": 176
      }
    ],
    "duration": 1.2,
    "loop": false,
    "staticFrame": 2,
    "origin": [
      0.5975609756097561,
      0.9261363636363636
    ],
    "scale": 2.2
  },
  "frameDurationsMs": [
    360,
    240,
    300,
    300
  ],
  "impactFrame": 2,
  "coordinateSize": [
    164,
    176
  ],
  "blade": {
    "assetKey": "chiru.awakeningCaster",
    "offset": [
      -72,
      -136.2
    ],
    "size": [
      340,
      340
    ],
    "layer": 4,
    "unfurlMs": 600
  },
  "contact": {
    "assetKey": "chiru.awakeningRecipient",
    "attach": "target",
    "offset": [
      -125,
      -205.0
    ],
    "size": [
      250,
      250
    ],
    "layer": 4,
    "durationMs": 600,
    "fullOpacityMs": 500
  },
  "statusVisuals": {
    "chiru.support": {
      "assetKey": "chiru.awakeningProtection",
      "styleId": "water-membrane",
      "type": "mitigation",
      "size": [
        171,
        171
      ],
      "offset": [
        0,
        -72.9
      ],
      "layer": 4,
      "opacity": 1,
      "reducedOpacity": 1,
      "priority": 0
    }
  }
};
