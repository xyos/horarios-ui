var React = require('react');
require('../style/app.less');
var SubjectStore = require('stores/SubjectStore');
var SubjectActions = require('actions/SubjectActions');
var SearchComponent = require('./SearchComponent');
var Subjects = require('./Subjects');

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
    return (
      <div>
        <h1>Hello World!</h1>
        <SearchComponent
          onAdd={this._addSubject}
        />
        <Subjects
          allSubjects={this.state.allSubjects}
        />
      {this.state.credits} Creditos
      </div>
    );
  }

});

React.renderComponent(Application(), document.body);