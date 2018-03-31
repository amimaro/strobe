import React, {Component} from 'react';
import './Menu.css';

import MenuHeader from './MenuHeader/MenuHeader';
import MenuFooter from './MenuFooter/MenuFooter';
import ColorPicker from '../ColorPicker/ColorPicker';

class Menu extends Component {
  constructor(props) {
    super(props);
    this.state = {
      displayMenu: false,
      isToggleOn: false,
      speed: 1,
      blink: 1,
      control: 2,
      color: '#ffffff'
    };

    this.setup = this.setup.bind(this);
    this.handleMouseMove = this.handleMouseMove.bind(this);
    this.selectColor = this.selectColor.bind(this);
  }
  componentWillUnmount() {
    document.removeEventListener("mousemove", this.handleMouseMove);
  }
  componentDidMount() {
    document.addEventListener("mousemove", this.handleMouseMove);
  }
  handleMouseMove() {
    if (this.state.displayMenu === false)
      this.setState({displayMenu: true});
    clearTimeout(this.timer);
    this.timer = setTimeout(() => {
      this.setState({displayMenu: false});
    }, 1000);
  }
  setup() {
    if(this.props.hasOwnProperty('setup')){
      let command = this.state.control === 1 ? 'play' : 'stop';
      console.log(command);
      this.props.setup(this.state);
    }
  }
  selectColor(color) {
    console.log('color: ' + color);
    this.setState({color: color});
  }
  render() {
    return (<div className="Menu" style={{
        visibility: this.state.displayMenu
          ? ''
          : 'hidden'
      }}>
      <MenuHeader/>
      <div className="MenuContent">
        <button className={"btn default " + (
            this.state.control === 1
            ? 'selected'
            : '')} onClick={() => this.setState({
            control: 1
          }, this.setup)}>
          <i className="fas fa-play">&nbsp;</i>Play</button>
        <button className={"btn default " + (
            this.state.control === 2
            ? 'selected'
            : '')} onClick={() => this.setState({
            control: 2
          }, this.setup)}>
          <i className="fas fa-stop">&nbsp;</i>Stop</button>

        <h3>Blinking Style</h3>
        <button className={"btn default " + (
            this.state.blink === 1
            ? 'selected'
            : '')} onClick={() => this.setState({blink: 1})}>Blink On/Off</button>

        <h3>Speed</h3>
        <button className={"btn default " + (
            this.state.speed === 1
            ? 'selected'
            : '')} onClick={() => this.setState({speed: 1})}>x1</button>
        <button className={"btn default " + (
            this.state.speed === 2
            ? 'selected'
            : '')} onClick={() => this.setState({speed: 2})}>x2</button>
        <button className={"btn default " + (
            this.state.speed === 3
            ? 'selected'
            : '')} onClick={() => this.setState({speed: 3})}>x3</button>
        <button className={"btn default " + (
            this.state.speed === 4
            ? 'selected'
            : '')} onClick={() => this.setState({speed: 4})}>x4</button>

        <h3>Color</h3>
        <div>
          <div id="custom-color">
            <ColorPicker selectColor={this.selectColor}/>
          </div>
          <div id="random-color"></div>
        </div>

      </div>
      <MenuFooter/>
    </div>);
  }
}

export default Menu;
