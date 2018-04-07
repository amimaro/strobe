import React, {Component} from 'react';
import './Canvas.css';

class Canvas extends Component {
  constructor(props) {
    super(props);
    this.state = {
      params: null,
      color: '#cccccc',
      transitionPeriod: '0'
    }

    this.setParams = this.setParams.bind(this);
    this.setupParams = this.setupParams.bind(this);
    this.play = this.play.bind(this);
    this.stop = this.stop.bind(this);
    this.setColor = this.setColor.bind(this);
    this.blink = this.blink.bind(this);
    this.setupSpeed = this.setupSpeed.bind(this);
    this.getColor = this.getColor.bind(this);
    this.getRandomColor = this.getRandomColor.bind(this);
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
    this.randomColorUpdate = true;
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
    if (this.tick === 0) { // state 1
      this.tick = 1;
    } else { // state 2
      this.tick = 0;
    }
    let color = this.getColor();
    this.setColor(color);
  }
  setupSpeed(speed) {
    let SPEED_MS = Math.floor(1000 / speed);
    let SPEED_S = (1000 / speed / 1000).toFixed(2);
    console.log(
      `speed ${SPEED_MS}ms ${SPEED_S}s ${this.state.params.transition
      ? 'with'
      : 'without'} transition`);
    this.setState({
      transitionPeriod: this.state.params.transition
        ? SPEED_S
        : 0
    })
    return SPEED_MS;
  }
  getColor() {
    let params = this.state.params;
    let altParams = this.state.params.colors[0];
    switch (altParams.value) {
      case 'random':
        if (this.randomColorUpdate) {
          this.randomColorUpdate = false;
          clearTimeout(this.randomUpdate);
          this.randomUpdate = setTimeout(() => {
            this.randomColorUpdate = true;
            this.randomColor1 = this.getRandomColor();
            this.randomColor2 = this.getRandomColor();
          }, altParams.period * 1200);
        }
        if (altParams.mode === 'double')
          return this.tick === 0
            ? this.randomColor2
            : this.randomColor1;
        return this.tick === 0
          ? 'black'
          : this.randomColor1;
        break;
      default:
    }
    return params.colors[this.tick].value;
  }
  setColor(color) {
    this.setState({color: color});
  }
  getRandomColor() {
    return '#' + (
    Math.random() * 0xFFFFFF << 0).toString(16);
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
