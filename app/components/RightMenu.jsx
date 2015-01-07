var React = require('react');
var ReactPropTypes = React.PropTypes;
var Saver = require('../utils/Saver');

var RightMenu = React.createClass({
  getLink : function(){
    var json = Saver.getJSON();

    console.log(JSON.stringify(json));
  },
  getText : function(){
    var json = Saver.getText();
    console.log(json);
  },
  /**
   * @return {object}
   */
  render: function() {
    // This section should be hidden by default
    // and shown when there are subjects.
    return (
    <div className="ui blue inverted menu">
      <a className="item" onClick={this.getLink}>
        <i className="save icon"></i> Guardar
      </a>
      <a className="item" onClick={this.getText}>
        <i className="file text icon"></i> Texto
      </a>
      <div className="right menu">
        <a className="item">
          <i className="facebook icon"></i> Facebook
        </a>
        <a className="item">
          <i className="github icon"></i> Github
        </a>
      </div>
    </div>

    );
  }
});

module.exports = RightMenu;