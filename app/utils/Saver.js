var SubjectStore   = require('../stores/SubjectStore');
var ScheduleStore = require('../stores/ScheduleStore');

var Saver = {
  getJSON : function(){
    return JSON.stringify({
      subjects : SubjectStore.getAll(),
      profession : SubjectStore.getProfession(),
      schedules : ScheduleStore.getAll(),
      currentSchedule : ScheduleStore.getCurrent(),
      colors : SubjectStore.getAvailableColors()
    })
  },
  getText : function(){
    return JSON.stringify(this.getJSON);

  }
};

module.exports = Saver;