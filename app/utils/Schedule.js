import SubjectStore from '../stores/SubjectStore';
var decimalToSchedString = function (value) {
  return ( parseInt(value, 10) + Math.pow(2, 25) ).toString(2).substring(2).split('').reverse().join('');
};
module.exports = {
  generateSchedules: function(subjects,busyArray){
    let isCompatible = function(s1,s2){
      let compatible = true;
      for (var i = 0; i < s1.length; i++) {
        compatible = !(s1[i] & s2[i]) && compatible;
      }
      return compatible;
    }
    let mergeBusy = function(s1,s2){
      let newBusy = [];
      for (var i = 0; i < s1.length; i++) {
        newBusy.push(s1[i] | s2[i]);
      }
      return newBusy;
    }
    let schedules = [];
    let busy = [];
    for (let i = 0; i < busyArray.length; i++) {
      let day = busyArray[i] + "000";
      busy.push(parseInt(day,2));
    }
    for (let subject in subjects) {
      if (subjects.hasOwnProperty(subject)) {
        let groupsSelected = 0;
        for (let j = 0; j < subjects[subject].groups.length; j++) {
           if(subjects[subject].groups[j].selected) groupsSelected++;
        }
        if(groupsSelected === 0) break;
        let temp_sched = schedules;
        schedules = [];
        for (let j = 0; j < subjects[subject].groups.length; j++) {
          if(temp_sched.length === 0){
            if(isCompatible(busy,subjects[subject].groups[j].intSchedule) && subjects[subject].groups[j].selected){
              let schedBusy = mergeBusy(busy,subjects[subject].groups[j].intSchedule);
              schedules.push({"groups" : [subjects[subject].groups[j]], "busy" : schedBusy});
            }
          } else {
            for (let i = 0; i < temp_sched.length; i++) {
              if(isCompatible(temp_sched[i].busy, subjects[subject].groups[j].intSchedule) && subjects[subject].groups[j].selected){
                let groups = temp_sched[i].groups.concat(subjects[subject].groups[j]);
                let schedBusy = mergeBusy(temp_sched[i].busy, subjects[subject].groups[j].intSchedule);
                schedules.push({"groups" : groups, "busy" : schedBusy});
              }
            }
          }
        }
      }
    }
    return schedules;
  },
  generateScheduleURL : function(subjects, busyArray){
    var url = "";

    for(var key in subjects){
      var groupUrl = "," + key;
      var groups = 0;
        for(var i = 0, len = subjects[key].groups.length; i < len; i++){
          if(subjects[key].groups[i].selected){
            groupUrl += "|" + (subjects[key].groups[i].code);
            groups++;
          }
        }
      if(groups === 0){
        groupUrl = "";
      }
      url += groupUrl;
     }

    var busyUrl = "";
    for(var key in busyArray){
      busyUrl += "," + this.dayStringToInt(busyArray[key]);
    }
    busyUrl += ",0";
    return "subjects=" + url.substring(1) + "&busy=" + busyUrl.substring(1);
    // TODO: uncomment this on profession change
    // return "subjects=" + url.substring(1) + "&busy=0,0,0,0,0,0,0" + "&profession=" + profession;
  },
  decimalToSchedString : decimalToSchedString,
  toText : function(schedule){
    if(schedule){
      var str = "";
      schedule.groups.forEach(function(group){
        str += "Materia: " + SubjectStore.getName(group.subject) + "\tCod: " + group.subject + "\tGrupo: " + group.code + "\tProfesor: " + SubjectStore.getTeacher(group.subject, group.code) + "\n";
      });
      return str;
    } else {
      return "No hay horario";
    }
  },
  dayStringToInt: function(str){
    return parseInt(("0000000" + str).split("").reverse().join(""),2);
  }
};
