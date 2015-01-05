var React = require('react');
var ReactPropTypes = React.PropTypes;
var ScheduleActions = require('../actions/ScheduleActions');
var ScheduleStore = require('../stores/ScheduleStore');

var getState = function() {
  return {
    allSchedules  : ScheduleStore.getAll()
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
  propTypes: {
    allSchedules: ReactPropTypes.object.isRequired
  },

  /**
   * @return {object}
   */
  render: function() {
    // This section should be hidden by default
    // and shown when there are subjects.

    var number = this.state.allSchedules.length;

    return (
      <div>{number}</div>
    );
  }
});

module.exports = Schedules;