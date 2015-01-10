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
      schedules: schedules
    });
  },
  setBusy : busy => {
    AppDispatcher.handleViewAction({
      actionType : ScheduleConstants.SCHEDULE_SET_BUSY,
      busy : busy
    });
  },
  setBusyItem : busyItem => {
    AppDispatcher.handleViewAction({
      actionType : ScheduleConstants.SCHEDULE_SET_BUSY_ITEM,
      busy : busyItem
    });
  }
};

module.exports = ScheduleActions;