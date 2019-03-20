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
    let socket = io();
    console.log('create');
}

function update() {
    
}