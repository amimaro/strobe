import React, {Component} from 'react';
import './Canvas.css';

class Canvas extends Component {
  constructor(props) {
    super(props);
    this.state = {
      params: null,
      color: '#cccccc',
      transitionPeriod: '1.0'
    }

    this.setParams = this.setParams.bind(this);
    this.setupParams = this.setupParams.bind(this);
    this.play = this.play.bind(this);
    this.stop = this.stop.bind(this);
    this.setColor = this.setColor.bind(this);
    this.blink = this.blink.bind(this);
    this.setupSpeed = this.setupSpeed.bind(this);
  }
  setParams(params) {
    this.setState({
      params: params
    }, this.setupParams)
  }
  setupParams() {
    console.log(this.state.params);
    switch (this.state.params.control) {
      case 2:
        this.stop();
        break;
      case 1:
        this.play();
        break;
      default:
    }
  }
  stop() {
    console.log('canvas stop');
    clearInterval(this.loop);
  }
  play() {
    console.log('canvas play');
    this.tick = 0;
    let params = this.state.params;

    clearInterval(this.loop);
    this.loop = setInterval(() => {
      switch (params.blink) {
        case 1:
          this.blink();
          break;
        default:
      }
    }, this.setupSpeed(params.speed));
  }
  blink() {
    let params = this.state.params;
    if (this.tick === 0) { // state 1
      this.tick = 1;
      this.setColor(params.colors[0].value);
    } else { // state 2
      this.tick = 0;
      this.setColor('black');
    }
  }
  setupSpeed(speed) {
    let SPEED_MS = Math.floor(1000/speed);
    let SPEED_S = (1000/speed/1000).toFixed(2);
    console.log(`speed ${SPEED_MS}ms ${SPEED_S}s`);
    this.setState({transitionPeriod: SPEED_S})
    return SPEED_MS;
  }
  setColor(color) {
    this.setState({color: color});
  }
  render() {
    return (<div className="Canvas" id="canvas" style={{
        backgroundColor: this.state.color,
        WebkitTransition: `background-color ${this.state.transitionPeriod}s ease-out`,
        MozTransition: `background-color ${this.state.transitionPeriod}s ease-out`,
        OTransition: `background-color ${this.state.transitionPeriod}s ease-out`,
        transition: `background-color ${this.state.transitionPeriod}s ease-out`
      }}></div>);
  }
}

export default Canvas;
