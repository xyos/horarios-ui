var AppDispatcher = require('../AppDispatcher');
var ScheduleConstants = require('../constants/ScheduleConstants');

var ScheduleActions = {

  setCurrent : id => {
    AppDispatcher.handleViewAction({
      actionType : ScheduleConstants.SCHEDULE_SET_CURRENT,
      id : id
    });
  },
  loadRaw : schedules => {
    AppDispatcher.handleServerAction({
      actionType : ScheduleConstants.SCHEDULE_LOAD,
      subjects : schedules
    });
  }

};

module.exports = ScheduleActions;