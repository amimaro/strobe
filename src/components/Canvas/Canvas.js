import React, {Component} from 'react';
import './Canvas.css';

class Canvas extends Component {
  constructor(props) {
    super(props);
    this.state = {
      params: {
        color: '#cccccc'
      }
    }

    this.setParams = this.setParams.bind(this);
    this.setupParams = this.setupParams.bind(this);
    this.play = this.play.bind(this);
    this.stop = this.stop.bind(this);
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
    clearInterval(this.loop);
    this.loop = setInterval(() => {
      console.log('tick');
    }, 1000);
  }
  render() {
    return (<div className="Canvas" style={{
        backgroundColor: this.state.params.color
      }}></div>);
  }
}

export default Canvas;
