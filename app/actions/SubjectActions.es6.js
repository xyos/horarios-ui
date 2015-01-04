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
  }

};

module.exports = SubjectActions;