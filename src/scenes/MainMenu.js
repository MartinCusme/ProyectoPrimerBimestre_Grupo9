import Phaser from 'phaser';
import StorageManager from '../managers/StorageManager.js';

export default class MainMenu extends Phaser.Scene {
    constructor() {
        super('MainMenu');
    }

    create() {
        this.add.text(250, 150, 'EL ATAQUE DE LAS BABOSAS', { fontSize: '24px', fill: '#000' });
        
        let startBtn = this.add.text(320, 240, 'INICIAR JUEGO', { fontSize: '20px', fill: '#ff0000' })
            .setInteractive()
            .on('pointerdown', () => {
                this.scene.start('GameScene');
            });

        // Instrucciones de controles
        this.add.text(320, 280, 'INSTRUCCIONES', { fontSize: '20px', fill: '#ff0000' }) // Color azul para diferenciar
            .setInteractive()
            .on('pointerdown', () => {
                this.scene.start('InstructionsScene');
            });
        // Mostrar mejores puntajes (top 3)
        this.add.text(300, 370, 'MEJORES PUNTAJES:', { fontSize: '20px', fill: '#ff0000' });

        let scores = StorageManager.getScores().slice(0, 3);
        if (scores.length > 0) {
            scores.forEach((entry, i) => {
                this.add.text(300, 400 + (i * 28), (i + 1) + '. ' + entry.name + ' - ' + entry.score, { fontSize: '18px', fill: '#ff0000' });
            });
        } else {
            this.add.text(300, 400, 'Sin puntajes aún', { fontSize: '18px', fill: '#ff0000' });
        }
    }
}