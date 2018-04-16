import React, {Component} from 'react';
import './MenuBlink.css';
import AudioService from '../../../services/AudioService.js';

class MenuBlink extends Component {
  constructor(props) {
    super(props);
    this.state = {
      blink: 1
    }

    this.audioService = new AudioService();

    this.startAudio = this.startAudio.bind(this);
  }
  startAudio() {
    this.audioService.start();
  }
  render() {
    return (<div className="MenuBlink">
      <button className={"btn default " + (
          this.state.blink === 1
          ? 'selected'
          : '')} onClick={() => this.setState({
          blink: 1
        }, this.props.selectBlink(1))}>Blink On/Off</button>
      <button className={"btn default " + (
          this.state.blink === 2
          ? 'selected'
          : '')} onClick={() => {
          this.setState({
            blink: 2
          }, this.props.selectBlink(2));
          this.startAudio();
        }}>Sound Sensor</button>
    </div>);
  }
}

export default MenuBlink;
