import React, {Component} from 'react';
import './Menu.css';

class Menu extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isToggleOn: false
    };
    this.toggleInit = this.toggleInit.bind(this);
  }
  toggleInit() {
    this.setState(prevState => ({
      isToggleOn: !prevState.isToggleOn
    }));
  }
  render() {
    return (<div className="Menu">
      <button className="btn default" onClick={this.toggleInit}>{
          this.state.isToggleOn
            ? 'TurnOff'
            : 'TurnOn'
        }</button>
    </div>);
  }
}

export default Menu;
