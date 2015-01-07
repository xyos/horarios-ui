var React = require('react');
var ReactPropTypes = React.PropTypes;
var SubjectStore = require('../stores/SubjectStore');
var StringUtils = require('../utils/String');
var AutoComplete = require('./Autocomplete');
var SubjectActions = require('../actions/SubjectActions');

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

  _chooseProfession : function(profession) {
    SubjectActions.chooseProfession(profession);
  },
  /**
   * @return {object}
   */
  render: function() {
    var professions = [];
    for(var i=0; i< this.state.professions.length; i++){
      var name = StringUtils.latinize(this.state.professions[i].name);
      var code = this.state.professions[i].code;
      professions.push({id:code,title:name});
    }
    return (
        <AutoComplete
          options={professions}
          onChange={this._selectProfession}
          className="ui fluid floating dropdown labeled search icon button"
          placeHolder="Elija su carrera..."
          id="searchBox1"
          span={true}
          reset={false}
          value={this.state.profession.name}
        />
    );
  },
  _selectProfession: function(profession){
    profession = profession.id ? profession : {code: '', name: ''};
    SubjectActions.setProfession({code: profession.id, name: profession.title});
  }
});

module.exports = ProfessionChooser;