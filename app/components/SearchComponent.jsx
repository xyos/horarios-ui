var React = require('react');
var AutoComplete = require('./Autocomplete');
var $ = require('jquery');
var cx = require('react/lib/cx');


var FilterItem = React.createClass({
  select: function(){
    this.props.change(this.props.key,!this.props.filter.selected);
  },
  render : function(){
    var className = cx(
      "ui empty circular label",
      this.props.filter.selected ? '': 'disabled',
      this.props.filter.color
    );
    return (
      <div className="item">
        <input
          className="toggle"
          type="checkbox"
          checked={this.props.filter.selected}
          onChange={this.select}
        />
        <div className={className}></div>
      {this.props.filter.name}
      </div>
    );
  }
});

var SearchComponent = React.createClass({

  getInitialState: function () {
    return {
      noShow: true,
      filters: [
        {
          "name": "Nivelación",
          "color": "yellow",
          "selected": true,
          "code": "P"
        },
        {
          "name": "Fundamentación",
          "color": "blue",
          "selected": true,
          "code": "B"
        },
        {
          "name": "Disciplinar",
          "color": "green",
          "selected": true,
          "code": "C"
        },
        {
          "name": "Multiples",
          "color": "black",
          "selected": true,
          "code": "M"
        },
        {
          "name": "Libre Elección",
          "color": "orange",
          "selected": true,
          "code": "L"
        },
        {
          "name": "Obligatoria",
          "color": "purple",
          "selected": true,
          "code": "O"
        },
        {
          "name": "Elegible",
          "color": "red",
          "selected": true,
          "code": "T"
        }
      ],
      filterElements : []
    };
  },

  propTypes: {
    onAdd: React.PropTypes.func,
    onDelete: React.PropTypes.func
  },
  _onClick: function() {
    this.setState({noShow: !this.state.noShow});
  },
  changeFilter(index, value){
    var newState = this.state;
    newState.filters[index].selected = value;
    this.setState(newState);
  },
  componentWillMount: function(){
    this.state.filterElements = [];
    for(var i = 0; i< this.state.filters.length; i++){
      this.state.filterElements.push(<FilterItem filter={this.state.filters[i]} key={i} change={this.changeFilter}/>);
    }
  },
  render : function() {
    var className = cx(
      "ui menu subject-types",
      this.state.noShow ? 'no-show' : ''
    );


    return (
      <div className="search-menu">
        <AutoComplete
          options={{url: "http://bogota.nomeroben.com/api/v1.0/subject/autocomplete2/search_term="}}
          search={this._searchRemote}
          onChange={this._selectSubject}
          reset={false}
          className="ui left fluid icon input"
          placeHolder="Buscar Materias"
        />
        <a onClick={this._onClick}>Búsqueda Avanzada</a>
        <div className={className}>
        {this.state.filterElements}
        </div>
      </div>
    );
  },
  _searchRemote: function(options, searchTerm, cb) {
    if (searchTerm.length < 0){
      return [];
    } else {
      var subject_type = ["X"];
      for(var i = 0;i < this.state.filters.length; i++){
        if(this.state.filters[i].selected == true){
          subject_type.push(this.state.filters[i].code);
        }
      }
      console.log(subject_type);
      $.ajax({
        url: options.url + searchTerm + '&profession=' + this.props.profession.code + '&subject_type=' + JSON.stringify(subject_type),
        dataType: 'json',
        success: this._onXHRSuccess.bind(null, cb, searchTerm),
        error: this._onXHRError.bind(null, cb)
      });
    }
  },
  _onXHRSuccess: function(cb, searchTerm, data, status, xhr) {
    cb(null, this._filterData(data))
  },

  _onXHRError: function(cb, xhr, status, err) {
    cb(err)
  },
  _filterData: function(data) {
    var results = [];
    for (var i = 0, len = data.length; i < len; i++) {
        results.push({id : data[i].code, title : data[i].name});
    }
    return results.slice(0, 100)
  },
  _selectSubject: function(subject){
    this._onSubjectAdd(subject);
  },
  _onSubjectAdd: function(subject){
    if (this.props.onAdd) {
      this.props.onAdd(subject);
    }
  }
});


module.exports = SearchComponent;