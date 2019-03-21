let config = {
    type: Phaser.AUTO,
    parent: 'phaser-mineSweeper',
    width: 800,
    height: 600,
    scene: {
        preload: preload,
        create: create,
        update: update
    }
};

let game = new Phaser.Game(config);

function preload() {
    console.log('preload');
}

function create() {
    console.log('create');
    this.socket = io();
    this.socket.on('currentPlayer', function (players) {
        console.log(players);
        var htmlStr = "";
        Object.keys(players).forEach(element => {
            htmlStr = htmlStr + '<li>' + players[element].name + '</li>';
        });
        $('#players_display').html(htmlStr);
    });
    this.socket.on('newPlayer', function(player) {
        console.log(player);
        $('#players_display').append('<li>' + player.name + '</i>');
    });
}

function update() {
    
}