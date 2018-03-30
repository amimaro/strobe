import React, {Component} from 'react';
import './Menu.css';

class Menu extends Component {
  constructor(props) {
    super(props);
    this.state = {
      displayMenu: false
    };
    this.toggleInit = this.toggleInit.bind(this);
    this.handleMouseMove = this.handleMouseMove.bind(this);
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
      </div>
      <hr/>
      <div className="MenuFooter">
        <center>
          <p>
            <a href="" target="_blank" rel="noopener noreferrer">
              <b>strobe</b>
            </a>. The source code is licensed under&nbsp;
            <a href="http://opensource.org/licenses/mit-license.php">MIT</a>.
          </p>
          <p>
            &lt;/&gt; with ♥ by&nbsp;
            <a href="https://github.com/amimaro" target="_blank" rel="noopener noreferrer">amimaro</a>
          </p>
        </center>
      </div>
    </div>);
  }
}

export default Menu;
