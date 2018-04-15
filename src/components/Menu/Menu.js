import React, {Component} from 'react';
import './Menu.css';

import MenuHeader from './MenuHeader/MenuHeader';
import MenuFooter from './MenuFooter/MenuFooter';
import MenuBlink from './MenuBlink/MenuBlink';
import MenuSpeed from './MenuSpeed/MenuSpeed';
import MenuColor from './MenuColor/MenuColor';

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
    this.setColors = this.setColors.bind(this);
    this.selectSpeed = this.selectSpeed.bind(this);
    this.selectTransition = this.selectTransition.bind(this);
    this.selectBlink = this.selectBlink.bind(this);
  }
  componentWillUnmount() {
    // document.removeEventListener("mousemove", this.handleMouseMove);
    document.removeEventListener("click", this.handleMouseClick);
  }
  componentDidMount() {
    // document.addEventListener("mousemove", this.handleMouseMove);
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
  setColors(colors) {
    this.setState({colors: colors});
  }
  selectSpeed(speed) {
    this.setState({speed: speed});
  }
  selectTransition(transition) {
    this.setState({transition: transition});
  }
  selectBlink(blink) {
    this.setState({blink: blink});
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
        <MenuBlink selectBlink={this.selectBlink}/>

        <h3>Speed</h3>
        <MenuSpeed selectSpeed={this.selectSpeed} selectTransition={this.selectTransition}/>

        <h3>Color</h3>
        <MenuColor setColors={this.setColors}/>

      </div>
      <MenuFooter/>
    </div>);
  }
}

export default Menu;
