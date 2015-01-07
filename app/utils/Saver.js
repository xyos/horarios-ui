var SubjectStore   = require('../stores/SubjectStore');
var ScheduleStore = require('../stores/ScheduleStore');

var Saver = {
  getJSON : function(){
    return {
      subjects : SubjectStore.getAll(),
      profession : SubjectStore.getProfession(),
      schedules : SubjectStore.getAll(),
      currentSchedule : ScheduleStore.getCurrent()
    }
  },
  getText : function(){
    return JSON.stringify(this.getJSON);
  }
};

module.exports = Saver;