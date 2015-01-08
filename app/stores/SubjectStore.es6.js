var AppDispatcher = require('../AppDispatcher');
var SubjectConstants = require('constants/SubjectConstants');
var EventEmitter = require('events').EventEmitter;
var assign = require('object-assign');
var StringUtils = require('../utils/String');
var $ = require('jquery');
var Colors = require('../constants/Colors');
var CHANGE_EVENT = 'change';

var _professions = [];
var _subjects = {};
var _availableColors = [];
var _currentProfession = {code: '', name: ''};

for(var color in Colors){
  _availableColors.push(color);
}
var SubjectStore = assign({}, EventEmitter.prototype, {

  setProfessions : function(){
    $.ajax({
      url: "http://bogota.nomeroben.com/api/v1.0/professions/",
      dataType: 'json',
      success: function(data){
        _professions = data;
        SubjectStore.emit(CHANGE_EVENT);
      }
    });

  },

  init: function(rawSubjects) {
    _subjects = rawSubjects;
  },

  emitChange: function() {
    //ScheduleActions.update(_subjects);
    this.emit(CHANGE_EVENT);
  },

  getProfessions:function() {
    return _professions;
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

  getAvailableColors: function(){
    return _availableColors;
  },

  getTeacher: function(subject,group) {
    var groups = _subjects[subject].groups;
    for(var i = 0; i< groups.length; i++){
      if(groups[i].code == group){
        return groups[i].teacher;
      }
    }
    return "No Asignado";
  },

  getProfession: function(){
    return _currentProfession
  },

  setRaw: function(raw){
    _subjects = raw.subjects;
    _availableColors = raw.colors;
    _currentProfession = raw.profession;
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
    var teachers = {};
    for (var i = 0, len = groups.length; i<len; i++){
      groups[i].selected = true;
      if(groups[i].teacher.trim() === ""){
        groups[i].teacher = "No Asignado";
      } else {
        groups[i].teacher = StringUtils.humanize(groups[i].teacher);
      }
      if(teachers[groups[i].teacher] === undefined){
        teachers[groups[i].teacher] = {
          name: groups[i].teacher,selected :true,
          groups : []
        };
      }
      teachers[groups[i].teacher].groups.push(groups[i].code);
    }
    var color = _availableColors.splice((Math.floor(Math.random() * _availableColors.length)),1)[0];
    _subjects[subject.id] = {
      id: subject.id,
      name: name,
      selected: true,
      groups: data.groups,
      type: data.type,
      credits: data.credits,
      color: Colors[color],
      teachers: teachers
    };
    SubjectStore.emitChange();
  }

});

SubjectStore.dispatchToken = AppDispatcher.register(function(payload){
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
      var color = _subjects[action.id].color;
      _availableColors.push(color.name);
      delete _subjects[action.id];
      SubjectStore.emitChange();
      break;

    case SubjectConstants.SUBJECT_SELECT:
      var groups = _subjects[action.id].groups;
      _subjects[action.id].selected = !_subjects[action.id].selected;
      for (var i = 0, len = groups.length; i<len; i++){
        groups[i].selected = _subjects[action.id].selected;
      }
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

    case SubjectConstants.SUBJECT_SELECT_TEACHER:
      for(var i = 0; i < action.teacher.groups.length; i++){
        var code = action.teacher.groups[i];
        var subject = action.teacher.subject;
        for(var group in _subjects[subject].groups){
          if(_subjects[subject].groups[group].code == code){
            _subjects[subject].groups[group].selected = action.teacher.selected;
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

    case SubjectConstants.PROFESSION_SET:
      _currentProfession = action.profession;
      SubjectStore.emitChange();
      break;

    default:
      // do nothing
  }
});

module.exports = SubjectStore;