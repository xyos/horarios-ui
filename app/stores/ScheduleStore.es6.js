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

  setRaw: function(schedules){
    _schedules = schedules;
    ScheduleStore.emitChange();
  },

  update: function(subjects,data){
    //TODO: set color
    _schedules = data;
    console.log(_schedules);
    ScheduleStore.emitChange();
  }

});

ScheduleStore.dispatchToken = AppDispatcher.register(function(payload){

  AppDispatcher.waitFor([SubjectStore.dispatchToken]);

  var action = payload.action;
  if(action.actionType === SubjectConstants.SUBJECT_ADD||
    action.actionType === SubjectConstants.SUBJECT_DELETE||
    action.actionType === SubjectConstants.SUBJECT_SELECT_GROUP||
    action.actionType === SubjectConstants.SUBJECT_SELECT
  ){
    var subjects = SubjectStore.getAll();
    var url = ScheduleUtils.generateScheduleURL(subjects);
    $.ajax({
      url: "http://bogota.nomeroben.com/api/v1.0/schedule/" + url,
      dataType: 'json',
      success: ScheduleStore.update.bind(null, subjects)
    });
  }
  //switch(action.actionType) {
  //
  //  default:
  //
  //}
});

module.exports = ScheduleStore;