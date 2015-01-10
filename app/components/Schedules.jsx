var React = require('react');
var ReactPropTypes = React.PropTypes;
var ScheduleUtils = require('../utils/Schedule');
var ScheduleStore = require('../stores/ScheduleStore');
var SubjectStore = require('../stores/SubjectStore');
var Calendar = require('./Calendar');
var SchedulesPager = require('./SchedulesPager');

var CalendarItem = require('./CalendarItem');

var getState = function() {
  return {
    allSchedules  : ScheduleStore.getAll(),
    currentSchedule : ScheduleStore.getCurrent()
  };
};

__defaultEmptySchedule = [
    "00000000000000000",
    "00000000000000000",
    "00000000000000000",
    "00000000000000000",
    "00000000000000000",
    "00000000000000000"
]

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

  componentDidUpdate :function(){
    var current = this.state.allSchedules[this.state.currentSchedule];
    var days = {};
    var groups = current === undefined ? [{schedule : [0,0,0,0,0,0,0],_schedule:__defaultEmptySchedule}] : current.groups;
    for(var i=0, len = groups.length; i<len; i++){
      var groupSchedule = groups[i]._schedule;
      var subject = SubjectStore.get(groups[i].subject);
      for(var j=0, len1 = groupSchedule.length; j<len1; j++){
        if(days["col"+(j+1)] === undefined){
          days["col"+(j+1)] = [];
        }
        var daySchedule = groupSchedule[j];
        var top = 16;
        var newElement = true;
        var height = 0;
        var newElementTop = 0;
        for(var k=0, len2 = daySchedule.length; k<len2; k++){
          var char = daySchedule[k];
          if(char == "1" && newElement == true){
            newElement = false;
            newElementTop = top;
            height = 1;
          } else if(char == "1" && newElement == false){
            height += 1;
          } else if(char === "0" && newElement == false){
            newElement = true;
            days["col"+(j+1)].push(<CalendarItem key={"" + i + j + k} height={height*32} top={newElementTop} subject={subject} group={groups[i].code}/>);
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
    React.renderComponent(SchedulesPager({schedules:this.state.allSchedules,current:this.state.currentSchedule}), document.getElementById("schedules-pager"));

  },
  /**
   * @return {object}
   */
  render: function() {

    return null;
  }
});

module.exports = Schedules;
