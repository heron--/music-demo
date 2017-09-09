import React from 'react';
import CONST from '../../../constants';
import paletteIcon from '../../../images/palette.svg';
import InstrumentControl  from './InstrumentControl';

const SequenceControls = ({
    setModalMode,
    hideControls,
    currentInstrument,
    selectInstrument
}) => {

    const openRenameModal = () => setModalMode(CONST.MODAL_MODES.RENAME);
    const openColorModal  = () => setModalMode(CONST.MODAL_MODES.COLOR);
    const openDeleteModal = () => setModalMode(CONST.MODAL_MODES.DELETE);

    const hideStyle = {
        visibility: 'hidden'
    };

    return (
        <div className="sequence-controls" style={ hideControls ? hideStyle : null } >
            <InstrumentControl currentInstrument={ currentInstrument } selectInstrument={ selectInstrument }/>
            <RenameControl openRenameModal={ openRenameModal } />
            <ColorControl  openColorModal={ openColorModal } />
            <DeleteControl openDeleteModal={ openDeleteModal } />
        </div>
    );
};

const RenameControl = ({
    openRenameModal
}) => {
    return (
        <div className="rename-control" onClick={() => openRenameModal()}>
            Rename
        </div>
    );
};

const ColorControl = ({
    openColorModal 
}) => {
    return (
        <div className="color-control" onClick={() => openColorModal()}>
            <img src={ paletteIcon } alt="Change track color"/>
        </div>
    );
};

const DeleteControl = ({
    openDeleteModal 
}) => {
    return (
        <div className="delete-control" onClick={() => openDeleteModal()}>
            DELETE TRACK
        </div>
    );
};

export { SequenceControls as default };
