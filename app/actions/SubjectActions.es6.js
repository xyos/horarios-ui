var AppDispatcher = require('../AppDispatcher');
var SubjectConstants = require('constants/SubjectConstants');

var SubjectActions = {

  addSubject : subject => {
    AppDispatcher.handleViewAction({
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
  selectGroup : group => {
    AppDispatcher.handleViewAction({
      actionType : SubjectConstants.SUBJECT_SELECT_GROUP,
      group : group
    });
  }

};

module.exports = SubjectActions;