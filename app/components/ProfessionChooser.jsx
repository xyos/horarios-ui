var React = require('react');
var ReactPropTypes = React.PropTypes;
var SubjectStore = require('../stores/SubjectStore');
var StringUtils = require('../utils/String');

var getState = function() {
  return {
    professions  : SubjectStore.getProfessions()
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
      var name = this.state.professions[i].name;
      var code = this.state.professions[i].code;
      professions.push(<ProfessionItem name={name} code={code}/>);
    }
    return (
      <div className="ui fluid floating dropdown labeled search icon button">
        <i className="book icon"></i>
        <span className="text">Seleccione su Carrera</span>
        <div className="menu">
        {professions}
        </div>
      </div>
    );
  }
});

module.exports = ProfessionChooser;