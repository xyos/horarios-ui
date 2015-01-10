var React = require('react');
var ReactPropTypes = React.PropTypes;
var cx = require('react/lib/cx');
var SubjectStore = require('../stores/SubjectStore');
var StringUtils = require('../utils/String');

var CalendarItem = React.createClass({

  handleClick : function(){
    if(this.props.clickBusyEvent && this.props.isBusy){
      this.props.clickBusyEvent(this.props.day,this.props.hour,!this.props.busy)
    }
  },
  render: function() {
    var divStyle = {
      height: this.props.height,
      top: this.props.top
    };

    var text = this.props.subject ?
      SubjectStore.getTeacher(this.props.subject.id, this.props.group) + " (" + this.props.group + ")":
      this.props.busy ? "ocupado" : 'libre';
    var color = this.props.subject ?
      this.props.subject.color.css:
      this.props.busy ? "red" : 'green';
    var textClass = cx(
      "event",
      color
    );
    return (
      <div>
        <div onClick={this.handleClick} className={textClass} style={divStyle}>{text}</div>
      </div>
    );
  }
});

module.exports = CalendarItem;
