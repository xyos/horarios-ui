var React = require('react');
var AutoComplete = require('./Autocomplete');
var $ = require('jquery');
var cx = require('react/lib/cx');


var SearchComponent = React.createClass({

  getInitialState: function() {
    return {
      noShow: true
    };
  },

  propTypes: {
    onAdd: React.PropTypes.func,
    onDelete: React.PropTypes.func
  },
  _onClick: function() {
    this.setState({noShow: !this.state.noShow});
  },
  render : function() {
    var className = cx(
      "ui menu subject-types",
      this.state.noShow ? 'no-show' : ''
    );
    return (
      <div className="search-menu">
        <AutoComplete
          options={{url: "http://bogota.nomeroben.com/api/v1.0/subject/autocomplete/"}}
          search={this._searchRemote}
          onChange={this._selectSubject}
          reset={false}
          className="ui left fluid icon input"
          placeHolder="Buscar Materias"
        />
        <a onClick={this._onClick}>Búsqueda Avanzada</a>
        <div className={className}>
            <div className="divider"></div>
            <div className="item">
              <div className="ui yellow empty circular label"></div>
              Nivelación
            </div>
            <div className="item">
              <div className="ui blue empty circular label"></div>
              Fundamentación
            </div>
            <div className="item">
              <div className="ui green empty circular label"></div>
              Disciplinar
            </div>
            <div className="item">
              <div className="ui orange empty circular label"></div>
              Libre Elección
            </div>
          </div>
      </div>
    );
  },
  _searchRemote: function(options, searchTerm, cb) {
    if (searchTerm.length < 3){
      return [];
    } else {
      $.ajax({
        url: options.url + searchTerm + '/',
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