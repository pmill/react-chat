var React = require('react');
var ReactPropTypes = React.PropTypes;
var ChatActions = require('../actions/ChatActions');

var cx = require('react/lib/cx');

var ChatMessage = React.createClass({

    propTypes: {
        message: ReactPropTypes.object.isRequired
    },

    /**
     * @return {object}
     */
    render: function() {
        var message = this.props.message;
        var isUserMessage = message.from;
        var className = 'chatMessage '+(isUserMessage ? 'user' : 'notification')+' '+(message.isOwnedByCurrentUser ? 'ownedByMe ' : '');

        if (isUserMessage) {
            return (
                <li className={className} key={message.id}>
                    <strong>{message.from.name}</strong><br />
                    <label>{message.text}</label>
                </li>
            );
        }
        else {
            return (
                <li className={className} key={message.id}>
                    <label>{message.text}</label>
                </li>
            );
        }
    }

});

module.exports = ChatMessage;