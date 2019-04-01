let config = {
    type: Phaser.AUTO,
    parent: 'game',
    width: 600,
    height: 600,
    scene: {
        preload: preload,
        create: create,
        update: update
    }
};
// create the game
let game = new Phaser.Game(config);
var pointer;
var map;
var minesList;

const hiddenTile = 25;
const star = 2;

function preload() {
    console.log('preload');
    this.load.tilemapTiledJSON('map', 'assets/map/tilesheet.json');
    this.load.image('tiles', 'assets/map/tilesheet.png', { frameWidth: 100, frameHeight: 100 });
    this.load.image('sky', 'assets/map/sky.png');
}

function create() {
    console.log('create');
    pointer = this.input.activePointer;
    this.add.image(400, 300, 'sky');
    map = this.make.tilemap({key: "map", tileWidth: 100, tileHeight: 100});
    const tileSet = map.addTilesetImage("tilesheet", "tiles");
    
    // create the dynamic layer (layerID, tileSet, x, y)
    var layer = map.createDynamicLayer(0, tileSet, 0, 0);
    // initialize board to be hidden
    for (let i = 0; i < map.width; ++i) {
        for (let j = 0; j < map.height; ++j) {
            map.putTileAt(hiddenTile, i, j);
        }
    }

    // randomize the mines indexex, and plant mines there
    const numberOfMines = 5;
    const totalCells = map.height * map.width;
    minesList = [];
    for (let i = 0; i < numberOfMines; ++i) {
        var index = Phaser.Math.Between(0, totalCells);
        minesList.push(index);
    }

    socketSetup();
}

function update() {

    if(pointer.isDown) {
        console.log("(x, y) -> " + pointer.x + " " + pointer.y);
        let tileX = Math.floor(pointer.x / 100);
        let tileY = Math.floor(pointer.y / 100);
        const tile = map.getTileAt(tileX, tileY);
        console.log("(tile.x, tile.y) -> " + tile.x + " " + tile.y);
        minesList.forEach(e => {
            if (tile.x + tile.y * 6 == e) {
                map.putTileAt(star, tileX, tileY);
            }
        });
        
    }
    
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