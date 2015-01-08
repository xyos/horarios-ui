var React = require('react');
var ReactPropTypes = React.PropTypes;
var Saver = require('../utils/Saver');
var history = require('html5-history');
var RightMenu = React.createClass({
  getLink : function(){
    var json = Saver.getJSON();
    $.ajax({
      type: "POST",
      url: "http://bogota.nomeroben.com/api/v1.0/sessions/",
      data: {session:json}
    }).done(function(data){
      console.log(data);
      History.pushState(data.session, "horario:" + data.url, "?l=" + data.url);
    });
  },
  getText : function(){
    var json = Saver.getText();
    console.log(json);
  },
  /**
   * @return {object}
   */
  render: function() {
    // This section should be hidden by default
    // and shown when there are subjects.
    return (
    <div className="ui blue inverted menu">
      <a className="item" onClick={this.getLink}>
        <i className="save icon"></i> Guardar
      </a>
      <a className="item" onClick={this.getText}>
        <i className="file text icon"></i> Texto
      </a>
      <div className="right menu">
        <a className="item">
          <i className="facebook icon"></i> Facebook
        </a>
        <a className="item">
          <i className="github icon"></i> Github
        </a>
      </div>
    </div>

    );
  }
});

module.exports = RightMenu;