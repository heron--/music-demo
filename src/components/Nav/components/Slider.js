import React, { Component } from 'react';
import PropTypes from 'prop-types';
import roundTo from 'round-to';

export default class Slider extends Component {
    constructor(props) {
        super(props);

        this.state = {
            position: null,
            dragging: false
        };

        this.handleMouseDown = this.handleMouseDown.bind(this);
        this.handleMouseUp = this.handleMouseUp.bind(this);
        this.handleMouseMove = this.handleMouseMove.bind(this);
        this.handleMouseLeave = this.handleMouseLeave.bind(this);
        this.handleMouseEnter = this.handleMouseEnter.bind(this);
        this.getDotPosition = this.getDotPosition.bind(this);
    }

    componentDidMount() {
        this.setState({
            position: this.slider.getBoundingClientRect().width / 2
        });
        this.dotWidth = this.dot.getBoundingClientRect().width;
    }

    handleMouseDown(e) {
        this.setState({
            dragging: true
        });
    }

    handleMouseUp(e) {
        this.setState({
            dragging: false
        });
    }

    handleMouseMove(e) {
        if(!this.state.dragging) {
            return; 
        }

        const {
            handleChange
        } = this.props;

        const position =  e.clientX - e.currentTarget.getBoundingClientRect().left;
        const value = roundTo(position / this.slider.getBoundingClientRect().width, 3);

        if(value <= 0) {
            handleChange(0);
        } else if( value >= 0.97) {
            handleChange(1);
        } else {
            handleChange(value);
        }
    }

    handleMouseLeave() {
        this.timeoutId = window.setTimeout(() => {
            this.setState({ dragging: false });
        }, 3000);
    }

    handleMouseEnter() {
        window.clearTimeout(this.timeoutId);
    }

    getDotPosition() {

        const {
            currentValue
        } = this.props;

        const sliderWidth = this.slider.getBoundingClientRect().width;
        const position = currentValue * sliderWidth;

        if(position >= sliderWidth) {

            return sliderWidth - (this.dotWidth / 2);

        } else if(position <= 0) {

            return 0 - (this.dotWidth / 2);

        } else {

            return position - (this.dotWidth / 2);

        }
    }

    render() {

        const dotStyle = this.state.position ? {
            transform: `translate3d(${this.getDotPosition()}px, -50%, 0)`
        } : {'display': 'none'};

        return (
            <div
                className="slider"
                ref={slider => {this.slider = slider;}}
                onMouseDown={ this.handleMouseDown}
                onMouseUp={ this.handleMouseUp }
                onMouseMove={ this.handleMouseMove }
                onMouseLeave={ this.handleMouseLeave }
                onMouseEnter={ this.handleMouseEnter }
            >
                <div className="slider__track"></div>
                <div className="slider__dot" style={ dotStyle } ref={dot => {this.dot = dot;}}></div>
            </div>
        );
    }    
}

Slider.propTypes = {
    handleChange: PropTypes.func.isRequired
};
