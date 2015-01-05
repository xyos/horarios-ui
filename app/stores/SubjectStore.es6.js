var AppDispatcher = require('../AppDispatcher');
var SubjectConstants = require('constants/SubjectConstants');
var EventEmitter = require('events').EventEmitter;
var assign = require('object-assign');
var StringUtils = require('../utils/String');
var $ = require('jquery');
var ScheduleActions = require('../actions/ScheduleActions');

var CHANGE_EVENT = 'change';

var _subjects = {};

var SubjectStore = assign({}, EventEmitter.prototype, {

  init: function(rawSubjects) {
    _subjects = rawSubjects;
  },

  emitChange: function() {
    //ScheduleActions.update(_subjects);
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
    return _subjects[id];
  },

  getAll: function() {
    return _subjects;
  },

  setRaw: function(subjects){
    _subjects = subjects;
    SubjectStore.emitChange();
  },

  getCredits: function() {
    var credits = 0;
    for(var key in _subjects){
      credits += _subjects[key].credits;
    }
    return credits;
  },

  add: function(subject,data){
    var groups = data.groups;
    var name = StringUtils.humanize(data.name);
    for (var i = 0, len = groups.length; i<len; i++){
      groups[i].selected = true;
      if(groups[i].teacher.trim() === ""){
        groups[i].teacher = "No Asignado";
      } else {
        groups[i].teacher = StringUtils.humanize(groups[i].teacher);
      }
    }
    _subjects[subject.id] = {
      id: subject.id,
      name: name,
      selected: true,
      groups: data.groups,
      type: data.type,
      credits: data.credits
    };
    console.log(_subjects);
    SubjectStore.emitChange();
  }

});

SubjectStore.dispatchToken = AppDispatcher.register(function(payload){
  console.log(payload);
  var action = payload.action;
  switch(action.actionType) {

    case SubjectConstants.SUBJECT_ADD:
      $.ajax({
        url: "http://bogota.nomeroben.com/api/v1.0/subject/" + action.subject.id,
        dataType: 'json',
        success: SubjectStore.add.bind(null, action.subject)
      });
      break;

    case SubjectConstants.SUBJECT_LOAD:
      SubjectStore.setRaw(action.subjects);
      break;

    case SubjectConstants.SUBJECT_DELETE:
      delete _subjects[action.id];
      SubjectStore.emitChange();
      break;

    case SubjectConstants.SUBJECT_SELECT:
      var groups = _subjects[action.id].groups;
      _subjects[action.id].selected = !_subjects[action.id].selected;
      for (var i = 0, len = groups.length; i<len; i++){
        groups[i].selected = _subjects[action.id].selected;
      }
      console.log(_subjects);
      SubjectStore.emitChange();
      break;

    case SubjectConstants.SUBJECT_SELECT_GROUPS:
      for(var i = 0; i < action.group.groups.length; i++){
        var code = action.group.groups[i].props.group.code;
        for(var group in _subjects[action.group.subject].groups){
          if(_subjects[action.group.subject].groups[group].code == code){
            _subjects[action.group.subject].groups[group].selected =action.group.selected;
          }
        }
      }
      SubjectStore.emitChange();
      break;

    case SubjectConstants.SUBJECT_SELECT_GROUP:

      _subjects[action.group.subject].groups[action.group.group - 1].selected =
        !_subjects[action.group.subject].groups[action.group.group - 1].selected;
      SubjectStore.emitChange();
      break;

    default:
      // do nothing
  }
});

module.exports = SubjectStore;