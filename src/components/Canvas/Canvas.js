import React, { Component } from 'react';
import './Canvas.css';

class Canvas extends Component {
  constructor(props) {
    super(props);
    this.state = {
      color: 'asd'
    }

    this.setParams = this.setParams.bind(this);
  }
  componentDidMount() {
  }
  setParams(params) {
    console.log(params);
  }
  render() {
    return (
      <div className="Canvas" id="canvas">
      </div>
    );
  }
}

export default Canvas;
