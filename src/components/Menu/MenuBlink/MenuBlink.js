import React, {Component} from 'react';
import './MenuBlink.css';

class MenuBlink extends Component {
  constructor(props) {
    super(props);
    this.state = {
      blink: 1
    }
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
        }}>Sound Sensor</button>
    </div>);
  }
}

export default MenuBlink;
