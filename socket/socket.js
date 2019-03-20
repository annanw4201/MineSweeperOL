var socketIO = require('socket.io');

module.exports.listen = function(server) {
    const io = socketIO.listen(server);

    io.on('connection', function(socket) {
        console.log('A user connected');
        socket.on('disconnect', function() {
          console.log('A user disconnected');
        });
    });
};