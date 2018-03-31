import React, { Component } from 'react';
import './Canvas.css';

class Canvas extends Component {
  constructor(props) {
    super(props);
  }
  componentDidMount() {
    console.log(this.props.params);
  }
  render() {
    console.log(this.props.params)
    return (
      <div className="Canvas" id="canvas">
      </div>
    );
  }
}

export default Canvas;
