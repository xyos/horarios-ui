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
            {group.teacher}
      </div>
    );
  },

  _onSelection: function() {
    SubjectActions.selectGroup({subject:this.props.subject,group:this.props.group.code});
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
      this.state.noShow ? 'no-show' : ''
    );
    var groups = [];
    var allGroups = this.props.subject.groups;
    for(var key in allGroups){
      k = this.props.subject.id + key;
      groups.push(<GroupItem key={k} group={allGroups[key]} subject={subject.id}/>)
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
          <div className="menu">{groups}</div>
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