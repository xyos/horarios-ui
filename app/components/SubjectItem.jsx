var React = require('react');
var ReactPropTypes = React.PropTypes;
var SubjectActions = require('../actions/SubjectActions');

var cx = require('react/lib/cx');

var SubjectItem = React.createClass({

  propTypes: {
    subject: ReactPropTypes.object.isRequired
  },

  getInitialState: function() {
    return {
      expanded: true
    };
  },

  /**
   * @return {object}
   */
  render: function() {
    var subject = this.props.subject;

    return (
      <li
        className={cx({
          'selected': subject.selected,
          'expanded': this.state.expanded
        })}
        key={subject.id}>
        <div className="view">
          <input
            className="toggle"
            type="checkbox"
            checked={subject.selected}
            onChange={this._onSelection}
          />
          <label onClick={this._onClick}>
            {subject.name}
          </label>
          <button className="destroy" onClick={this._onDestroyClick} />
        </div>
      </li>
    );
  },

  _onSelection: function() {
    //SubjectActions.select(this.props.subject);
  },

  _onClick: function() {
    this.setState({expanded: !this.state.expanded});
  },

  _onDestroyClick: function() {
    console.log(this.props.subject);
    SubjectActions.destroy(this.props.subject.id);
  }

});

module.exports = SubjectItem;