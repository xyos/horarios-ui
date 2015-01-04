var React = require('react');
var ReactPropTypes = React.PropTypes;
var SubjectActions = require('../actions/SubjectActions');
var SubjectItem = require('./SubjectItem');

var Subjects = React.createClass({

  propTypes: {
    allSubjects: ReactPropTypes.object.isRequired
  },

  /**
   * @return {object}
   */
  render: function() {
    // This section should be hidden by default
    // and shown when there are subjects.
    if (Object.keys(this.props.allSubjects).length < 1) {
      return null;
    }

    var allSubjects = this.props.allSubjects;
    var subjects = [];

    for (var key in allSubjects) {
      subjects.push(<SubjectItem key={key} subject={allSubjects[key]} />);
    }

    return (
      <div>{subjects}</div>
    );
  }
});

module.exports = Subjects;