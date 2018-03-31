import React, {Component} from 'react';
import './MenuFooter.css';

class MenuFooter extends Component {
  render() {
    return (<div className="MenuFooter">
      <hr/>
      <center>
        <p>
          <a href="" target="_blank" rel="noopener noreferrer">
            <b>strobe</b>
          </a>. The source code is licensed under&nbsp;
          <a href="http://opensource.org/licenses/mit-license.php">MIT</a>.
        </p>
        <p>
          &lt;/&gt; with
          <span className="is-red">♥</span>
          by&nbsp;
          <a href="https://github.com/amimaro" target="_blank" rel="noopener noreferrer">amimaro</a>
        </p>
      </center>
    </div>);
  }
}

export default MenuFooter;
