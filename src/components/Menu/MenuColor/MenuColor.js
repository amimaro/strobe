import React, {Component} from 'react';
import './MenuColor.css';

import ColorPicker from '../../ColorPicker/ColorPicker';

class MenuColor extends Component {
  constructor(props) {
    super(props);
    this.state = {
      colorOption: 1,
      period: 5,
      double: false
    }

    this.colors = [];

    this.selectColor = this.selectColor.bind(this);
    this.setPeriod = this.setPeriod.bind(this);
    this.setDouble = this.setDouble.bind(this);
    this.addColor = this.addColor.bind(this);
  }
  selectColor(selectedColor) {
    console.log(`colorpicker id: ${selectedColor.id}, value: ${selectedColor.value}`)
    switch (selectedColor.value) {
      case 'random':
        this.props.setColors([selectedColor]);
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
  setPeriod(period) {
    this.setState({
      period: period
    }, this.selectColor({
      id: '1',
      value: 'random',
      period: period,
      mode: this.state.double
        ? 'double'
        : ''
    }));
  }
  setDouble(double) {
    this.setState({
      double: double
    }, this.selectColor({
      id: '1',
      value: 'random',
      period: this.state.period,
      mode: double
        ? 'double'
        : ''
    }));
  }
  addColor() {
    
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
        }, this.setPeriod(5))}>Random Colors</button>
      <button className={"btn default " + (
          this.state.colorOption === 3
          ? 'selected'
          : '')} onClick={() => this.setState({
          colorOption: 3
        }, this.selectColor({id: '1', value: 'two'}))}>Color Palette</button>
      <div className="color-table">
        <div className="color-row">
          <div id="two-color" className="color-cell" style={{
              display: this.state.colorOption === 1
                ? ''
                : 'none'
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
          <div id="random-color" className="color-cell" style={{
              display: this.state.colorOption === 2
                ? ''
                : 'none'
            }}>
            <div className="color-table">
              <p>Changing Period (seconds)</p>
              <div className="color-row">
                <div className="color-cell">
                  <button className={"btn default " + (
                      this.state.period === 1
                      ? 'selected'
                      : '')} onClick={() => this.setPeriod(1)}>1</button>
                  <button className={"btn default " + (
                      this.state.period === 5
                      ? 'selected'
                      : '')} onClick={() => this.setPeriod(5)}>5</button>
                  <button className={"btn default " + (
                      this.state.period === 10
                      ? 'selected'
                      : '')} onClick={() => this.setPeriod(10)}>10</button>
                  <button className={"btn default " + (
                      this.state.period === 30
                      ? 'selected'
                      : '')} onClick={() => this.setPeriod(30)}>30</button>
                  <button className={"btn default " + (
                      this.state.period === 60
                      ? 'selected'
                      : '')} onClick={() => this.setPeriod(60)}>60</button>
                  <button className={"btn default " + (
                      this.state.double === true
                      ? 'selected'
                      : '')} onClick={() => this.setDouble(!this.state.double)}>Double</button>
                </div>
              </div>
            </div>
          </div>
          <div id="palette-color" className="color-cell" style={{
              display: this.state.colorOption === 3
                ? ''
                : 'none'
            }}>
            <div className="color-table">
              <p>Palette</p>
              <div className="color-row">
                <div className="color-cell">
                  <label htmlFor="color-picker">Color 1:&nbsp;</label>
                  <ColorPicker id="1" selectColor={this.selectColor} color="#ffffff"/>
                </div>
                <div className="color-cell">
                  <label htmlFor="color-picker">Color 2:&nbsp;</label>
                  <ColorPicker id="2" selectColor={this.selectColor} color="#000000"/>
                </div>
                <div className="color-cell">
                  <button className={"btn default"} onClick={() => this.addColor()}>+</button>
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
