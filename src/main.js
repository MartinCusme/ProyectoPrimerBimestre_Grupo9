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
        // Aqui configuracion de escalado para dispositivos moviles
        // mode: ...
        // autoCenter: ...
    },
    physics: {
        default: 'arcade',
        arcade: {
            // Aqui configuracion de gravedad del mundo
            // gravity: { y: ... },
            // debug: ...
        }
    },
    // Aqui registrar todas las escenas del juego: BootScene, MainMenu, GameScene, InstructionsScene
    scene: []
};

// Aqui inicializar la instancia del juego Phaser con la configuracion
// const game = new Phaser.Game(config);
