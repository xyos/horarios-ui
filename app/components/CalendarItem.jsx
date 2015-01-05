var React = require('react');
var ReactPropTypes = React.PropTypes;
var SubjectActions = require('../actions/SubjectActions');
var SubjectItem = require('./SubjectItem');

var CalendarItem = React.createClass({

  /**
   * @return {object}
   */
  render: function() {
    var divStyle = {
      position: "relative",
      background: "green",
      height: this.props.height,
      top: this.props.top
    };
    return (
      <div
        style={divStyle}
      >hola</div>
    );
  }
});

module.exports = CalendarItem;