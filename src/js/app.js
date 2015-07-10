var $ = require('jQuery');
var React = require('react');
var ChatBox = require('./components/ChatBox');

React.render(
    <ChatBox url="ws://localhost:9911" room="room1" />,
    document.getElementById('chatbox')
);