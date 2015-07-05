/**
 * @copyright 2015, Prometheus Research, LLC
 */
'use strict';

var React            = require('react');
var SelectboxBase = require('./Selectbox');


var styleResultList = {
  position: 'absolute',
  top: '100%',
  width: '100%',
  left: '0',
  zIndex: '1000',
  float: 'left',
  minWidth: '160px',
  padding: '2px 0',
  margin: '0px 0 0',
  fontSize: '12px',
  textAlign: 'left',
  listStyle: 'none',
  backgroundColor: '#fff',
  backgroundClip: 'padding-box',
  border: '1px solid rgba(0,0,0,.15)',
  borderRadius: '4px',
  boxShadow: '0 6px 12px rgba(0,0,0,.175)',
  maxHeight: '1800%',
  overflowY: 'scroll'
};

var styleResult = {
  display: 'block',
  padding: '3px 10px',
  clear: 'both',
  fontWeight: '400',
  wordWrap: 'break-word',
  lineHeight: '1.42857143',
  color: '#333',
  width : '100%',
  //whiteSpace: 'nowrap'
};

var styleResultOnActive = {
  color: '#262626',
  textDecoration: 'none',
  backgroundColor: '#f5f5f5'
};

var Selectbox = React.createClass({

  render() {
    var icon = <i className='search icon' />;
    return (
      <SelectboxBase
        {...this.props}
        classInputName="ui fluid icon input"
        icon={icon}
        placeholder="Buscar Materias..."
        styleResultList={styleResultList}
        styleResult={styleResult}
        styleResultOnActive={styleResultOnActive}
        />
    );
  }
});

module.exports = Selectbox;
