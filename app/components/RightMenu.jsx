var React = require('react');
var Saver = require('../utils/Saver');
var ExportText = require('./ExportText');
var cx = require('react/lib/cx');
var ScheduleActions = require('../actions/ScheduleActions');
var RightMenu = React.createClass({
  getInitialState : function(){
    return { isBusy : false }
  },
  getLink : function(){
    var json = Saver.getJSON();
    $.ajax({
      type: "POST",
      url: "http://bogota.nomeroben.com/api/v1.0/sessions/",
      data: {session:json}
    }).done(function(data){
      History.pushState(data.session, "horario:" + data.url, "?l=" + data.url);
      $('.save.nag').nag('clear');
      $('.save.nag').nag('show');
      setTimeout(function(){
        $('.save.nag').nag('hide');
      },5000);
    });
  },
  getText : function(){
    $('.modal')
      .modal('show')
    ;
  },
  toggleBusy :function(){
    var busy = !this.state.isBusy;
    ScheduleActions.setBusy(busy);
    this.setState({isBusy : busy});
  },
  componentDidMount: function(){
    React.renderComponent(ExportText({current:this.props.key}), document.getElementById("export-text"));
  },
  render: function() {
    // This section should be hidden by default
    // and shown when there are subjects.

    var busyClassName = cx(
      this.state.isBusy ? 'active red' : '',
      'item busy'
    );
    return (
    <div className="ui secondary pointing menu main-menu">
      <a className="item" onClick={this.getLink}>
        <i className="linkify icon"></i> Compartir
      </a>
      <a className="item copy-paste" onClick={this.getText}>
        <i className="file text icon"></i> Exportar
      </a>
      <a className={busyClassName} onClick={this.toggleBusy}>
        <i className="minus circle icon"></i> Horas ocupadas
      </a>
      <div className="right menu">
        <a className="item" target="_blank" href="https://www.facebook.com/HorariosUNAL">
          <i className="facebook icon"></i>
        </a>
        <a className="item" target="_blank" href="https://github.com/xyos/horarios">
          <i className="github icon"></i>
        </a>
      </div>
    </div>

    );
  }
});

module.exports = RightMenu;