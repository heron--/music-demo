import React from 'react';
import classNames from 'classnames';
import CONST from '../../../constants';

const NoteArea = ({
    id,
    noteLanes,
    cycleNote,
    trackId
}) => {

    if(typeof noteLanes === 'undefined') {
        return <div className="note-area"></div>;
    }

    return (
        <div className="note-area">
            {
                noteLanes.map(nl => <NoteLane key={`${nl.name}-${nl.octave}`} {...nl} cycleNote={ cycleNote } trackId={ id } />) 
            }
        </div>
    );
};

const NoteLane = ({
    trackId,
    value,
    name,
    octave,
    notes,
    cycleNote
}) => {


    const octaveColor = CONST.COLORS[CONST.OCTAVE_COLORS[octave]];

    const octaveStyle = {
        color: octaveColor.cssColor
    }

    return (
        <div className="note-lane">
            <div className="note-lane__label"><span style={ octaveStyle }>{octave}</span> { name }</div>
            <div className="notes">
                {
                    // Render notes
                    // Seems to perform better when they're not components
                    notes.map((n, i) => {

                        const noteClasses = classNames({
                            'note': true,
                            'note--active': n.active,
                            'note--sustain': n.sustain,
                            'note--beat': i % 4 === 0
                        });

                        return (
                            <div key={ i } className={ noteClasses } onClick={() => { cycleNote(trackId, name, octave, i) }}></div>
                        );

                    })
                }
                {
                    // Render "phony" notes
                    [...new Array(16)].map((pn, i) => {
                        const noteClasses = classNames({
                            'note': true,
                            'note--phony': true,
                            'note--beat': i % 4 === 0
                        });

                        return (
                            <div key={ i } className={ noteClasses }>
                                <div></div>
                            </div>
                        ); 
                    })
                }
            </div>
        </div>
    );
};


export { NoteArea as default };
