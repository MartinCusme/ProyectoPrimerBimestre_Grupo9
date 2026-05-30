import Phaser from 'phaser';

export default class InstructionsScene extends Phaser.Scene {
    constructor() {
        super('InstructionsScene');
    }

    create() {
        // Fondo negro
        this.cameras.main.setBackgroundColor('#000000');

        // Título
        this.add.text(250, 30, 'INSTRUCCIONES', { fontSize: '28px', fill: '#ff0000' });

        // Línea divisoria en el centro
        let line = this.add.graphics();
        line.lineStyle(2, 0xff0000);
        line.lineBetween(400, 80, 400, 500);

        // --- LADO IZQUIERDO: Objetivo ---
        this.add.text(50, 90, 'OBJETIVO:', { fontSize: '22px', fill: '#ff0000' });
        this.add.text(50, 125, '• Tienes 5 vidas', { fontSize: '16px', fill: '#fff' });
        this.add.text(50, 150, '• Sobrevive 50 segundos', { fontSize: '16px', fill: '#fff' });
        this.add.text(50, 175, '• Derrota al Jefe Final', { fontSize: '16px', fill: '#fff' });
        this.add.text(50, 200, '• Esquiva enemigos', { fontSize: '16px', fill: '#fff' });
        this.add.text(50, 225, '• Recoge frutas (+10 pts)', { fontSize: '16px', fill: '#fff' });
        this.add.text(50, 250, '• Mata enemigos (+1 pt)', { fontSize: '16px', fill: '#fff' });

        this.add.text(50, 290, 'NIVELES:', { fontSize: '22px', fill: '#ff0000' });
        this.add.text(50, 320, '• Nivel 1: Babosas + 1 Jefe', { fontSize: '16px', fill: '#fff' });
        this.add.text(50, 345, '• Nivel 2: Abejas + 2 Jefes', { fontSize: '16px', fill: '#fff' });

        this.add.text(50, 385, 'POWER-UP:', { fontSize: '22px', fill: '#ff0000' });
        this.add.text(50, 415, '• Fruta verde = +10 puntos', { fontSize: '16px', fill: '#fff' });
        this.add.text(50, 440, '• Fruta amarilla = disparo triple', { fontSize: '16px', fill: '#fff' });
        this.add.text(50, 465, '• Corazón = +1 vida (cada 30s)', { fontSize: '16px', fill: '#fff' });

        // --- LADO DERECHO: Controles ---
        this.add.text(450, 90, 'CONTROLES:', { fontSize: '22px', fill: '#ff0000' });

        this.add.text(450, 140, 'TECLADO:', { fontSize: '18px', fill: '#ff0000' });
        this.add.text(450, 170, '← →  Mover', { fontSize: '16px', fill: '#fff' });
        this.add.text(450, 200, '↑  Saltar', { fontSize: '16px', fill: '#fff' });
        this.add.text(450, 230, 'ESPACIO  Disparar', { fontSize: '16px', fill: '#fff' });
        this.add.text(450, 260, 'P  Pausar', { fontSize: '16px', fill: '#fff' });

        this.add.text(450, 310, 'MÓVIL:', { fontSize: '18px', fill: '#ff0000' });
        this.add.text(450, 340, 'Botones en pantalla', { fontSize: '16px', fill: '#fff' });

        // Botón volver
        this.add.text(300, 530, 'VOLVER AL MENÚ', { fontSize: '22px', fill: '#ff0000' })
            .setInteractive()
            .on('pointerdown', () => {
                this.scene.start('MainMenu');
            });
    }
}
