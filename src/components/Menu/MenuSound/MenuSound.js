import React, {Component} from 'react';
import './MenuSound.css';

class MenuSound extends Component {
  constructor(props) {
    super(props);
    this.state = {
      soundSense: 1
    }
  }
  render() {
    return (<div className="MenuSound">
      <button className={"btn default " + (
          this.state.soundSense === 1
          ? 'selected'
          : '')} onClick={() => {
          this.setState({
            soundSense: 1
          }, this.props.selectSoundSense(1))
        }}>Mood</button>
      <button className={"btn default " + (
          this.state.soundSense === 2
          ? 'selected'
          : '')} onClick={() => {
          this.setState({
            soundSense: 2
          }, this.props.selectSoundSense(2))
        }}>Beats</button>
    </div>);
  }
}

export default MenuSound;
