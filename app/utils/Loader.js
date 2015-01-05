var $ = require('jquery');
var SubjectActions = require('../actions/SubjectActions');
var Loader = function(hash){
  var re = /(^\/\?l=)([a-zA-Z0-9]*$)/;
  var m;
  m = re.exec(hash);
  if(m !== null){
    var url = m[2];
    $.ajax({
      //url: "./" + url + ".json",
      url: "https://gist.githubusercontent.com/xyos/1a338c24fc11e62f26db/raw/230b96367b803771ca3bb7b64d267d0fda1020f9/test.json",
      dataType: 'json'
    }).done(function(data){
      console.log(data.allSubjects);
      SubjectActions.loadRaw(data.allSubjects);
    });

  }
};

module.exports = Loader;