const constants = {
    MAX_BPM: 180,
    MIN_BPM: 40,
    COLORS: {
        BLACK: {
            name: 'BLACK',
            cssColor: '#000000',
            cssHighlightColor: '#FFFFFF'
        },
        WHITE: {
            name: 'WHITE',
            cssColor: '#FFFFFF',
            cssHighlightColor: '#000000'
        },
        RED: {
            name: 'RED',
            cssColor: '#880000',
            cssHighlightColor: '#FFFFFF'
        },
        CYAN: {
            name: 'CYAN',
            cssColor: '#AAFFEE',
            cssHighlightColor: '#000000'
        },
        VIOLET: {
            name: 'VIOLET',
            cssColor: '#CC44CC',
            cssHighlightColor: '#000000'
        },
        GREEN: {
            name: 'GREEN',
            cssColor: '#00CC55',
            cssHighlightColor: '#000000'
        },
        BLUE: {
            name: 'BLUE',
            cssColor: '#0000AA',
            cssHighlightColor: '#FFFFFF'
        },
        YELLOW: {
            name: 'YELLOW',
            cssColor: '#EEEE77',
            cssHighlightColor: '#000000'
        },
        ORANGE: {
            name: 'ORANGE',
            cssColor: '#DD8855',
            cssHighlightColor: '#000000'
        },
        BROWN: {
            name: 'BROWN',
            cssColor: '#664400',
            cssHighlightColor: '#FFFFFF'
        },
        LIGHTRED: {
            name: 'LIGHTRED',
            cssColor: '#FF7777',
            cssHighlightColor: '#000000'
        },
        GREY1: {
            name: 'GREY1',
            cssColor: '#333333',
            cssHighlightColor: '#FFFFFF'
        },
        GREY2: {
            name: 'GREY2',
            cssColor: '#777777',
            cssHighlightColor: '#FFFFFF'
        },
        LIGHTGREEN: {
            name: 'LIGHTGREEN',
            cssColor: '#AAFF66',
            cssHighlightColor: '#000000'
        },
        LIGHTBLUE: {
            name: 'LIGHTBLUE',
            cssColor: '#0088FF',
            cssHighlightColor: '#FFFFFF'
        },
        GREY3: {
            name: 'GREY3',
            cssColor: '#BBBBBB',
            cssHighlightColor: '#000000'
        }
    },
    INSTRUMENTS: {
        SQUARE: {
            name: 'SQUARE',
            waveIcon: require('./images/waves/wave-square.svg'),
            gainModifier: 1
        },
        TRIANGLE: {
            name: 'TRIANGLE',
            waveIcon: require('./images/waves/wave-triangle.svg'),
            gainModifier: 10
        },
        SAWTOOTH: {
            name: 'SAWTOOTH',
            waveIcon: require('./images/waves/wave-sawtooth.svg'),
            gainModifier: 1
        },
        NOISE: {
            name: 'NOISE',
            waveIcon: require('./images/waves/wave-noise.svg'),
            gainModifier: 1
        }
    },
    MODES: {
        SEQUENCE: 'SEQUENCE',
        ARRANGE: 'ARRANGE'
    },
    MODAL_MODES: {
        DELETE: 'DELETE',
        RENAME: 'RENAME',
        COLOR: 'COLOR'
    },
    OCTAVE_COLORS: [
        'CYAN',
        'YELLOW',
        'LIGHTRED',
        'ORANGE',
        'RED',
        'GREEN',
        'LIGHTBLUE',
        'VIOLET',
        'LIGHTGREEN'
    ]
};

export { constants as default};
