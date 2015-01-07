var $ = require('jquery');
var SubjectActions = require('../actions/SubjectActions');
var ScheduleActions = require('actions/ScheduleActions');
var Loader = function(hash){
  var re = /(^\/\?l=)([a-zA-Z0-9]*$)/;
  var m;
  m = re.exec(hash);
  if(m !== null){
    var url = m[2];
    $.ajax({
      //url: "./" + url + ".json",
      url: "https://gist.githubusercontent.com/xyos/1a338c24fc11e62f26db/raw/559172174f01468642e2dc38a2a8f38636bd0a19/test.json",
      dataType: 'json'
    }).done(function(data){
      SubjectActions.loadRaw(data);
      setTimeout(function(){
        ScheduleActions.loadRaw(data);
      },100);

    });

  }
};

module.exports = Loader;