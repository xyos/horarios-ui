var React = require('react');
var ReactPropTypes = React.PropTypes;
var ScheduleThumbnail = require('./ScheduleThumbnail');

var SchedulesPager = React.createClass({

  /**
   * @return {object}
   */
  render: function() {
    schedules = [];
    for(var k in this.props.schedules){
        schedules.push(<ScheduleThumbnail key={k} w={100} h={50} groups={this.props.schedules[k].groups}/>) }
    return (
      <div className="ui blue segment">
        {schedules}
      </div>
    );
  }
});

module.exports = SchedulesPager;
