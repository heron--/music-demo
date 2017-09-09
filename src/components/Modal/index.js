import React, { Component } from 'react';
import CONST from '../../constants';

const ModalContainer = ({
    mode,
    open,
    closeModal,
    updateTrackName,
    updateTrackColor,
    deleteTrack,
    currentTrack
}) => {
    if(!open) {
        return null; 
    }

    return (
        <div className="modal-container" onClick={e => { e.stopPropagation(); }}>
            {
                getModalComponent(mode, closeModal)
            }
        </div>
    );

    function getModalComponent(mode, closeModal) {
        switch(mode) {
            case CONST.MODAL_MODES.DELETE:
                return <DeleteModal closeModal={ closeModal } currentTrack={ currentTrack } deleteTrack={ deleteTrack } />
            case CONST.MODAL_MODES.RENAME:
                return <RenameModal closeModal={ closeModal } currentTrack={ currentTrack } updateTrackName={ updateTrackName } />
            case CONST.MODAL_MODES.COLOR:
                return <ColorModal closeModal={ closeModal } currentTrack={ currentTrack } updateTrackColor={ updateTrackColor } />
            default:
                closeModal()
                return null;
        }
    }
};

const DeleteModal = ({
    closeModal,
    deleteTrack,
    currentTrack
}) => {
    return (
        <div className="modal modal--delete">
            <div className="modal__copy">Are you sure you want to delete this track?</div>
            <div className="modal-controls">
                <div className="modal-controls__control modal-controls__control--angry" onClick={ () => { deleteTrack(currentTrack); closeModal(); }}>YES</div>
                <div className="modal-controls__control" onClick={ () => { closeModal() }}>NO</div>
            </div>
        </div>
    );
};

class RenameModal extends Component {

    constructor(props) {
        super(props);

        this.state = {
            inputValue: ''
        };

        this.handleInputChange = this.handleInputChange.bind(this);
    }

    handleInputChange(e) {
        this.setState({
            inputValue: e.currentTarget.value
        });
    }

    render() {
        const {
            closeModal,
            currentTrack,
            updateTrackName
        } = this.props;

        return (
            <div className="modal modal--rename">
                <div className="modal__copy">What would you like to call this track?</div>
                <div className="modal__input">
                    <input type="text" value={ this.state.inputValue } onChange={ this.handleInputChange } />
                </div>
                <div className="modal-controls">
                    <div className="modal-controls__control modal-controls__control--happy" onClick={ () => { updateTrackName(currentTrack, this.state.inputValue); closeModal(); }}>CONFRIM</div>
                    <div className="modal-controls__control" onClick={ () => { closeModal() }}>CANCEL</div>
                </div>
            </div>
        );
    }
}

const ColorModal = ({
    closeModal,
    currentTrack,
    updateTrackColor
}) => {
    return (
        <div className="modal modal--color">
            <div className="modal__copy">Select a color.</div>
            <div className="modal-palette">
                {
                    Object.keys(CONST.COLORS).map(c => {
                        const style = {
                            backgroundColor: CONST.COLORS[c].cssColor,
                            borderColor: CONST.COLORS[c].cssHighlightColor
                        };

                        return (
                            <div
                                className="modal-palette__color"
                                style={ style }
                                key={c}
                                onClick={() => { updateTrackColor(currentTrack, c); closeModal(); }}></div>
                        );
                    })
                }
            </div>
        </div>
    );
};

export { ModalContainer as default };
