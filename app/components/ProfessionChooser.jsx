var React = require('react');
var ReactPropTypes = React.PropTypes;

var ProfessionChooser = React.createClass({


  /**
   * @return {object}
   */
  render: function() {
    return (
      <div className="ui fluid floating dropdown labeled search icon button">
        <i className="book icon"></i>
        <span className="text">Seleccione su Carrera</span>
        <div className="menu">
          <div className="item">Ingenieria de sistemas y computación</div>
          <div className="item">Sociologia</div>
          <div className="item">Biologia</div>
          <div className="item">Maestria en perritos</div>
          <div className="item">MAESTRIA EN INGENIERIA  INGENIERIA ELÉCTRICA CONVENIO SEDE  MANIZALES</div>
        </div>
      </div>
    );
  }
});

module.exports = ProfessionChooser;