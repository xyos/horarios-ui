var Dispatcher = require('flux/lib/Dispatcher');
var assign = require('object-assign');
var copyProperties = require('react/lib/Object.assign');

var AppDispatcher = copyProperties(new Dispatcher(), {
  handleServerAction: function(action) {
    var payload = {
      source: 'SERVER_ACTION',
      action: action
    };
    this.dispatch(payload);
  },
  /**
   * A bridge function between the views and the dispatcher, marking the action
   * as a view action.  Another variant here could be handleServerAction.
   * @param  {object} action The data coming from the view.
   */
  handleViewAction: function(action) {
    this.dispatch({
      source: 'VIEW_ACTION',
      action: action
    });
  }

});

module.exports = AppDispatcher;