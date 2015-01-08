var React = require('react');
var ReactPropTypes = React.PropTypes;
var cx = require('react/lib/cx');
var SubjectStore = require('../stores/SubjectStore');
var StringUtils = require('../utils/String')
var CalendarItem = React.createClass({

  /**
   * @return {object}
   */
  render: function() {
    var divStyle = {
      position: "absolute",
      height: this.props.height,
      top: this.props.top,
      width: "100%",
    };
    var teacher = SubjectStore.getTeacher(this.props.subject.id, this.props.group);
    var textClass = cx(
      "event",
      this.props.subject.color.css
    );
    var itemClass = cx("event",this.props.subject.color.css,"engraved-text");
    return (
      <div>
      <div
        className={itemClass}
        style={divStyle}
      >
        {StringUtils.summarize(this.props.subject.name)}
      </div>
      <div className={textClass} style={divStyle}>{teacher}</div>
      </div>
    );
  }
});

module.exports = CalendarItem;
