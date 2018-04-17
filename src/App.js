import React, {Component} from 'react';
import logo from './logo.svg';
import './App.css';

import Canvas from './components/Canvas/Canvas';
import Menu from './components/Menu/Menu';
import Audio from './components/Audio/Audio';

class App extends Component {
  constructor(props) {
    super(props);

    this.setParams = this.setParams.bind(this);
  }
  componentDidMount() {
    alert('click anywhere to display the menu');
  }
  setParams(params) {
    console.log('app setParams')
    this.refs.canvas.setParams(params);
  }
  render() {
    return (<div className="App">
      <Menu setup={this.setParams}/>
      <Canvas ref="canvas"/>
      <Audio/>
    </div>);
  }
}

export default App;
