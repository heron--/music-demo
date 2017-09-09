import React from 'react';
import { connect } from 'react-redux';
import roundTo from 'round-to';
import { setBPM, setVolume } from '../../actions';
import CONST from '../../constants';
import paletteImage from '../../images/palette.svg';
import Slider from './components/Slider';
import pauseButton from '../../images/pause-button.svg';
import playButton from '../../images/play-button.svg';

const Nav = ({
    controls,
    setBPM,
    setVolume
}) => {
	return (
		<nav className="nav">
			<div className="nav-logo">
				<img src={ paletteImage } alt="Music Demo Palette"/>
				<span>Music Demo</span>
			</div>

            <div className="nav-controls">
                <BPMSlider currentBPM={ controls.BPM } setBPM={ setBPM } />
                <Buttons />
                <VolumeSlider setVolume={ setVolume } currentVolume={ controls.volume }/>
            </div>

            <div className="nav-spacer">{/* Just here for some flexbox fun*/}</div>
		</nav>
	);
};

const BPMSlider = ({
    currentBPM,
    setBPM
}) => {

    const displayBPM = roundTo(currentBPM * (CONST.MAX_BPM - CONST.MIN_BPM) + CONST.MIN_BPM, 0);

    return (
        <div className="bpm-slider">
            <div className="bpm-slider__label">BPM</div>
            <div className="bpm-slider__display">{ displayBPM }</div>
            <Slider handleChange={ setBPM } currentValue={ currentBPM } />
        </div>
    );
}

const VolumeSlider = ({
    currentVolume,
    setVolume
}) => {
    return (
        <div className="volume-slider">
            <div className="volume-slider__label">VOLUME</div>
            <Slider handleChange={ setVolume } currentValue={ currentVolume } />
        </div>
    );
}

const Buttons = () => {
    return (
        <div className="nav-control-buttons">
            <div className="nav-control-buttons__play">
                <img src={ playButton } alt="play"/>
            </div> 

            <div className="nav-control-buttons__pause">
                <img src={ pauseButton } alt="pause"/>
            </div>
        </div> 
    );
};

function mapStateToProps(state) {
    return {
        controls: state.controls
    }
}

function mapDispatchToProps(dispatch) {
    return {
        setBPM: value => dispatch(setBPM(value)),
        setVolume: value => dispatch(setVolume(value))
    }
}

const connectedNav = connect(mapStateToProps, mapDispatchToProps)(Nav);

export { connectedNav as default };
