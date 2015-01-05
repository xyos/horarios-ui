var React = require('react');
var ReactPropTypes = React.PropTypes;
var ScheduleUtils = require('../utils/Schedule');
var ScheduleStore = require('../stores/ScheduleStore');
var Calendar = require('./Calendar');
var CalendarItem = require('./CalendarItem');

var getState = function() {
  return {
    allSchedules  : ScheduleStore.getAll(),
    currentSchedule : ScheduleStore.getCurrent()
  };
};

var Schedules = React.createClass({
  getInitialState : function() {
    return getState();
  },

  componentDidMount : function() {
    ScheduleStore.addChangeListener(this._onChange);
  },

  componentWillUnmount : function() {
    ScheduleStore.removeChangeListener(this._onChange);
  },

  _onChange : function() {
    this.setState(getState());
  },

  /**
   * @return {object}
   */
  render: function() {
    // This section should be hidden by default
    // and shown when there are subjects.

    var number = this.state.allSchedules.length;
    var current = this.state.allSchedules[this.state.currentSchedule];
    var days = {};
    var groups = current === undefined ? [{schedule : [0,0,0,0,0,0,0]}] : current.groups;
    for(var i=0, len = groups.length; i<len; i++){
      var groupSchedule = groups[i].schedule;
      for(var j=0, len1 = groupSchedule.length; j<len1; j++){
        if(days["col"+(j+1)] === undefined){
          days["col"+(j+1)] = [];
        }
        var daySchedule = ScheduleUtils.decimalToSchedString(groupSchedule[j]).substring(7);
        var top = 16;
        var newElement = true;
        var height = 0;
        for(var k=0, len2 = daySchedule.length; k<len2; k++){
          var char = daySchedule[k];
          if(char == "1" && newElement == true){
            newElement = false;
            height = 1;
          } else if(char == "1" && newElement == false){
            height += 1;
          } else if(char === "0" && newElement == false){
            newElement = true;
            days["col"+(j+1)].push(<CalendarItem height={height*32} top={top}/>);
            var height = 0;
          }
          top += 32;
        }
      }
    }
    for(var key in days){
      domObject = document.getElementById(key);
      if(domObject !== null){
        React.renderComponent(Calendar({key:key, day : days[key]}), domObject);
      }
    }
    return (
      <div></div>
    );
  }
});

module.exports = Schedules;