var React = require('react');
var ReactPropTypes = React.PropTypes;


var Calendar = React.createClass({


  /**
   * @return {object}
   */
  render: function() {
    var calendar = JSON.stringify(this.props.schedule);
    return (
      <div> {this.props.day}</div>
    );
  }
});

module.exports = Calendar;