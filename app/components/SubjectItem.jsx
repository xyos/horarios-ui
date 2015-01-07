var React = require('react');
var ReactPropTypes = React.PropTypes;
var SubjectActions = require('../actions/SubjectActions');

var cx = require('react/lib/cx');

var GroupItem = React.createClass({

  propTypes: {
    group: ReactPropTypes.object.isRequired
  },

  /**
   * @return {object}
   */
  render: function() {
    var group = this.props.group;
    var className = cx(
      "item",
      group.selected ? 'selected': ''
    );

    return (
      <div className={className}>
        <input
          className="toggle"
          type="checkbox"
          checked={group.selected}
          onChange={this._onSelection}
        />
            {"grupo " + group.code}
      </div>
    );
  },

  _onSelection: function() {
    SubjectActions.selectGroup({subject:this.props.subject,group:this.props.group.code});
  }

});

var TeacherItem = React.createClass({

  getInitialState: function() {
    return {
      noShow: true,
      selected: this.props.teacher.selected
    };
  },

  propTypes: {
    teacher: ReactPropTypes.object.isRequired
  },

  /**
   * @return {object}
   */
  render: function() {
    var className = cx(
      "item",
      this.state.noShow ? 'no-show' : ''
    );

    return (
      <div className={className}>
        <input
          className="toggle"
          type="checkbox"
          checked={this.state.selected}
          onChange={this._onSelection}
        />
        <a onClick={this._onClick}>
            {this.props.teacher.name}
        </a>

        <div className="menu">{this.props.teacher.groupsArray}</div>
      </div>
    );
  },

  _onClick: function() {
    this.setState({noShow: !this.state.noShow});
  },

  _onSelection: function() {
    SubjectActions.selectTeacher({
      subject : this.props.subject,
      groups  : this.props.teacher.groups,
      selected: !this.state.selected
    });
    this.state.selected = !this.state.selected;
  }

});


var SubjectItem = React.createClass({

  propTypes: {
    subject: ReactPropTypes.object.isRequired
  },

  getInitialState: function() {
    return {
      noShow: true
    };
  },

  /**
   * @return {object}
   */
  render: function() {
    var subject = this.props.subject;
    var className = cx(
      "header item subject",
      subject.selected ? 'selected': '',
      this.state.noShow ? 'no-show' : '',
      subject.color.css
    );
    var teachers = this.props.subject.teachers;
    var groups = this.props.subject.groups;
    //teachers[groups[key].teacher].groupsArray = [];
    for(var key in groups){
      teachers[groups[key].teacher].groupsArray[key] = <GroupItem group={groups[key]} subject={subject.id}/>;
    }
    var teachersArray = [];
    for(var key in teachers){
      teachersArray.push(<TeacherItem teacher={teachers[key]} subject={this.props.subject.id}/>);
    }
    return (
      <div
        className={className}
        key={subject.id}>
        <i className="remove icon" onClick={this._onDestroyClick} />
          <input
            className="toggle"
            type="checkbox"
            checked={subject.selected}
            onChange={this._onSelection}
          />
          <a onClick={this._onClick}>
            {subject.name}
          </a>
          <div className="menu">{teachersArray}</div>
      </div>
    );
  },

  _onSelection: function() {
    SubjectActions.select(this.props.subject.id);
  },

  _onClick: function() {
    this.setState({noShow: !this.state.noShow});
  },

  _onDestroyClick: function() {
    SubjectActions.destroy(this.props.subject.id);
  }

});

module.exports = SubjectItem;