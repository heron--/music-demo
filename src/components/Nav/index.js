import React from 'react';
import { connect } from 'react-redux';
import { setBPM, setVolume, setPlaystate } from '../../actions';
import paletteImage from '../../images/palette.svg';
import Slider from './components/Slider';
import pauseButton from '../../images/pause-button.svg';
import playButton from '../../images/play-button.svg';
import pauseButtonActive from '../../images/pause-button--active.svg';
import playButtonActive from '../../images/play-button--active.svg';

const Nav = ({
    controls,
    setBPM,
    setVolume,
    setPlaystate
}) => {
	return (
		<nav className="nav">
			<div className="nav-logo">
				<img src={ paletteImage } alt="Music Demo Palette"/>
				<span>Music Demo</span>
			</div>

            <div className="nav-controls">
                <BPMSlider currentBPM={ controls.BPM } setBPM={ setBPM } />
                <Buttons setPlaystate={ setPlaystate } playstate={ controls.playstate } />
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

    return (
        <div className="bpm-slider">
            <div className="bpm-slider__label">BPM</div>
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

const Buttons = ({
    playstate,
    setPlaystate
}) => {

    return (
        <div className="nav-control-buttons">
            <div className="nav-control-buttons__play" onClick={() => {setPlaystate('PLAYING')}}>
                <img src={ playstate === 'PLAYING' ? playButtonActive : playButton } alt="play"/>
            </div> 

            <div className="nav-control-buttons__pause" onClick={() => { setPlaystate('PAUSED')}}>
                <img src={ playstate === 'PAUSED' ? pauseButtonActive : pauseButton } alt="pause"/>
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
        setVolume: value => dispatch(setVolume(value)),
        setPlaystate: playstate => dispatch(setPlaystate(playstate))
    }
}

const connectedNav = connect(mapStateToProps, mapDispatchToProps)(Nav);

export { connectedNav as default };
