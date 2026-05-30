// Pantalla de pausa: muestra/oculta el texto "PAUSA" y detiene/reanuda la física
export default class PauseScreen {
    constructor(scene) {
        this.scene = scene;
        this.isPaused = false;

        // Texto grande de "PAUSA" centrado, oculto al inicio
        this.pauseText = scene.add.text(400, 300, 'PAUSA', {
            fontSize: '64px', fill: '#fff', backgroundColor: '#000'
        }).setOrigin(0.5).setDepth(20).setVisible(false);

        // Botón para volver al menú principal (oculto al inicio)
        this.menuBtn = scene.add.text(400, 380, 'VOLVER AL MENÚ', {
            fontSize: '24px', fill: '#fff', backgroundColor: '#ff0000', padding: { x: 10, y: 5 }
        }).setOrigin(0.5).setDepth(20).setVisible(false).setInteractive()
            .on('pointerdown', () => {
                scene.time.paused = false;
                scene.physics.resume();
                scene.sound.stopAll();
                scene.scene.start('MainMenu');
            });
    }

    // Alterna entre pausar y reanudar
    toggle() {
        this.isPaused = !this.isPaused;

        if (this.isPaused) {
            this.scene.physics.pause();
            this.scene.time.paused = true; // Detiene timers (spawns, contador)
            this.scene.sound.pauseAll();
            this.pauseText.setVisible(true);
            if (this.menuBtn) this.menuBtn.setVisible(true);
        } else {
            this.scene.physics.resume();
            this.scene.time.paused = false;
            this.scene.sound.resumeAll();
            this.pauseText.setVisible(false);
            if (this.menuBtn) this.menuBtn.setVisible(false);
        }
    }
}
