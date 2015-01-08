var $ = require('jquery');
var SubjectActions = require('../actions/SubjectActions');
var ScheduleActions = require('actions/ScheduleActions');
var Loader = {
  fromHash : function (hash) {
    var re = /(^\/\?l=)([a-zA-Z0-9]*)&/;
    var m;
    m = re.exec(hash);
    if (m !== null) {
      var url = m[2];
      $.ajax({
        url: "http://bogota.nomeroben.com/api/v1.0/sessions/" + url,
        //url: "https://gist.githubusercontent.com/xyos/1a338c24fc11e62f26db/raw/559172174f01468642e2dc38a2a8f38636bd0a19/test.json",
        dataType: 'json'
      }).done(function (data) {
        var d = JSON.parse(data.session);
        SubjectActions.loadRaw(d);
        setTimeout(function () {
          ScheduleActions.loadRaw(d);
        }, 100);
      });

    }
  }
};

module.exports = Loader;