var React = require('react');
var ReactPropTypes = React.PropTypes;

var ENTER_KEY_CODE = 13;

var ChatLogin = React.createClass({

    propTypes: {
        id: ReactPropTypes.string,
        onSave: ReactPropTypes.func.isRequired,
        value: ReactPropTypes.string,
        room: ReactPropTypes.string.isRequired
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
            <div className="chatLogin ui middle aligned center aligned grid">
                <div className="column">
                    <h2 className="ui teal image header">
                        <div className="content">Log-in to chat room "{this.props.room}"</div>
                    </h2>
                    <div className="ui large form">
                        <div className="ui segment">
                            <div className="field">
                                <div className="ui action input">
                                    <input
                                        id={this.props.id}
                                        placeholder="Enter your name..."
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
            </div>
        );
    },

    /**
     * Invokes the callback passed in as onSave, allowing this component to be
     * used in different ways.
     */
    _save: function() {
        console.log('ChatLogin::_save');
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
            console.log('ChatLogin::_onKeyDown');
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

module.exports = ChatLogin;