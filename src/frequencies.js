const frequencies = [
    {
        "name": "C",
        "value": 16.35,
        "octave": 0
    },
    {
        "name": "C#",
        "value": 17.32,
        "octave": 0
    },
    {
        "name": "D",
        "value": 18.35,
        "octave": 0
    },
    {
        "name": "D#",
        "value": 19.45,
        "octave": 0
    },
    {
        "name": "E",
        "value": 20.6,
        "octave": 0
    },
    {
        "name": "F",
        "value": 21.83,
        "octave": 0
    },
    {
        "name": "F#",
        "value": 23.12,
        "octave": 0
    },
    {
        "name": "G",
        "value": 24.5,
        "octave": 0
    },
    {
        "name": "G#",
        "value": 25.96,
        "octave": 0
    },
    {
        "name": "A",
        "value": 27.5,
        "octave": 0
    },
    {
        "name": "A#",
        "value": 29.14,
        "octave": 0
    },
    {
        "name": "B",
        "value": 30.87,
        "octave": 0
    },
    {
        "name": "C",
        "value": 32.7,
        "octave": 1
    },
    {
        "name": "C#",
        "value": 34.65,
        "octave": 1
    },
    {
        "name": "D",
        "value": 36.71,
        "octave": 1
    },
    {
        "name": "D#",
        "value": 38.89,
        "octave": 1
    },
    {
        "name": "E",
        "value": 41.2,
        "octave": 1
    },
    {
        "name": "F",
        "value": 43.65,
        "octave": 1
    },
    {
        "name": "F#",
        "value": 46.25,
        "octave": 1
    },
    {
        "name": "G",
        "value": 49,
        "octave": 1
    },
    {
        "name": "G#",
        "value": 51.91,
        "octave": 1
    },
    {
        "name": "A",
        "value": 55,
        "octave": 1
    },
    {
        "name": "A#",
        "value": 58.27,
        "octave": 1
    },
    {
        "name": "B",
        "value": 61.74,
        "octave": 1
    },
    {
        "name": "C",
        "value": 65.41,
        "octave": 2
    },
    {
        "name": "C#",
        "value": 69.3,
        "octave": 2
    },
    {
        "name": "D",
        "value": 73.42,
        "octave": 2
    },
    {
        "name": "D#",
        "value": 77.78,
        "octave": 2
    },
    {
        "name": "E",
        "value": 82.41,
        "octave": 2
    },
    {
        "name": "F",
        "value": 87.31,
        "octave": 2
    },
    {
        "name": "F#",
        "value": 92.5,
        "octave": 2
    },
    {
        "name": "G",
        "value": 98,
        "octave": 2
    },
    {
        "name": "G#",
        "value": 103.83,
        "octave": 2
    },
    {
        "name": "A",
        "value": 110,
        "octave": 2
    },
    {
        "name": "A#",
        "value": 116.54,
        "octave": 2
    },
    {
        "name": "B",
        "value": 123.47,
        "octave": 2
    },
    {
        "name": "C",
        "value": 130.81,
        "octave": 3
    },
    {
        "name": "C#",
        "value": 138.59,
        "octave": 3
    },
    {
        "name": "D",
        "value": 146.83,
        "octave": 3
    },
    {
        "name": "D#",
        "value": 155.56,
        "octave": 3
    },
    {
        "name": "E",
        "value": 164.81,
        "octave": 3
    },
    {
        "name": "F",
        "value": 174.61,
        "octave": 3
    },
    {
        "name": "F#",
        "value": 185,
        "octave": 3
    },
    {
        "name": "G",
        "value": 196,
        "octave": 3
    },
    {
        "name": "G#",
        "value": 207.65,
        "octave": 3
    },
    {
        "name": "A",
        "value": 220,
        "octave": 3
    },
    {
        "name": "A#",
        "value": 233.08,
        "octave": 3
    },
    {
        "name": "B",
        "value": 246.94,
        "octave": 3
    },
    {
        "name": "C",
        "value": 261.63,
        "octave": 4
    },
    {
        "name": "C#",
        "value": 277.18,
        "octave": 4
    },
    {
        "name": "D",
        "value": 293.66,
        "octave": 4
    },
    {
        "name": "D#",
        "value": 311.13,
        "octave": 4
    },
    {
        "name": "E",
        "value": 329.63,
        "octave": 4
    },
    {
        "name": "F",
        "value": 349.23,
        "octave": 4
    },
    {
        "name": "F#",
        "value": 369.99,
        "octave": 4
    },
    {
        "name": "G",
        "value": 392,
        "octave": 4
    },
    {
        "name": "G#",
        "value": 415.3,
        "octave": 4
    },
    {
        "name": "A",
        "value": 440,
        "octave": 4
    },
    {
        "name": "A#",
        "value": 466.16,
        "octave": 4
    },
    {
        "name": "B",
        "value": 493.88,
        "octave": 4
    },
    {
        "name": "C",
        "value": 523.25,
        "octave": 5
    },
    {
        "name": "C#",
        "value": 554.37,
        "octave": 5
    },
    {
        "name": "D",
        "value": 587.33,
        "octave": 5
    },
    {
        "name": "D#",
        "value": 622.25,
        "octave": 5
    },
    {
        "name": "E",
        "value": 659.25,
        "octave": 5
    },
    {
        "name": "F",
        "value": 698.46,
        "octave": 5
    },
    {
        "name": "F#",
        "value": 739.99,
        "octave": 5
    },
    {
        "name": "G",
        "value": 783.99,
        "octave": 5
    },
    {
        "name": "G#",
        "value": 830.61,
        "octave": 5
    },
    {
        "name": "A",
        "value": 880,
        "octave": 5
    },
    {
        "name": "A#",
        "value": 932.33,
        "octave": 5
    },
    {
        "name": "B",
        "value": 987.77,
        "octave": 5
    },
    {
        "name": "C",
        "value": 1046.5,
        "octave": 6
    },
    {
        "name": "C#",
        "value": 1108.73,
        "octave": 6
    },
    {
        "name": "D",
        "value": 1174.66,
        "octave": 6
    },
    {
        "name": "D#",
        "value": 1244.51,
        "octave": 6
    },
    {
        "name": "E",
        "value": 1318.51,
        "octave": 6
    },
    {
        "name": "F",
        "value": 1396.91,
        "octave": 6
    },
    {
        "name": "F#",
        "value": 1479.98,
        "octave": 6
    },
    {
        "name": "G",
        "value": 1567.98,
        "octave": 6
    },
    {
        "name": "G#",
        "value": 1661.22,
        "octave": 6
    },
    {
        "name": "A",
        "value": 1760,
        "octave": 6
    },
    {
        "name": "A#",
        "value": 1864.66,
        "octave": 6
    },
    {
        "name": "B",
        "value": 1975.53,
        "octave": 6
    },
    // {
    //     "name": "C",
    //     "value": 2093,
    //     "octave": 7
    // },
    // {
    //     "name": "C#",
    //     "value": 2217.46,
    //     "octave": 7
    // },
    // {
    //     "name": "D",
    //     "value": 2349.32,
    //     "octave": 7
    // },
    // {
    //     "name": "D#",
    //     "value": 2489.02,
    //     "octave": 7
    // },
    // {
    //     "name": "E",
    //     "value": 2637.02,
    //     "octave": 7
    // },
    // {
    //     "name": "F",
    //     "value": 2793.83,
    //     "octave": 7
    // },
    // {
    //     "name": "F#",
    //     "value": 2959.96,
    //     "octave": 7
    // },
    // {
    //     "name": "G",
    //     "value": 3135.96,
    //     "octave": 7
    // },
    // {
    //     "name": "G#",
    //     "value": 3322.44,
    //     "octave": 7
    // },
    // {
    //     "name": "A",
    //     "value": 3520,
    //     "octave": 7
    // },
    // {
    //     "name": "A#",
    //     "value": 3729.31,
    //     "octave": 7
    // },
    // {
    //     "name": "B",
    //     "value": 3951.07,
    //     "octave": 7
    // },
    // {
    //     "name": "C",
    //     "value": 4186.01,
    //     "octave": 8
    // },
    // {
    //     "name": "C#",
    //     "value": 4434.92,
    //     "octave": 8
    // },
    // {
    //     "name": "D",
    //     "value": 4698.63,
    //     "octave": 8
    // },
    // {
    //     "name": "D#",
    //     "value": 4978.03,
    //     "octave": 8
    // },
    // {
    //     "name": "E",
    //     "value": 5274.04,
    //     "octave": 8
    // },
    // {
    //     "name": "F",
    //     "value": 5587.65,
    //     "octave": 8
    // },
    // {
    //     "name": "F#",
    //     "value": 5919.91,
    //     "octave": 8
    // },
    // {
    //     "name": "G",
    //     "value": 6271.93,
    //     "octave": 8
    // },
    // {
    //     "name": "G#",
    //     "value": 6644.88,
    //     "octave": 8
    // },
    // {
    //     "name": "A",
    //     "value": 7040,
    //     "octave": 8
    // },
    // {
    //     "name": "A#",
    //     "value": 7458.62,
    //     "octave": 8
    // },
    // {
    //     "name": "B",
    //     "value": 7902.13,
    //     "octave": 8
    // }
];

export { frequencies as default };
