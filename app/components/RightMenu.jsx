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
      <a className="item">
        <i className="linkify icon"></i> Compartir
      </a>
      <div className="right menu">
        <a className="item">
          <i className="facebook icon"></i> Facebook
        </a>
        <a className="item">
          <i className="github icon"></i> Github
        </a>
      </div>
    </div>

    );
  }
});

module.exports = RightMenu;