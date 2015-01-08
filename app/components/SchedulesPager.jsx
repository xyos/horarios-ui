var React = require('react');
var ReactPropTypes = React.PropTypes;
var ScheduleThumbnail = require('./ScheduleThumbnail');
var ScheduleStore = require('../stores/ScheduleStore');
var cx = require('react/lib/cx');
var _selectedPage = 0;

var getState = function() {
  return {
    currentSchedule  : ScheduleStore.getCurrent(),
    selectedPage : _selectedPage
  };
};


var Page =React.createClass({
  change: function(){
    this.props.changePage(this.props.index);
  },
  render: function () {
    var className = cx(
      this.props.selected ? 'active' : '',
      'item'
    );
    return (
      <a className={className} onClick={this.change}>
      {this.props.index + 1}
      </a>
    )
  }
});

var PagerMenu = React.createClass({
  render: function(){
    var pages = [];
    if(this.props.pages == 1){
      return null;
    }
    for(var i = 0; i < this.props.pages; i++){
      var selected = (i==this.props.selected)
      pages.push(<Page index={i} selected={selected} changePage={this.props.onPageChange}/>);
    }
    return (
      <div className="ui pagination menu pages purple inverted">
        {pages}
      </div>
    )
  }
});


var SchedulesPager = React.createClass({
  getInitialState : function() {
    return getState();
  },

  componentDidMount : function() {
    ScheduleStore.addChangeListener(this._onChange);
  },

  componentWillUnmount : function() {
    ScheduleStore.removeChangeListener(this._onChange);
  },

  _onChange : function() {
    this.setState(getState());
  },

  /**
   * @return {object}
   */
  render: function() {

    schedules = [];
    var schedulesNumber = this.props.schedules.length;
    if(schedulesNumber == 0){
      return null;
    }
    var pages = Math.ceil(schedulesNumber / 6);
    var currentPage = this.state.currentSchedule/6;
    console.log(this.state.selectedPage*6);
    console.log((this.state.selectedPage + 1) *6);

    for(var i = (this.state.selectedPage*6);
        i < this.props.schedules.length &&
        i < ((this.state.selectedPage + 1) *6) ;i++){
      console.log("adding");
      schedules.push(<ScheduleThumbnail key={i} w={100} h={50} groups={this.props.schedules[i].groups}/>) }
    return (
      <div className="ui segment row">
      <div className="image-pager">
        <div className="ui segment tertiary schedules"> {schedules} </div>
        <PagerMenu pages={pages} selected={this.state.selectedPage} onPageChange={this.changePage}/>
      </div>
      </div>
    );
  },

  changePage: function (page) {
    _selectedPage = page;
    this._onChange();
    console.log(this.state);
  }

});

module.exports = SchedulesPager;
