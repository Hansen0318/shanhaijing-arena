// Lossless native-Phaser trim; original logical cells and pivots retained.
export const runtimeFramePacking={
  "chiru.battleMove": [
    {
      "x": 0,
      "y": 0,
      "width": 109,
      "height": 115,
      "trim": [
        160,
        118,
        25,
        0
      ]
    },
    {
      "x": 109,
      "y": 0,
      "width": 130,
      "height": 108,
      "trim": [
        160,
        118,
        15,
        7
      ]
    },
    {
      "x": 239,
      "y": 0,
      "width": 138,
      "height": 103,
      "trim": [
        160,
        118,
        11,
        12
      ]
    },
    {
      "x": 377,
      "y": 0,
      "width": 104,
      "height": 115,
      "trim": [
        160,
        118,
        28,
        0
      ]
    }
  ],
  "jiuweihu.battleMove": [
    {
      "x": 0,
      "y": 0,
      "width": 120,
      "height": 131,
      "trim": [
        160,
        133,
        20,
        2
      ]
    },
    {
      "x": 120,
      "y": 0,
      "width": 114,
      "height": 133,
      "trim": [
        160,
        133,
        23,
        0
      ]
    },
    {
      "x": 234,
      "y": 0,
      "width": 124,
      "height": 133,
      "trim": [
        160,
        133,
        18,
        0
      ]
    },
    {
      "x": 358,
      "y": 0,
      "width": 117,
      "height": 131,
      "trim": [
        160,
        133,
        21,
        2
      ]
    }
  ],
  "xingxing.battleMove": [
    {
      "x": 0,
      "y": 0,
      "width": 550,
      "height": 414,
      "trim": [
        560,
        414,
        5,
        0
      ]
    },
    {
      "x": 550,
      "y": 0,
      "width": 437,
      "height": 403,
      "trim": [
        560,
        414,
        61,
        11
      ]
    },
    {
      "x": 987,
      "y": 0,
      "width": 479,
      "height": 411,
      "trim": [
        560,
        414,
        40,
        3
      ]
    },
    {
      "x": 1466,
      "y": 0,
      "width": 432,
      "height": 413,
      "trim": [
        560,
        414,
        64,
        1
      ]
    }
  ]
};
export function repackAnimationFrames(input){const frames=runtimeFramePacking[input.source];return frames?{...input,frames}:input;}
