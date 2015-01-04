var React = require('react');
require('../style/app.less');
require('semantic-ui/dist/semantic.css');
require('semantic-ui/dist/semantic.js');
var SubjectStore = require('stores/SubjectStore');
var SubjectActions = require('actions/SubjectActions');
var SearchComponent = require('./SearchComponent');
var Subjects = require('./Subjects');
var RightMenu = require('./RightMenu');

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
    var  side  = React.renderComponent(RightMenu(), document.getElementById('react2'));
    side.setProps({ message : "hello" });
    console.log(getState());
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


React.renderComponent(Application(), document.getElementById('react'));
$('.ui.checkbox')
  .checkbox()
;


