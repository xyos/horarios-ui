var React = require('react');
var ScheduleStore = require('../stores/ScheduleStore');
var SubjectStore = require('../stores/SubjectStore');
var ScheduleActions = require('../actions/ScheduleActions');
var Calendar = require('./Calendar');
var SchedulesPager = require('./SchedulesPager');

var CalendarItem = require('./CalendarItem');

var getState = function() {
  return {
    allSchedules  : ScheduleStore.getAll(),
    currentSchedule : ScheduleStore.getCurrent(),
    isBusySelected : ScheduleStore.getBusy(),
    busyArray : ScheduleStore.getBusyArray()
  };
};

var __defaultEmptySchedule = [
  "00000000000000000",
  "00000000000000000",
  "00000000000000000",
  "00000000000000000",
  "00000000000000000",
  "00000000000000000"
];

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
  setBusyHour(day,hour,value){
    ScheduleActions.setBusyHour({day:day,hour:hour,value:value});
  },
  _onChange : function() {
    this.setState(getState());
  },

  componentDidUpdate :function(){
    var current = this.state.allSchedules[this.state.currentSchedule];
    var days = {};
    var groups = current === undefined ? [{_schedule:__defaultEmptySchedule}] : current.groups;
    var isBusy = this.state.isBusySelected;
    if(isBusy){
      groups = [{_schedule:this.state.busyArray}];
    } else {
      groups.push({_schedule:this.state.busyArray});
    }
    for(var group=0, len = groups.length; group<len; group++){
      var groupSchedule = groups[group]._schedule;
      var subject = SubjectStore.get(groups[group].subject);
      for(var day=0, len1 = groupSchedule.length; day<len1; day++){
        if(days["col"+(day+1)] === undefined){
          days["col"+(day+1)] = [];
        }
        var daySchedule = groupSchedule[day];
        var top = 16;
        var newElement = true;
        var height = 0;
        var newElementTop = 0;
        for(var hour=0, len2 = daySchedule.length; hour<len2; hour++){
          var char = daySchedule[hour];
          if(isBusy) {
            days["col"+(day+1)].push(<CalendarItem clickBusyEvent={this.setBusyHour} key={"" + group + day + hour} height={32} top={top} busy={char == "1"} day={day} hour={hour} isBusy={isBusy}/> );
          } else if(char == "1"){
            if(newElement==true) {
              newElement = false;
              newElementTop = top;
              height = 1;
            } else {
              height += 1;
            }
            if (hour == len2 - 1) {
              days["col" + (day + 1)].push(<CalendarItem key={"" + group + day + hour} height={height * 32} top={newElementTop} subject={subject} group={groups[group].code }  busy={true}/>);
            }
          } else if(char === "0" && newElement == false){
            newElement = true;
            days["col"+(day+1)].push(<CalendarItem key={"" + group + day + hour} height={height*32} top={newElementTop} subject={subject} group={groups[group].code }  busy={true}/>);
            var height = 0;
          }
          top += 32;
        }
      }
    }
    groups.pop();
    for(var key in days){
      var domObject = document.getElementById(key);
      if(domObject !== null){
        React.render(<Calendar key={key} day={days[key]} />, domObject);
      }
    }
    React.render(<SchedulesPager schedules={this.state.allSchedules} current={this.state.currentSchedule} />, document.getElementById("schedules-pager"));

  },
  render: function() {

    return null;
  }
});

module.exports = Schedules;
