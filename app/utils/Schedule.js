module.exports = {
  generateScheduleURL : function(subjects){
    var url = "";
    for(var key in subjects){
      if(subjects[key].selected){
        url += "," + key;
        for(var i = 0, len = subjects[key].groups.length; i < len; i++){
          if(subjects[key].groups[i].selected){
            url += "|" + (subjects[key].groups[i].code);
          }
        }
      }
    }
    return "subjects=" + url.substring(1) + "&busy=0,0,0,0,0,0,0";
  }
};