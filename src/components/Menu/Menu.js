import React, {Component} from 'react';
import './Menu.css';

import MenuHeader from './MenuHeader/MenuHeader';
import MenuFooter from './MenuFooter/MenuFooter';
import MenuBlink from './MenuBlink/MenuBlink';
import MenuSpeed from './MenuSpeed/MenuSpeed';
import MenuColor from './MenuColor/MenuColor';
import MenuSound from './MenuSound/MenuSound';

class Menu extends Component {
  constructor(props) {
    super(props);
    this.state = {
      displayMenu: true,
      speed: 1,
      transition: true,
      blink: 1,
      control: 2,
      colors: [],
      soundSense: 1,
      audio: null
    };

    this.setup = this.setup.bind(this);
    this.handleMouseMove = this.handleMouseMove.bind(this);
    this.handleMouseClick = this.handleMouseClick.bind(this);
    this.setColors = this.setColors.bind(this);
    this.selectSpeed = this.selectSpeed.bind(this);
    this.selectTransition = this.selectTransition.bind(this);
    this.selectSoundSense = this.selectSoundSense.bind(this);
    this.selectBlink = this.selectBlink.bind(this);
    this.setAudioObj = this.setAudioObj.bind(this);
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
  selectSpeed(speed) {
    this.setState({speed: speed});
  }
  selectTransition(transition) {
    this.setState({transition: transition});
  }
  selectBlink(blink) {
    this.setState({blink: blink});
  }
  selectSoundSense(soundSense) {
    this.setState({soundSense: soundSense});
  }
  setColors(colors) {
    this.setState({colors: colors});
  }
  setAudioObj(audio) {
    this.setState({audio: audio});
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
        <button className={"btn default " + (
            this.state.transition === true
            ? 'selected'
            : '')} onClick={() => this.setState({
            transition: !this.state.transition
          })}>Transition</button>

        <h3>Blinking Style</h3>
        <MenuBlink selectBlink={this.selectBlink} setAudioObj={this.setAudioObj} selectTransition={this.selectTransition}/>

        <div style={{
            display: this.state.blink === 1
              ? ''
              : 'none'
          }}>
          <h3>Speed</h3>
          <MenuSpeed selectSpeed={this.selectSpeed}/>
          <h3>Color</h3>
          <MenuColor setColors={this.setColors}/>
        </div>
        <div style={{
            display: this.state.blink === 2
              ? ''
              : 'none'
          }}>
          <h3>Sound Sense</h3>
          <MenuSound selectSoundSense={this.selectSoundSense}/>
        </div>
      </div>
      <MenuFooter/>
    </div>);
  }
}

export default Menu;
