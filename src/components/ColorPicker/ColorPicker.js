import React, {Component} from 'react';
import './ColorPicker.css';

class ColorPicker extends Component {
  constructor(props) {
    super(props);
    this.state = {
      color: this.props.color
        ? this.props.color
        : '#ffffff'
    }

    this.props.selectColor({id: this.props.id, value: this.props.color});
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
          this.props.selectColor({id: this.props.id, value: color});
        }
      });
    }, 500);
  }
  render() {
    return (<div>
      <input className="color-picker" type="color" onChange={this.handleOnChange} value={this.state.color}/>
    </div>);
  }
}
export default ColorPicker;
