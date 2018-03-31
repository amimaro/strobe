import React, {Component} from 'react';
import './Menu.css';

import ColorPicker from '../ColorPicker/ColorPicker';

class Menu extends Component {
  constructor(props) {
    super(props);
    this.state = {
      displayMenu: false,
      speed: 1,
      isToggleOn: false
    };
    this.toggleInit = this.toggleInit.bind(this);
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
    }, 1000)
  }
  toggleInit() {
    this.setState(prevState => ({
      isToggleOn: !prevState.isToggleOn
    }));
  }
  selectColor(color) {
    console.log(color)
  }
  render() {
    return (<div className="Menu" style={{
        visibility: this.state.displayMenu
          ? ''
          : 'hidden'
      }}>
      <div className="MenuHeader">
        <center>
          <h1>Menu</h1>
        </center>
      </div>
      <div className="MenuContent">
        <button className="btn default" onClick={this.toggleInit}>{
            this.state.isToggleOn
              ? 'TurnOff'
              : 'TurnOn'
          }</button>

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
      <div className="MenuFooter">
        <hr/>
        <center>
          <p>
            <a href="" target="_blank" rel="noopener noreferrer">
              <b>strobe</b>
            </a>. The source code is licensed under&nbsp;
            <a href="http://opensource.org/licenses/mit-license.php">MIT</a>.
          </p>
          <p>
            &lt;/&gt; with
            <span className="is-red">♥</span>
            by&nbsp;
            <a href="https://github.com/amimaro" target="_blank" rel="noopener noreferrer">amimaro</a>
          </p>
        </center>
      </div>
    </div>);
  }
}

export default Menu;
