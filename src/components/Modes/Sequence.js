import React from 'react';
import classNames from 'classnames';
import CONST from '../../constants';
import SequenceControls from './components/SequenceControls';
import NoteArea from './components/NoteArea';

const Sequence = ({
    tracks,
    currentTrack,
    notePosition,
    updateCurrentTrack,
    addTrack,
    setModalMode,
    selectInstrument,
    cycleNote
}) => {

    const currentTrackObj = tracks.filter(t => t.id === currentTrack)[0];
    const currentInstrument = typeof currentTrackObj === 'undefined' ? null : currentTrackObj.instrument;

    return (
        <div className="mode mode--sequence">
            <TrackTabList tracks={ tracks } currentTrack={ currentTrack } updateCurrentTrack={ updateCurrentTrack } addTrack={ addTrack } />
            <div className="display-area display-area--sequence">
                <SequenceControls setModalMode={ setModalMode } hideControls={ tracks.length === 0 } currentInstrument={ currentInstrument } selectInstrument={ selectInstrument }/>
                <NoteArea { ...(currentTrackObj === 'undefined') ? {} : currentTrackObj } cycleNote={ cycleNote } notePosition={ notePosition } />
            </div>
        </div>
    );
};

const TrackTabList = ({
    tracks,
    currentTrack,
    updateCurrentTrack,
    addTrack
}) => {

    return (
        <div className="track-tab-list">
            <div className="new-track-tab" onClick={() => { addTrack(); }}>
                <svg width="24px" height="24px" viewBox="0 0 24 24" version="1.1" xmlns="http://www.w3.org/2000/svg">
                    <g stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
                        <g className="new-track-tab__plus-contain" transform="translate(-687.000000, -141.000000)">
                            <g transform="translate(687.000000, 141.000000)">
                                <rect x="10" y="0" width="4" height="24"></rect>
                                <rect x="0" y="10" width="24" height="4"></rect>
                            </g>
                        </g>
                    </g>
                </svg>
            </div>
            <div className="track-tab-contain">
                {
                    tracks.map(t => <TrackTab key={ t.id } { ...t } currentTrack={ currentTrack } updateCurrentTrack={ updateCurrentTrack } />)
                }
            </div>
        </div>
    );
};

const TrackTab = ({
    id,
    name,
    color,
    currentTrack,
    updateCurrentTrack
}) => {
    const trackTabClasses = classNames({
        'track-tab': true,
        'track-tab--active': currentTrack === id
    });

    const trackTabStyles = currentTrack === id ? {
        backgroundColor: CONST.COLORS[color].cssColor || '#FFF',
        color: CONST.COLORS[color].cssHighlightColor || '#000',
        borderColor: CONST.COLORS[color].cssHighlightColor || '#000'
    } : {};

    const trackColorIndicator = {
        height: `${ (3 / 1024) * 100}vh`,
        position: 'absolute',
        top: '1px',
        left: 0,
        right: 0,
        backgroundColor: CONST.COLORS[color].cssColor || '#FFF'
    };

    return (
        <div className={ trackTabClasses } style={ trackTabStyles } onClick={() => { updateCurrentTrack(id);}}>
            <div className="track-tab__color-indicator" style={ trackColorIndicator }></div>
            { name }
        </div>
    );
}

export { Sequence as default };
