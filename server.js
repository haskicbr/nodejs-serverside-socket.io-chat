const app  = require('express')();
const http = require('http').Server(app);
const io   = require('socket.io')(http);


io.on('connection', function (socket) {

    console.info('New client connected (id=' + socket.id + ').');

    socket.on('sendMessage', function (msg) {
        io.emit('sendMessage', msg);
    });
});

http.listen(777, function () {
    console.log('listening on *:777');
});
