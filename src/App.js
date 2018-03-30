import React, {Component} from 'react';
import logo from './logo.svg';
import './App.css';

import Canvas from './components/Canvas/Canvas';
import Menu from './components/Menu/Menu';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      displayMenu: false
    }

    this.handleMouseMove = this.handleMouseMove.bind(this);
    this.handleKeyPress = this.handleKeyPress.bind(this);
  }
  handleMouseMove() {
    if (this.state.displayMenu === false)
      this.setState({displayMenu: true});
    clearTimeout(this.timer);
    this.timer = setTimeout(() => {
      this.setState({displayMenu: false});
    }, 1000)
  }
  handleKeyPress = (event) => {
    switch (event.keyCode) {
      case 32:
        console.log('space');        
        break;
      default:
        break;
    }
  }
  componentWillUnmount() {
    document.removeEventListener("keydown", this.handleKeyPress, false);
  }
  componentDidMount() {
    document.addEventListener("keydown", this.handleKeyPress, false);
  }
  render() {
    return (<div className="App" onMouseMove={this.handleMouseMove}>
      <Menu display={this.state.displayMenu}/>
      <Canvas/>
    </div>);
  }
}

export default App;
