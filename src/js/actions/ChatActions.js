var AppDispatcher = require('../dispatcher/AppDispatcher');
var ChatConstants = require('../constants/ChatConstants');

var ChatActions = {

    /**
     * @param  {string} message
     */
    messageSubmitted: function(message) {
        console.log('ChatActions::messageSubmitted');
        AppDispatcher.dispatch({
            actionType: ChatConstants.CHAT_MESSAGE_SUBMITTED,
            message: message
        });
    },

    /**
     * @param  {string} name
     */
    nameSubmitted: function(name) {
        console.log('ChatActions::nameSubmitted');
        AppDispatcher.dispatch({
            actionType: ChatConstants.CHAT_ATTEMPT_LOGIN,
            userName: name
        });
    }

};

module.exports = ChatActions;