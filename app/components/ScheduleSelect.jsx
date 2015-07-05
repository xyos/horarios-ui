var React = require('react');
var ReactPropTypes = React.PropTypes;
var ScheduleThumbnail = require('./ScheduleThumbnail');
var ScheduleActions = require('../actions/ScheduleActions');
var cx = require('react/lib/cx');

var ScheduleSelect = React.createClass({

  onClick: function(e){
    ScheduleActions.setCurrent(this.props.key);
  },

  /**
   * @return {object}
   */
  render: function() {

    buttonClasses = cx({
            "btn" : true ,
            "btn-primary" : this.props.selected
    });

    return (
      <div className="col-sm-2 col-md-2">
      <div className="thumbnail">
      <ScheduleThumbnail key={this.props.key} w={100} h={50} groups={this.props.groups}/>
        <div className="caption">
          <p><button type="button" className={buttonClasses} onClick={this.onClick}>Horario {this.props.key}</button></p>
        </div>
      </div>
      </div>
    );
  }
});

module.exports = ScheduleSelect;
