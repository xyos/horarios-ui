var React = require('react');
var ReactPropTypes = React.PropTypes;
var ProfessionChooser = require('./ProfessionChooser.jsx');

var RightMenu = React.createClass({

  /**
   * @return {object}
   */
  render: function() {
    // This section should be hidden by default
    // and shown when there are subjects.
    return (
    <div className="ui blue inverted menu">
      <div className="left menu">
        <div className="item">
          <ProfessionChooser/>
        </div>
      </div>
      <a classNameName="active item">
        <i className="home icon"></i> {this.props.message}
      </a>
      <a className="item">
        <i className="mail icon"></i> Messages
      </a>
      <a className="item">
        <i className="user icon"></i> Friends
      </a>
      <div className="right menu">
        <div className="item">
          <ProfessionChooser/>
        </div>
      </div>
    </div>

    );
  }
});

module.exports = RightMenu;