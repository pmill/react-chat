var React = require('react');
var ReactPropTypes = React.PropTypes;

var ENTER_KEY_CODE = 13;

var ChatMessageInput = React.createClass({

    propTypes: {
        id: ReactPropTypes.string,
        onSave: ReactPropTypes.func.isRequired,
        value: ReactPropTypes.string
    },

    getInitialState: function() {
        return {
            value: this.props.value || ''
        };
    },

    /**
     * @return {object}
     */
    render: function() /*object*/ {
        return (
            <div className="chatMessage__input">
                <div className="ui large form">
                    <div className="ui segment">
                        <div className="field">
                            <div className="ui action input">
                                <input
                                    id={this.props.id}
                                    placeholder="Type and press the enter key to send..."
                                    onChange={this._onChange}
                                    onKeyDown={this._onKeyDown}
                                    value={this.state.value}
                                    autoFocus={true}
                                />
                                <button className="ui icon button" onClick={this._onClick}>
                                    <i className="chevron right icon"></i>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    },

    /**
     * Invokes the callback passed in as onSave, allowing this component to be
     * used in different ways.
     */
    _save: function() {
        console.log('ChatMessageInput::_save');
        this.props.onSave(this.state.value);
        this.setState({
            value: ''
        });
    },

    /**
     * @param {object} event
     */
    _onChange: function(/*object*/ event) {
        this.setState({
            value: event.target.value
        });
    },

    /**
     * @param  {object} event
     */
    _onKeyDown: function(event) {
        if (event.keyCode === ENTER_KEY_CODE) {
            console.log('ChatMessageInput::_onKeyDown');
            console.log('Enter key pressed');
            this._save();
        }
    },

    /**
     * @param  {object} event
     */
    _onClick: function(event) {
        console.log('ChatLogin::_onClick');
        this._save();
    }

});

module.exports = ChatMessageInput;