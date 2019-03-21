var player = require('../models/player');
var socketIO = require('socket.io');

var players = {};

module.exports.listen = function (server) {
    const io = socketIO.listen(server);

    io.on('connection', function (socket) {
        console.log('A user connected');

        players[socket.id] = new player('Player' + (Object.keys(players).length + 1), socket.id);

        // tell the current player about other players
        socket.emit('currentPlayer', players);

        // tell all the other players about a new player
        socket.broadcast.emit('newPlayer', players[socket.id]);

        socket.on('disconnect', function () {
            console.log('A user disconnected');

            // remove current player from players
            delete players[socket.id];

            // tell all players to remove current player
            io.emit('disconnect', socket.id);
        });
    });
};