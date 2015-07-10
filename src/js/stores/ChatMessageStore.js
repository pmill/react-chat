var AppDispatcher = require('../dispatcher/AppDispatcher');
var ChatConstants = require('../constants/ChatConstants');

var EventEmitter = require('events').EventEmitter;
var assign = require('object-assign');

var CHANGE_EVENT = 'change';

var _messages = {};
var _connection, _room;

/**
 * Create a message.
 * @param  {string} message The content of the Chat
 */
function chatMessageReceived(from, message) {
    console.log('ChatMessageStore::chatMessageReceived');
    var id = (+new Date() + Math.floor(Math.random() * 999999)).toString(36);
    _messages[id] = {
        id: id,
        text: message,
        from: from
    };
}

/**
 * @param from
 */
function displayUserTypingMessage(from) {
    _messages[id] = {
        id: 'userTyping'+from.name.replace(' ',''),
        text: from.name + ' is typing...',
        from: from
    };
}

/**
 * @param from
 */
function removeUserTypingMessage(from) {
    var id = 'userTyping' + from.name.replace(' ', '');
    delete _messages[id];
}

/**
 * @param message
 */
function submitChatMessage(message) {
    var d = new Date();
    var params = {
        'message': message,
        'action': 'message',
        'timestamp': d.getTime()/1000
    };
    _connection.send(JSON.stringify(params));
}

var ChatMessageStore = assign({}, EventEmitter.prototype, {

    /**
     * Get the entire collection of TODOs.
     * @return {object}
     */
    getAll: function() {
        return _messages;
    },

    emitChange: function() {
        console.log('ChatMessageStore::emitChange');
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
        _connection.onmessage = function(e) {
            console.log('ChatMessageStore::onmessage');
            console.log(e);

            var data = JSON.parse(e.data);

            if (data.hasOwnProperty('message') && data.hasOwnProperty('from')) {
                chatMessageReceived(data.from, data.message);
            }
            else if (data.hasOwnProperty('message')) {
                chatMessageReceived(null, data.message);
            }
            else if (data.hasOwnProperty('type')) {
                if (data.type == 'list-users' && data.hasOwnProperty('clients')) {
                    chatMessageReceived(null, 'There are ' + data.clients.length + ' users connected');
                }
                else if (data.type == 'user-started-typing') {
                    displayUserTypingMessage(data.from)
                }
                else if (data.type == 'user-stopped-typing') {
                    removeUserTypingMessage(data.from);
                }
            }

            ChatMessageStore.emitChange();
        };
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
        case ChatConstants.CHAT_MESSAGE_SUBMITTED:
            console.log('ChatMessageStore::messageSubmitted');
            message = action.message.trim();
            if (message !== '') {
                submitChatMessage(message);
            }
            break;

        default:
    }
});


module.exports = ChatMessageStore;