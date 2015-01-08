var decimalToSchedString = function (value) {
  return ( parseInt(value, 10) + Math.pow(2, 25) ).toString(2).substring(2).split('').reverse().join('');
};
module.exports = {
  generateScheduleURL : function(subjects, profession){
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
    return "subjects=" + url.substring(1) + "&busy=0,0,0,0,0,0,0";
    // TODO: uncomment this on profession change
    // return "subjects=" + url.substring(1) + "&busy=0,0,0,0,0,0,0" + "&profession=" + profession;
  },
  decimalToSchedString : decimalToSchedString
};