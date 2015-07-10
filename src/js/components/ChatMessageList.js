var React = require('react');
var ReactPropTypes = React.PropTypes;
var ChatMessage = require('./ChatMessage');

var ChatMessageList = React.createClass({

    propTypes: {
        allMessages: ReactPropTypes.object.isRequired,
        currentUser: ReactPropTypes.object.isRequired
    },

    /**
     * @return {object}
     */
    render: function() /*object*/ {
        if (Object.keys(this.props.allMessages).length < 1) {
            return null;
        }

        var allMessages = this.props.allMessages;
        var messages = [];

        console.log('Current user:');
        console.log(this.props.currentUser);

        for (var key in allMessages) {
            allMessages[key].isOwnedByCurrentUser = (allMessages[key].from && allMessages[key].from.name == this.props.currentUser.name);

            console.log('Message:');
            console.log(allMessages[key]);

            messages.push(<ChatMessage key={key} message={allMessages[key]} />);
        }

        return (
            <section className="chatMessageList">
                <ul class="chatMessageList">{messages}</ul>
            </section>
        );
    }

});

module.exports = ChatMessageList;