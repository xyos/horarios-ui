/**
 * @copyright 2015, Prometheus Research, LLC
 */
'use strict';

var React            = require('react');
var SelectboxBase = require('./Selectbox');
var cx            = React.addons.classSet;
var SubjectActions = require('../actions/SubjectActions');
var SubjectStore = require('../stores/SubjectStore')

var styleInput = {
  display: 'block',
  height: '34px',
  padding: '6px 12px',
  fontSize: '14px',
  lineHeight: '1.42857143',
  color: '#555',
  backgroundColor: '#fff',
  backgroundImage: 'none',
  border: '1px solid #ccc',
  borderRadius: '4px',
  boxShadow: 'inset 0 1px 1px rgba(0,0,0,.075)',
  transition: 'border-color ease-in-out .15s,box-shadow ease-in-out .15s'
}

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
  padding: '3px 20px',
  clear: 'both',
  fontWeight: '400',
  lineHeight: '1.42857143',
  color: '#333',
  whiteSpace: 'nowrap'
};

var styleResultOnActive = {
  color: '#262626',
  textDecoration: 'none',
  backgroundColor: '#f5f5f5'
};

var stylePrePos = {
  overflowY: "hidden !important"
}



var Selectbox = React.createClass({

  getInitialState() {
    return {
      showMenu: false,
      pregrado: true
    };
  },
  render(){
    var icon = <i className='book icon' />;
    var that = this;
    var toggleMenu =  function(){
      var menu = !that.state.showMenu;
      that.setState({showMenu: menu})
    }
    var pregrado =  function(){
      that.setState({pregrado: true});
      SubjectActions.setProfessionType(true);
    }
    var postgrado =  function() {
      that.setState({pregrado: false});
      SubjectActions.setProfessionType(false);
    }
    var classInputName = cx(
      "ui fluid left icon input",
      this.props.hidden ?
      "hidden": null
    );
    var className = cx(
      this.state.showMenu ?
        'menu transition visible' :
        'menu'
    );
    var prePosClassName = cx(
      "ui dropdown active visible",
      this.props.hidden ?
      "hidden": null
    );
    var type = this.state.pregrado ? "pre-grado" : "pos-grado";
    var label =
    <div onClick={toggleMenu} className={prePosClassName}>
      <div className="text">{type}</div>
      <i className="dropdown icon"></i>
      <div className={className} style={stylePrePos}>
      <div onClick={pregrado} className="item">pre-grado</div>
      <div onClick={postgrado} className="item">pos-grado</div>
      </div>
    </div>
    return (
      <SelectboxBase
        {...this.props}
        icon = {icon}
        label = {label}
        classInputName={classInputName}
        styleResultList={styleResultList}
        styleResult={styleResult}
        styleResultOnActive={styleResultOnActive}
        />
    );
  }
});

module.exports = Selectbox;
