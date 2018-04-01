import React, {Component} from 'react';
import './MenuSpeed.css';

class MenuSpeed extends Component {
  constructor(props) {
    super(props);
    this.state = {
      speed: 1,
      transition: false
    }
  }
  render() {
    return (<div className="MenuSpeed">
      <button className={"btn default " + (
          this.state.speed === 1
          ? 'selected'
          : '')} onClick={() => this.setState({speed: 1}, this.props.selectSpeed(1))}>x1</button>
      <button className={"btn default " + (
          this.state.speed === 2
          ? 'selected'
          : '')} onClick={() => this.setState({speed: 2}, this.props.selectSpeed(2))}>x2</button>
      <button className={"btn default " + (
          this.state.speed === 4
          ? 'selected'
          : '')} onClick={() => this.setState({speed: 4}, this.props.selectSpeed(4))}>x4</button>
      <button className={"btn default " + (
          this.state.speed === 5
          ? 'selected'
          : '')} onClick={() => this.setState({speed: 5}, this.props.selectSpeed(5))}>x5</button>
      <button className={"btn default " + (
          this.state.speed === 10
          ? 'selected'
          : '')} onClick={() => this.setState({speed: 10}, this.props.selectSpeed(10))}>x10</button>
      <button className={"btn default " + (
          this.state.transition === true
          ? 'selected'
          : '')} onClick={() => this.setState({
          transition: !this.state.transition
        }, this.props.selectTransition(!this.state.transition))}>Transition</button>
    </div>);
  }
}

export default MenuSpeed;
