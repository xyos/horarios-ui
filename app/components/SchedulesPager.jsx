var React = require('react');
var ReactPropTypes = React.PropTypes;
var ScheduleSelect = require('./ScheduleSelect');

var SchedulesPager = React.createClass({

  /**
   * @return {object}
   */
  render: function() {
    schedules = [];
    for(var k in this.props.schedules){
        schedules.push(<ScheduleSelect key={k} w={100} h={50} groups={this.props.schedules[k].groups} selected={this.props.current==k}/>) }
    return (
      <div className="ui blue segment">
        {schedules}
      </div>
    );
  }
});

module.exports = SchedulesPager;
