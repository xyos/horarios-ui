var AppDispatcher = require('../AppDispatcher');
var ScheduleConstants = require('../constants/ScheduleConstants');
var SubjectConstants = require('../constants/SubjectConstants');
var EventEmitter = require('events').EventEmitter;
var assign = require('object-assign');
var StringUtils = require('../utils/String');
var $ = require('jquery');
var ScheduleUtils = require('../utils/Schedule');
var SubjectStore = require('./SubjectStore');
var CHANGE_EVENT = 'change';

var _schedules = [];
var _currentSchedule = 0;
var _isBusy = false;
var _busyArray = [
    "01111111110111",
    "10111111101011",
    "11011111011101",
    "11101110111110",
    "11110101111111",
    "11111011111111"
];


var ScheduleStore = assign({}, EventEmitter.prototype, {

  init: function(rawSchedules) {
    _schedules = rawSchedules;
  },

  emitChange: function() {
    this.emit(CHANGE_EVENT);
  },

  /**
   * @param {function} callback
   */
  addChangeListener: function(callback) {
    this.on(CHANGE_EVENT, callback);
  },

  /**
   * @param {function} callback
   */
  removeChangeListener: function(callback) {
    var  side  = React.renderComponent(RightMenu({ message : "hello" }), document.getElementById('right-menu'));
    var  schedules = React.renderComponent(Schedules(), document.getElementById('schedules'));
    this.removeListener(CHANGE_EVENT, callback);
  },

  /**
   * @param {string} id
   */
  get: function(id) {
    return _schedules[id];
  },

  getAll: function() {
    return _schedules;
  },
  setCurrent(id){
    _currentSchedule = id;
    ScheduleStore.emitChange();
  },
  getCurrent() {
    return _currentSchedule;
  },
  getBusy: function(){
    return _isBusy;
  },
  setBusy: function(busy){
    _isBusy = busy;
    ScheduleStore.emitChange();
  },
  getBusyArray: function(){
    return _busyArray;
  },
  setBusyArrayItem: function(index,data){
    _busyArray[index] = data;
    ScheduleStore.emitChange();
  },
  setRaw: function(raw){
    _schedules = raw.schedules;
    _currentSchedule = raw.currentSchedule;
    ScheduleStore.emitChange();
  },

  update: function(subjects,data){
    _schedules = data;
    if(_currentSchedule > data.length){
        _currentSchedule = 0;
    } 
    for(var i in data){
        for(var j in _schedules[i].groups){
            var group = _schedules[i].groups[j];
            group.color = subjects[group.subject].color;
            group._schedule = [];
            for(var k=0;k<group.schedule.length;k++){
                group._schedule.push(ScheduleUtils.decimalToSchedString(group.schedule[k]).substring(7));
            }
        }
    }
    ScheduleStore.emitChange();
  }

});

ScheduleStore.dispatchToken = AppDispatcher.register(function(payload){
  var action = payload.action;

  switch(action.actionType) {
    case ScheduleConstants.SCHEDULE_LOAD:
      ScheduleStore.setRaw(action.schedules);
      break;
    case ScheduleConstants.SCHEDULE_SET_CURRENT:
      ScheduleStore.setCurrent(action.id);
      break;
    case ScheduleConstants.SCHEDULE_SET_BUSY:
      ScheduleStore.setBusy(action.busy);
      break;
    case ScheduleConstants.SCHEDULE_SET_BUSY_ITEM:
      ScheduleStore.setBusyArrayItem(action.busy.index,action.busy.value);
      break;
    default :
      break;
  }

  AppDispatcher.waitFor([SubjectStore.dispatchToken]);
  if(action.actionType === SubjectConstants.SUBJECT_ADD||
    action.actionType === SubjectConstants.SUBJECT_DELETE||
    action.actionType === SubjectConstants.SUBJECT_SELECT_GROUP||
    action.actionType === SubjectConstants.SUBJECT_SELECT ||
    action.actionType === SubjectConstants.SUBJECT_SELECT_TEACHER ||
    action.actionType === SubjectConstants.SUBJECT_SELECT_GROUPS ||
    action.actionType === SubjectConstants.PROFESSION_SET ||
    (action.actionType === ScheduleConstants.SCHEDULE_SET_BUSY  && _isBusy == false)
  ){
    var timeout = (action.actionType === SubjectConstants.SUBJECT_ADD) ? 1000: 10;
    setTimeout( function(){
      var subjects = SubjectStore.getAll();
      var profession = SubjectStore.getProfession();
      var url = ScheduleUtils.generateScheduleURL(subjects,profession.code);
      $.ajax({
        url: "http://bogota.nomeroben.com/api/v1.0/schedule/" + url,
        dataType: 'json',
        success: ScheduleStore.update.bind(null, subjects)
      });
    },timeout);

  }

});

module.exports = ScheduleStore;
