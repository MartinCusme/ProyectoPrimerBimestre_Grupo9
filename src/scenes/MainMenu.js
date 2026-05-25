import Phaser from 'phaser';
import StorageManager from '../managers/StorageManager.js';

export default class MainMenu extends Phaser.Scene {
    constructor() {
        super('MainMenu');
    }

    create() {
        // Aqui mostrar el titulo del juego: 'EL ATAQUE DE LAS BABOSAS'
        // this.add.text(250, 150, 'EL ATAQUE DE LAS BABOSAS', { fontSize: '24px', fill: '#000' });

        // Aqui crear boton interactivo "INICIAR JUEGO" que inicie la GameScene
        // - Crear texto interactivo en posicion (320, 240)
        // - Al hacer click, ejecutar this.scene.start('GameScene')

        // Aqui crear boton interactivo "INSTRUCCIONES" que lleve a InstructionsScene
        // - Crear texto interactivo en posicion (320, 280)
        // - Al hacer click, ejecutar this.scene.start('InstructionsScene')

        // Aqui mostrar los mejores puntajes (top 3) desde StorageManager
        // - Obtener scores con StorageManager.getScores().slice(0, 3)
        // - Si hay puntajes, mostrar cada uno con formato: "1. nombre - puntuacion"
        // - Si no hay puntajes, mostrar "Sin puntajes aun"
    }
}
