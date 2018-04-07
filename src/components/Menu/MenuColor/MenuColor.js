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
    switch (selectedColor.value) {
      case 'random':
        this.props.setColors(selectedColor);
        return;
        break;
      case 'two':
        this.props.setColors(this.colors);
        return;
        break;
      default:
    }
    let found = this.colors.find(function(color) {
      return color.id === selectedColor.id;
    });
    if (!found)
      this.colors.push(selectedColor);
    else
      this.colors = this.colors.map((color) => {
        if (color.id === selectedColor.id)
          return selectedColor;
        return color;
      });
    this.props.setColors(this.colors);
  }
  render() {
    return (<div className="MenuColor">
      <button className={"btn default " + (
          this.state.colorOption === 1
          ? 'selected'
          : '')} onClick={() => this.setState({
          colorOption: 1
        }, this.selectColor({id: '1', value: 'two'}))}>Two Colors</button>
      <button className={"btn default " + (
          this.state.colorOption === 2
          ? 'selected'
          : '')} onClick={() => this.setState({
          colorOption: 2
        }, this.selectColor({id: '1', value: 'random'}))}>Random Colors</button>
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
