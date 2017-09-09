import React, { Component } from 'react';
import CONST from '../../../constants';

class InstrumentControl extends Component {
    constructor(props) {
        super(props)
        this.state = {
            selecting: false
        };

        this.handleDropdownClick = this.handleDropdownClick.bind(this);
    }

    handleDropdownClick(e) {
        e.stopPropagation();
        this.setState({
            selecting: !this.state.selecting
        });
    }

    render() {

        const {
            currentInstrument,
            selectInstrument
        } = this.props;

        return currentInstrument ? (
            <div className="instrument-control">
                <span>Instrument</span>
                <div className="instrument-control-dropdown" onClick={ this.handleDropdownClick }>
                    <div className="instrument-control-dropdown__list">
                        <div className="instrument-control-dropdown__item">
                            <img src={ CONST.INSTRUMENTS[currentInstrument].waveIcon } alt={ CONST.INSTRUMENTS[currentInstrument].name }/>
                        </div>
                    </div>
                    <div className="instrument-control-dropdown__icon">v</div>
                    <InstrumentControlOverlay selecting={ this.state.selecting } selectInstrument={ selectInstrument } />
                </div>
            </div> 
        ) : null;
    }
}

const InstrumentControlOverlay = ({
    selecting,
    selectInstrument
}) => {
    return selecting ? (
        <div className="instrument-control-overlay">
            {
                Object.keys(CONST.INSTRUMENTS).map(i => {
                    return (
                        <div className="instrument-control-overlay__item" key={ i } onClick={() => { selectInstrument(i); }}>
                            <div className="instrument-control-overlay__img-wrap">
                                <img src={ CONST.INSTRUMENTS[i].waveIcon } alt={ CONST.INSTRUMENTS[i].name }/>
                            </div>
                        </div>
                    ); 
                })
            } 
        </div> 
    ) : null;
};

export { InstrumentControl as default };
