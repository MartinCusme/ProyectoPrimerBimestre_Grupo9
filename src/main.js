import Phaser from 'phaser';
import BootScene from './scenes/BootScene.js';
import MainMenu from './scenes/MainMenu.js';
import GameScene from './scenes/GameScene.js';
import InstructionsScene from './scenes/InstructionsScene.js';

const config = {
    type: Phaser.AUTO,
    width: 800,
    height: 600,
    parent: 'game-container',
    scale: {
        mode: Phaser.Scale.FIT, // Escala automáticamente en móviles
        autoCenter: Phaser.Scale.CENTER_BOTH
    },
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 500 },
            debug: false
        }
    },
    scene: [BootScene, MainMenu, GameScene, InstructionsScene] // Añadimos MainMenu
};

const game = new Phaser.Game(config);