import React, {Component} from 'react';
import './MenuColor.css';

import ColorPicker from '../../ColorPicker/ColorPicker';

class MenuColor extends Component {
  constructor(props) {
    super(props);

    this.colors = [];

    this.selectColor = this.selectColor.bind(this);
  }
  selectColor(selectedColor) {
    console.log(`colorpicker id: ${selectedColor.id}, value: ${selectedColor.value}`)
    let colors = this.colors;
    let found = colors.find(function(color) {
      return color.id === selectedColor.id;
    });
    if (!found)
      colors.push(selectedColor);
    else
      colors = colors.map((color) => {
        if (color.id === selectedColor.id)
          return selectedColor;
        return color;
      });
    this.props.setColors(colors);
  }
  render() {
    return (<div className="MenuColor">
      <div id="custom-color">
        <label htmlFor="color-picker">Custom Color:&nbsp;</label>
        <ColorPicker id="1" selectColor={this.selectColor} color="#ffffff"/>
      </div>
      <div id="random-color"></div>
    </div>);
  }
}

export default MenuColor;
