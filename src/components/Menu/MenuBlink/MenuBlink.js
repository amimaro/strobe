import React, {Component} from 'react';
import './MenuBlink.css';

import Audio from '../../../services/audio';

class MenuBlink extends Component {
  constructor(props) {
    super(props);
    this.state = {
      blink: 1
    }
    this.audio = new Audio();
    this.selectSoundSensor = this.selectSoundSensor.bind(this);
    this.disableSound = this.disableSound.bind(this);
    this.audio.stop();
  }
  selectSoundSensor() {
    this.audio.start().then((res) => {
      if (res) {
        this.setState({
          blink: 2
        }, this.props.selectBlink(2));
      }
    }).catch((err) => {
      this.setState({
        blink: 1
      }, this.props.selectBlink(1));
    })
  }
  disableSound() {
    this.audio.stop();
  }
  render() {
    return (<div className="MenuBlink">
      <button className={"btn default " + (
          this.state.blink === 1
          ? 'selected'
          : '')} onClick={() => {
          this.setState({
            blink: 1
          }, this.props.selectBlink(1))
          this.disableSound();
        }}>Blink On/Off</button>
      <button className={"btn default " + (
          this.state.blink === 2
          ? 'selected'
          : '')} onClick={() => {
          this.selectSoundSensor();
        }}>Sound Sensor</button>
    </div>);
  }
}

export default MenuBlink;
