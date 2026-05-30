import Phaser from 'phaser';

export default class Player extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, x, y) {
        super(scene, x, y, 'player_tex');
        scene.add.existing(this);
        scene.physics.add.existing(this);

        this.setScale(0.35); 
        this.body.setSize(this.width, this.height); 
        
        this.setCollideWorldBounds(true);
        this.setBounce(0.1);

        this.cursors = scene.input.keyboard.createCursorKeys();
        this.spaceBar = scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
    }

    updateMobile(mobileLeft, mobileRight, mobileJump) {
        if (this.cursors.left.isDown || mobileLeft) {
            this.setVelocityX(-250); 
            this.setFlipX(true); // <--- NUEVO: Voltea el sprite a la izquierda
        } else if (this.cursors.right.isDown || mobileRight) {
            this.setVelocityX(250);
            this.setFlipX(false); // <--- NUEVO: Lo devuelve a la derecha
        } else {
            this.setVelocityX(0);
        }

        // Detecta si está tocando el suelo real antes de saltar
        if ((this.cursors.up.isDown || mobileJump) && this.body.touching.down) {
            this.setVelocityY(-450);
        }
    }
}