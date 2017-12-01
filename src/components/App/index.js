import React, { Component } from 'react';
import { connect } from 'react-redux';
import CONST from '../../constants';
import Nav from '../Nav';
import Modes from '../Modes';
import ModalContainer from '../Modal';

import {
    addTrack,
    deleteTrack,
    updateCurrentTrack,
    updateTrackName,
    updateTrackInstrument,
    updateTrackColor,
    setModalMode,
    closeModal,
    cycleNote,
    triggerPhonyNote
} from '../../actions';

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            mounted: false
        };
    }

    componentWillMount() {
        const {
            addTrack
        } = this.props;

        addTrack();
    }

    componentDidUpdate(nextProps, nextState) {
        const {
            updateCurrentTrack,
            trackControl
        } = this.props;

        if(trackControl.currentTrack === null && trackControl.tracks.length > 0) {
            updateCurrentTrack(trackControl.tracks[0].id);
        }
    }

    getModeComponent(props) {
        const {
            controls,
            trackControl,
            addTrack,
            updateCurrentTrack,
            updateTrackInstrument,
            setModalMode,
            cycleNote,
            triggerPhonyNote
        } = props;

        const selectInstrument = instrument => updateTrackInstrument(trackControl.currentTrack, instrument);

        switch(controls.mode) {
            case CONST.MODES.SEQUENCE:
                return <Modes.Sequence
                    { ...trackControl }
                    addTrack={ addTrack }
                    updateCurrentTrack={ updateCurrentTrack }
                    setModalMode={ setModalMode }
                    selectInstrument={ selectInstrument }
                    cycleNote={ cycleNote }
                    triggerPhonyNote={ triggerPhonyNote }
                />;
            case CONST.MODES.ARRANGE:
                return <Modes.Arrange />
            default:
                return null;
        }
    }

    render() {
        const {
            closeModal,
            modal,
            updateTrackName,
            updateTrackColor,
            deleteTrack,
            trackControl
        } = this.props;

        return (
            <div className="music-demo">
                <Nav />
                { 
                    this.getModeComponent(this.props)
                }
                <ModalContainer
                    {...modal}
                    closeModal={ closeModal }
                    updateTrackName={ updateTrackName }
                    updateTrackColor={ updateTrackColor }
                    deleteTrack={ deleteTrack }
                    currentTrack={ trackControl.currentTrack }
                />
            </div>
        );
    }
}

function mapDispatchToProps(dispatch) {
    return {
        addTrack: () => dispatch(addTrack()),
        deleteTrack: id => dispatch(deleteTrack(id)),
        updateCurrentTrack: id => dispatch(updateCurrentTrack(id)),
        updateTrackName: (id, name) => dispatch(updateTrackName(id, name)),
        updateTrackInstrument: (id, instrument) => dispatch(updateTrackInstrument(id, instrument)),
        updateTrackColor: (id, color) => dispatch(updateTrackColor(id, color)),
        setModalMode: mode => dispatch(setModalMode(mode)),
        closeModal: () => dispatch(closeModal()),
        cycleNote: (id, name, octave, index) => dispatch(cycleNote(id, name, octave, index)),
        triggerPhonyNote: (id, name, octave, index) => dispatch(triggerPhonyNote(id, name, octave, index))
    };
}

function mapStateToProps(state) {
    return {
        controls: state.controls,
        trackControl: state.trackControl,
        modal: state.modal,
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
