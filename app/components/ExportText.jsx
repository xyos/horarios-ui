var ScheduleUtils = require('../utils/Schedule');
var ScheduleStore = require('../stores/ScheduleStore');
var React = require('react');

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
  render: function() {
    var text = ScheduleUtils.toText(this.state.allSchedules[this.state.currentSchedule]);
    return (
      <div className="field">
        <label>Horario actual</label>
        <textarea className="modaltext" value={text} readOnly={true}></textarea>
      </div>
    );
  },
  _onChange : function() {
    this.setState(getState());
  }
});

module.exports = Schedules;
