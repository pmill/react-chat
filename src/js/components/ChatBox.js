var React = require('react');
var ReactPropTypes = React.PropTypes;
var ChatActions = require('../actions/ChatActions');
var ChatMessageInput = require('./ChatMessageInput');
var ChatMessageList = require('./ChatMessageList');
var ChatLogin = require('./ChatLogin');
var ChatMessageStore = require('../stores/ChatMessageStore');
var ChatUserStore = require('../stores/ChatUserStore');

/**
 * Retrieve the current chat data from the ChatMessageStore
 */
function getChatBoxState() {
    return {
        allMessages: ChatMessageStore.getAll(),
        user: ChatUserStore.get()
    };
}

var ChatBox = React.createClass({

    propTypes: {
        url: ReactPropTypes.string.isRequired,
        room: ReactPropTypes.string.isRequired
    },

    getInitialState: function() {
        return getChatBoxState();
    },

    componentDidMount: function() {
        ChatMessageStore.addChangeListener(this._onMessagesChange);
        ChatUserStore.addChangeListener(this._onUserChange);

        ChatMessageStore.setRoom(this.props.room);
        ChatUserStore.setRoom(this.props.room);

        var conn = new WebSocket(this.props.url);
        conn.onerror = function(e) {
            console.log(e);
        };
        ChatMessageStore.setConnection(conn);
        ChatUserStore.setConnection(conn);
    },

    componentWillUnmount: function() {
        ChatMessageStore.removeChangeListener(this._onMessagesChange);
        ChatUserStore.removeChangeListener(this._onUserChange);
    },

    /**
     * @return {object}
     */
    render: function() {
        if (this.state.user.loggedIn) {
            return (
                <div className="chatBox ui middle aligned center aligned grid">
                    <div className="column">
                        <ChatMessageList allMessages={this.state.allMessages} currentUser={this.state.user} />
                        <ChatMessageInput onSave={this._onMessageSubmitted} />
                    </div>
                </div>
            );
        }
        else {
            return (
                <div className="chatBox">
                    <ChatLogin onSave={this._onNameSubmitted} room={this.props.room} />
                </div>
            );
        }
    },

    _onMessagesChange: function() {
        console.log('ChatBox::_onMessageChange');
        this.setState(getChatBoxState());
    },

    _onUserChange: function() {
        console.log('ChatBox::_onUserChange');
        this.setState(getChatBoxState());
    },

    _onMessageSubmitted: function(text) {
        console.log('ChatBox::_onMessageSubmitted');
        if (text.trim()){
            ChatActions.messageSubmitted(text);
        }
    },

    _onNameSubmitted: function(text) {
        console.log('ChatBox::_onNameSubmitted');
        if (text.trim()){
            ChatActions.nameSubmitted(text);
        }
    }

});

module.exports = ChatBox;