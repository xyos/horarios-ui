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
    ScheduleStore.emitChange();
  },
  setCurrent(id){
    _currentSchedule = id;
    ScheduleStore.emitChange();
  },
  getCurrent() {
    return _currentSchedule;
  },

  setRaw: function(schedules){
    _schedules = schedules;
    ScheduleStore.emitChange();
  },

  update: function(subjects,data){
    //TODO: set color
    _schedules = data;
    ScheduleStore.emitChange();
  }

});

ScheduleStore.dispatchToken = AppDispatcher.register(function(payload){
  var action = payload.action;

  switch(action.actionType) {

    case ScheduleConstants.SCHEDULE_SET_CURRENT:
      ScheduleStore.setCurrent(action.id);
      break;
    default :
      break;
  }

  AppDispatcher.waitFor([SubjectStore.dispatchToken]);
  if(action.actionType === SubjectConstants.SUBJECT_ADD||
    action.actionType === SubjectConstants.SUBJECT_DELETE||
    action.actionType === SubjectConstants.SUBJECT_SELECT_GROUP||
    action.actionType === SubjectConstants.SUBJECT_SELECT
  ){
    setTimeout( function(){
      var subjects = SubjectStore.getAll();
      var url = ScheduleUtils.generateScheduleURL(subjects);
      $.ajax({
        url: "http://bogota.nomeroben.com/api/v1.0/schedule/" + url,
        dataType: 'json',
        success: ScheduleStore.update.bind(null, subjects)
      });
    },300);

  }
  //switch(action.actionType) {
  //
  //  default:
  //
  //}
});

module.exports = ScheduleStore;