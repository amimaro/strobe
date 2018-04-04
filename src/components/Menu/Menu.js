import React, {Component} from 'react';
import './Menu.css';

import MenuHeader from './MenuHeader/MenuHeader';
import MenuFooter from './MenuFooter/MenuFooter';
import MenuSpeed from './MenuSpeed/MenuSpeed';
import ColorPicker from '../ColorPicker/ColorPicker';

class Menu extends Component {
  constructor(props) {
    super(props);
    this.state = {
      displayMenu: false,
      speed: 1,
      transition: false,
      blink: 1,
      control: 2,
      colors: []
    };

    this.setup = this.setup.bind(this);
    this.handleMouseMove = this.handleMouseMove.bind(this);
    this.handleMouseClick = this.handleMouseClick.bind(this);
    this.selectColor = this.selectColor.bind(this);
    this.selectSpeed = this.selectSpeed.bind(this);
    this.selectTransition = this.selectTransition.bind(this);
  }
  componentWillUnmount() {
    document.removeEventListener("mousemove", this.handleMouseMove);
    document.removeEventListener("click", this.handleMouseClick);
  }
  componentDidMount() {
    document.addEventListener("mousemove", this.handleMouseMove);
    document.addEventListener("click", this.handleMouseClick);
  }
  handleMouseMove() {
    if (this.state.displayMenu === false)
      this.setState({displayMenu: true});
    clearTimeout(this.timer);
    this.timer = setTimeout(() => {
      this.setState({displayMenu: false});
    }, 1000);
  }
  handleMouseClick(event) {
    if (event.target.tagName === 'DIV') 
      this.setState({
        displayMenu: !this.state.displayMenu
      });
    }
  setup() {
    if (this.props.hasOwnProperty('setup')) {
      let command = 'menu ' + (
        this.state.control === 1
        ? 'play'
        : 'stop');
      console.log(command);
      this.props.setup(this.state);
    }
  }
  selectColor(selectedColor) {
    console.log(`colorpicker id: ${selectedColor.id}, value: ${selectedColor.value}`)
    let colors = this.state.colors;
    let found = colors.find(function(color) {
      return color.id === selectedColor.id;
    });
    if (!found)
      colors.push(selectedColor);
    else
      colors = colors.map((color) => {
        if (color.id === selectedColor.id)
          return selectedColor;
        return color;
      });
    this.setState({colors: colors});
  }
  selectSpeed(speed) {
    this.setState({speed: speed});
  }
  selectTransition(transition) {
    this.setState({transition: transition});
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
        <MenuSpeed selectSpeed={this.selectSpeed} selectTransition={this.selectTransition}/>

        <h3>Color</h3>
        <div>
          <div id="custom-color">
            <label htmlFor="color-picker">Custom Color:&nbsp;</label>
            <ColorPicker id="1" selectColor={this.selectColor} color="#ffffff"/>
          </div>
          <div id="random-color"></div>
        </div>

      </div>
      <MenuFooter/>
    </div>);
  }
}

export default Menu;
