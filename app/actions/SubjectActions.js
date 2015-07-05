var AppDispatcher = require('../AppDispatcher');
var SubjectConstants = require('../constants/SubjectConstants');

var SubjectActions = {

  addSubject : subject => {
    AppDispatcher.handleServerAction({
      actionType : SubjectConstants.SUBJECT_ADD,
      subject : subject
    });
  },
  destroy : id => {
    AppDispatcher.handleViewAction({
      actionType : SubjectConstants.SUBJECT_DELETE,
      id : id
    });
  },
  select : id => {
    AppDispatcher.handleViewAction({
      actionType : SubjectConstants.SUBJECT_SELECT,
      id : id
    });
  },
  selectTeacher : teacher => {
    AppDispatcher.handleViewAction({
      actionType : SubjectConstants.SUBJECT_SELECT_TEACHER,
      teacher : teacher
    });
  },
  selectGroup : group => {
    AppDispatcher.handleViewAction({
      actionType : SubjectConstants.SUBJECT_SELECT_GROUP,
      group : group
    });
  },
  setGroupsSelection : groups => {
    AppDispatcher.handleViewAction({
      actionType : SubjectConstants.SUBJECT_SELECT_GROUPS,
      group : groups
    });
  },
  loadRaw : subjects => {
    AppDispatcher.handleServerAction({
      actionType : SubjectConstants.SUBJECT_LOAD,
      subjects : subjects
    });
  },
  setProfession : profession => {
    AppDispatcher.handleViewAction({
      actionType : SubjectConstants.PROFESSION_SET,
      profession : profession
    });
  },
  setProfessionType : pregrado => {
    AppDispatcher.handleViewAction({
      actionType : SubjectConstants.PROFESSION_SET_TYPE,
      pregrado : pregrado
    });
  }
};

module.exports = SubjectActions;
