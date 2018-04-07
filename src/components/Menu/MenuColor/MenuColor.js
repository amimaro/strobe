import React, {Component} from 'react';
import './MenuColor.css';

import ColorPicker from '../../ColorPicker/ColorPicker';

class MenuColor extends Component {
  constructor(props) {
    super(props);
    this.state = {
      colorOption: 1
    }

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
      <button className={"btn default " + (
          this.state.colorOption === 1
          ? 'selected'
          : '')} onClick={() => this.setState({
          colorOption: 1
        })}>Two Colors</button>
      <button className={"btn default " + (
          this.state.colorOption === 2
          ? 'selected'
          : '')} onClick={() => this.setState({
          colorOption: 2
        })}>Random Colors</button>
      <div className="color-table">
        <div className="color-row">
          <div id="two-color" className="color-cell" style={{
              visibility: this.state.colorOption === 1
                ? ''
                : 'hidden'
            }}>
            <div className="color-table">
              <p>Two Colors</p>
              <div className="color-row">
                <div className="color-cell">
                  <label htmlFor="color-picker">Color 1:&nbsp;</label>
                  <ColorPicker id="1" selectColor={this.selectColor} color="#ffffff"/>
                </div>
                <div className="color-cell">
                  <label htmlFor="color-picker">Color 2:&nbsp;</label>
                  <ColorPicker id="2" selectColor={this.selectColor} color="#000000"/>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>);
  }
}

export default MenuColor;
