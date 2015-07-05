var React = require('react');
var ReactPropTypes = React.PropTypes;
var SubjectStore = require('../stores/SubjectStore');
var StringUtils = require('../utils/String');
//var AutoComplete = require('./Autocomplete');
var SubjectActions = require('../actions/SubjectActions');
var AutoComplete  = require('./AutoCompleteProfession');
var cx            = React.addons.classSet;

var getState = function() {
  return {
    professions  : SubjectStore.getProfessions(),
    profession   : SubjectStore.getProfession()
  };
};

var ProfessionItem = React.createClass({

  render: function () {
    var name = StringUtils.humanize(StringUtils.latinize(this.props.name));
    return <div className="item">{name}</div>;
  }
});

var ProfessionChooser = React.createClass({

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

  render: function() {
    var professions = [{id:"",title:"NINGUNA"}];
    for(var i=0; i< this.state.professions.length; i++){
      var name = StringUtils.latinize(this.state.professions[i].name);
      var code = this.state.professions[i].code;
      professions.push({id:code,title:name});
    }
    var showButton = cx(
      "ui teal button fluid",
      this.state.profession.name == undefined || this.state.profession.name == "" ?
        'hidden' :
        null
    );
    var showSearch = this.state.profession.code > 0
    return (
      <div>
        <AutoComplete
          options={professions}
          onChange={this._selectProfession}
          hidden={showSearch}
          placeholder="Selecciona tu Carrera..."
          id="searchBox1"
          value={this.state.profession}
        />
      <button onClick={this._clearProfession} className={showButton}>{this.state.profession.name}</button>
      </div>
    );
  },
  _clearProfession: function(profession){
      SubjectActions.setProfession({code: "", name: ""});
  },
  _selectProfession: function(profession){
    if(profession){
      profession = profession.id ? (profession.id == "") ? {code: '', name: ''} : profession : {code: '', name: ''};
      SubjectActions.setProfession({code: profession.id, name: profession.title});
    }
  }
});

module.exports = ProfessionChooser;
