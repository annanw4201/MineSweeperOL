

var socket = io();

let gameScene = new Phaser.Scene('Game');

let config = {
    type: Phaser.AUTO,
    parent: 'phaser-example',
    width: 800,
    height: 600,
    scene: gameScene
};

let game = new Phaser.Game(config);

function preload() {
    console.log('preload');
}

function create() {
    console.log('create');
}