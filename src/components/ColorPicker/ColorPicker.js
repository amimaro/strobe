import React, {Component} from 'react';
import './ColorPicker.css';

class ColorPicker extends Component {
  constructor(props) {
    super(props);
    this.state = {
      color: '#ffffff'
    }

    this.handleOnChange = this.handleOnChange.bind(this);
  }
  handleOnChange(event) {
    let color = event.target.value;
    clearTimeout(this.timer);
    this.timer = setTimeout(() => {
      console.log(color)
      this.setState({
        color: color
      }, () => {
        if (this.props.hasOwnProperty('selectColor')) {
          this.props.selectColor(color);
        }
      });
    }, 500);
  }
  render() {
    return (<div>
      <label htmlFor="color-picker">Custom color:&nbsp;
      </label>
      <input id="color-picker" type="color" onChange={this.handleOnChange} value={this.state.color}/>
    </div>);
  }
}
export default ColorPicker;
