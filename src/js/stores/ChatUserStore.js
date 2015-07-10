var AppDispatcher = require('../dispatcher/AppDispatcher');
var ChatConstants = require('../constants/ChatConstants');

var EventEmitter = require('events').EventEmitter;
var assign = require('object-assign');

var CHANGE_EVENT = 'user-change';

var _user = {
    loggedIn: false,
    name: ''
};
var _connection, _room;

/**
 * Login to chat server.
 * @param  {string} name
 */
function attemptLoginToChat(name) {
    console.log('ChatUserStore::attemptLoginToChat');
    _user = {
        loggedIn: true,
        name: name
    };

    var params = {
        'roomId': _room,
        'userName': _user.name,
        'action': 'connect'
    };
    _connection.send(JSON.stringify(params));
}

var ChatUserStore = assign({}, EventEmitter.prototype, {

    get: function() {
        return _user;
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
     * @param connection
     */
    setConnection: function(connection) {
        _connection = connection;
    },

    /**
     * @param room
     */
    setRoom: function(room) {
        _room = room;
    }

});

// Register callback to handle all updates
AppDispatcher.register(function(action) {
    var name, message;

    switch(action.actionType) {
        case ChatConstants.CHAT_ATTEMPT_LOGIN:
            console.log('ChatUserStore::login');
            name = action.userName.trim();
            if (name !== '') {
                attemptLoginToChat(name);
                ChatUserStore.emitChange();
            }
            break;

        default:
    }
});


module.exports = ChatUserStore;