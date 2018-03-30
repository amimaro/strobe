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

    this.mouseMoved = this.mouseMoved.bind(this);
  }
  mouseMoved() {
    if (this.state.displayMenu === false)
      this.setState({displayMenu: true});
    clearTimeout(this.timer);
    this.timer = setTimeout(() => {
      this.setState({displayMenu: false});
    }, 1000)
  }
  render() {
    return (<div className="App" onMouseMove={this.mouseMoved}>
      <Menu display={this.state.displayMenu}/>
      <Canvas/>
    </div>);
  }
}

export default App;
