var React = require('react');


var Calendar = React.createClass({


  /**
   * @return {object}
   */
  render: function() {
    return (
      <div> {this.props.day}</div>
    );
  }
});

module.exports = Calendar;