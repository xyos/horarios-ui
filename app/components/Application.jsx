var React = require('react');
require('../style/app.less');
require('semantic-ui/dist/semantic.css');
require('semantic-ui/dist/semantic.js');
var SubjectStore = require('stores/SubjectStore');
var ScheduleStore = require('stores/ScheduleStore');
var SubjectActions = require('actions/SubjectActions');
var SearchComponent = require('./SearchComponent');
var Subjects  = require('./Subjects');
var Schedules = require('./Schedules');
var RightMenu = require('./RightMenu');
var History = require("html5-history");
var ScheduleActions = require('../actions/ScheduleActions');
var AppDispatcher = require('../AppDispatcher');

window.History = History;
window.React = React;

var hash = History.getState().hash;




var getState = function() {
  return {
    allSubjects  : SubjectStore.getAll(),
    credits : SubjectStore.getCredits()
  };
};


var Application = React.createClass({
  getInitialState : function() {
    return getState();
  },

  componentDidMount : function() {
    SubjectStore.addChangeListener(this._onChange);
  },

  componentWillUnmount : function() {
    SubjectStore.removeChangeListener(this._onChange);
  },

  _onChange : function() {
    this.setState(getState());
  },

  _addSubject : function(subject) {
    SubjectActions.addSubject(subject);
  },


  render : function() {
    var  side  = React.renderComponent(RightMenu(), document.getElementById('right-menu'));
    side.setProps({ message : "hello" });
    var  schedules = React.renderComponent(Schedules(), document.getElementById('schedules'));
    return (
      <div className="ui fluid menu vertical">
        <div className="item">
          <SearchComponent
            onAdd={this._addSubject}
          />
        </div>
        <Subjects
          allSubjects={this.state.allSubjects}
        />
        <div className="ui item bottom attached">{this.state.credits} Creditos</div>
      </div>
    );
  }
});


var app = Application();

React.renderComponent(app, document.getElementById('search'));
$('.ui.checkbox')
  .checkbox()
;
Loader = require('../utils/Loader');
Loader(hash);

