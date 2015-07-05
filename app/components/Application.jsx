var React = require('react');

require('semantic-ui/dist/semantic.js');
require('../style/app.less');
var SubjectStore = require('../stores/SubjectStore');
var ScheduleStore = require('../stores/ScheduleStore');
var SubjectActions = require('../actions/SubjectActions');
var SearchComponent = require('./SearchComponent');
var Subjects  = require('./Subjects');
var Schedules = require('./Schedules');
var RightMenu = require('./RightMenu');
var History = require("html5-history");
var ScheduleActions = require('../actions/ScheduleActions');
var AppDispatcher = require('../AppDispatcher');
var cx = require('react/lib/cx');
var ProfessionChooser = require('./ProfessionChooser.jsx');
var cookie = require('js-cookie');

window.History = History;
window.React = React;
SubjectStore.setProfessions();
var hash = History.getState().hash;

var getState = function() {
  return {
    allSubjects  : SubjectStore.getAll(),
    credits : SubjectStore.getCredits(),
    profession : SubjectStore.getProfession()
  };
};


var Application = React.createClass({
  getInitialState : function() {
    return getState();
  },

  componentDidMount : function() {
    SubjectStore.addChangeListener(this._onChange);
    React.render(<RightMenu />, document.getElementById('right-menu'));
    React.render(<Schedules />, document.getElementById('schedules'));
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
    var creditsClass = cx(
      "active item bottom attached",
      this.state.credits < 10 ? 'red' : this.state.credits <= 20 ? 'green' : 'orange'
    );
    return (
      <div className="ui fluid menu vertical">
        <div className="item">
          <ProfessionChooser/>
        </div>
        <div className="item">
          <SearchComponent
            onAdd={this._addSubject}
            profession={this.state.profession}
          />
        </div>
        <Subjects
          allSubjects={this.state.allSubjects}
        />
        <a className={creditsClass}>{this.state.credits} Creditos</a>
      </div>
    );
  }
});


$('.ui.modal')
  .modal()
;
React.render(<Application/>, document.getElementById('search'));
(function(window,undefined){
  History.Adapter.bind(window,'statechange',function(){
    var State = History.getState();
    Loader.fromHash(State.hash);
  });
})(window);
var Loader = require('../utils/Loader');
Loader.fromHash(hash);
