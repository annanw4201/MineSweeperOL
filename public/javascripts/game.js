let config = {
    type: Phaser.AUTO,
    parent: 'game',
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
    this.load.tilemapTiledJSON('map', 'assets/map/tilesheet.json');
    this.load.image('tiles', 'assets/map/tilesheet.png', { frameWidth: 100, frameHeight: 100 });
    this.load.image('sky', 'assets/map/sky.png');
}

function create() {
    console.log('create');
    this.add.image(400, 300, 'sky');
    const map = this.make.tilemap({key: "map", tileWidth: 100, tileHeight: 100});
    const tileSet = map.addTilesetImage("tilesheet", "tiles");
    var layer;
    for (let i = 0; i < map.layers.length; ++i) {
        layer = map.createStaticLayer(i, tileSet, 100, 0);
    }
    
    
    socketSetup();
}

function update() {
    
}

function socketSetup() {
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