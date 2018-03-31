import React, {Component} from 'react';
import './Canvas.css';

class Canvas extends Component {
  constructor(props) {
    super(props);
    this.state = {
      params: null,
      color: '#cccccc'
    }

    this.setParams = this.setParams.bind(this);
    this.setupParams = this.setupParams.bind(this);
    this.play = this.play.bind(this);
    this.stop = this.stop.bind(this);
    this.setColor = this.setColor.bind(this);
    this.blink = this.blink.bind(this);
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
    this.tick = 0;
    console.log('canvas play');
    clearInterval(this.loop);
    this.loop = setInterval(() => {
      switch (this.state.params.blink) {
        case 1:
          this.blink();
          break;
        default:
      }
    }, 1000);
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
  setColor(color) {
    this.setState({color: color});
  }
  render() {
    return (<div className="Canvas" id="canvas" style={{
        backgroundColor: this.state.color
      }}></div>);
  }
}

export default Canvas;
