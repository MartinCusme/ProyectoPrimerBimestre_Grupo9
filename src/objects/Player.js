import Phaser from 'phaser';

export default class Player extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, x, y) {
        super(scene, x, y, 'player_tex');
        // Aqui agregar el sprite a la escena y al sistema de fisica
        // scene.add.existing(this);
        // scene.physics.add.existing(this);

        // Aqui configurar propiedades del sprite del jugador:
        // - Escalar a 0.35
        // - Ajustar hitbox al tamano del sprite
        // - Activar colision con los bordes del mundo
        // - Establecer rebote de 0.1

        // Aqui configurar los controles de teclado:
        // - Crear cursor keys (flechas de direccion)
        // - Agregar tecla SPACE para disparar
    }

    updateMobile(mobileLeft, mobileRight, mobileJump) {
        // Aqui implementar el movimiento del jugador:
        // - Si se presiona izquierda (teclado o movil):
        //     - Velocidad X = -250
        //     - Voltear sprite a la izquierda (flipX = true)
        // - Si se presiona derecha (teclado o movil):
        //     - Velocidad X = 250
        //     - Voltear sprite a la derecha (flipX = false)
        // - Si no se presiona nada:
        //     - Velocidad X = 0

        // Aqui implementar el salto:
        // - Si se presiona arriba (teclado) o boton saltar (movil)
        //   Y el jugador esta tocando el suelo (body.touching.down):
        //     - Velocidad Y = -450
    }
}
