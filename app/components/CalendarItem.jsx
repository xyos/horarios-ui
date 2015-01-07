var React = require('react');
var ReactPropTypes = React.PropTypes;
var cx = require('react/lib/cx');
var SubjectStore = require('../stores/SubjectStore');
var CalendarItem = React.createClass({

  /**
   * @return {object}
   */
  render: function() {
    var divStyle = {
      position: "relative",
      height: this.props.height,
      top: this.props.top
    };
    var teacher = SubjectStore.getTeacher(this.props.subject.id, this.props.group);
    var itemClass = cx(
      "event",
      this.props.subject.color.css
    );
    return (
      <div
        className={itemClass}
        style={divStyle}
      >{teacher}</div>
    );
  }
});

module.exports = CalendarItem;