var AppDispatcher = require('../AppDispatcher');
var ScheduleConstants = require('../constants/ScheduleConstants');

var ScheduleActions = {

  update : subjects => {
    AppDispatcher.handleViewAction({
      actionType : ScheduleConstants.SCHEDULE_UPDATE,
      subjects : subjects
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