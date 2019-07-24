const io     = require('socket.io-client');
const prompt = require('prompt');
const socket = io.connect('ws://localhost:777');

let userName;
let messages = [];

const consoleColor = "\x1b[32m";

const authSchema = {
    properties: {
        name: {
            pattern: /^[a-zA-Zа-яА-Я\s\-]+$/,
            description: 'Enter your username',
            message: 'Name must be only letters, spaces, or dashes',
            required: true
        },
    }
};

const messageSchema = {
    properties: {
        message: {
            pattern: /^[\d\D\s\-]+$/,
            description: 'Write your message',
            message: 'Message must be only letters, spaces, or dashes',
            required: true
        },
    }
};

socket.on('connect', function () {

    prompt.start();

    prompt.get(authSchema, function (err, result) {
        writeMessage('Command-line chat is running:');
        writeMessage(result.name);

        userName = result.name;

        sendMessage();
    });

    function sendMessage() {
        prompt.get(messageSchema, function (err, result) {
            socket.emit('sendMessage', `from ${userName}: ${result.message}`);
            sendMessage();
        });
    }

    socket.on("sendMessage", function (data) {
        messages.push(data);
        console.clear();
        writeMessage(messages.join('\r\n'))
    });
});

function writeMessage(message) {
    console.log(consoleColor, message);
}
