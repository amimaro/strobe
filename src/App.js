import React, {Component} from 'react';
import logo from './logo.svg';
import './App.css';

import Canvas from './components/Canvas/Canvas';
import Menu from './components/Menu/Menu';

class App extends Component {
  constructor(props) {
    super(props);

    this.handleKeyPress = this.handleKeyPress.bind(this);
    this.setParams = this.setParams.bind(this);
  }
  componentWillUnmount() {
    document.removeEventListener("keydown", this.handleKeyPress, false);
  }
  componentDidMount() {
    document.addEventListener("keydown", this.handleKeyPress, false);
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
  setParams(params) {
    console.log('app setParams')
    this.refs.canvas.setParams(params);
  }
  render() {
    return (<div className="App">
      <Menu setup={this.setParams}/>
      <Canvas ref="canvas"/>
    </div>);
  }
}

export default App;
