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
    action.actionType === SubjectConstants.SUBJECT_SELECT ||
    action.actionType === SubjectConstants.SUBJECT_SELECT_TEACHER ||
    action.actionType === SubjectConstants.SUBJECT_SELECT_GROUPS ||
    action.actionType === SubjectConstants.PROFESSION_SET
  ){
    setTimeout( function(){
      var subjects = SubjectStore.getAll();
      var profession = SubjectStore.getProfession();
      var url = ScheduleUtils.generateScheduleURL(subjects,profession.code);
      $.ajax({
        url: "http://bogota.nomeroben.com/api/v1.0/schedule/" + url,
        dataType: 'json',
        success: ScheduleStore.update.bind(null, subjects)
      });
    },300);

  }

});

module.exports = ScheduleStore;
