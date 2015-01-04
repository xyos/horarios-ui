var React = require('react');
var ReactPropTypes = React.PropTypes;

var RightMenu = React.createClass({

  propTypes: {
    message: ReactPropTypes.object.isRequired
  },

  /**
   * @return {object}
   */
  render: function() {
    // This section should be hidden by default
    // and shown when there are subjects.
    return (
    <div className="ui blue inverted menu">
      <a classNameName="active item">
        <i className="home icon"></i> {this.props.message}
      </a>
      <a className="item">
        <i className="mail icon"></i> Messages
      </a>
      <a className="item">
        <i className="user icon"></i> Friends
      </a>
    </div>
    );
  }
});

module.exports = RightMenu;