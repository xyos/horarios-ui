var AppDispatcher = require('../AppDispatcher');
var SubjectConstants = require('constants/SubjectConstants');
var EventEmitter = require('events').EventEmitter;
var assign = require('object-assign');
var $ = require('jquery');

var CHANGE_EVENT = 'change';

var _subjects = {};

var SubjectStore = assign({}, EventEmitter.prototype, {

  init: function(rawSubjects) {
    _subjects = rawSubjects;
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
    return _subjects[id];
  },

  getAll: function() {
    return _subjects;
  },

  getCredits: function() {
    var credits = 0;
    for(var key in _subjects){
      credits += _subjects[key].credits;
    }
    return credits;
  },

  add: function(subject,data){
    _subjects[subject.id] = {
      id: subject.id,
      name: subject.title,
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

    case SubjectConstants.SUBJECT_DELETE:
      delete _subjects[action.id];
      SubjectStore.emitChange();
    default:
      // do nothing
  }
});

module.exports = SubjectStore;