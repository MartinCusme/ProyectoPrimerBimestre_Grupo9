import Phaser from 'phaser';
import Player from '../objects/Player.js';
import CollisionManager from '../physics/CollisionManager.js';
import StorageManager from '../managers/StorageManager.js';
import PauseScreen from '../ui/PauseScreen.js';

export default class GameScene extends Phaser.Scene {
    constructor() {
        super('GameScene');
    }

    // Recibe datos al iniciar (ej: nivel)
    init(data) {
        this.level = (data && data.level) || 1;
        // Preserva las vidas entre niveles (si vienen del nivel 1)
        this.startingLives = (data && data.lives) ? data.lives : 5;
    }

    create() {
        this.score = 0;
        this.timeLeft = 50;
        this.bossSpawned = false;

        // Asegurar que el timer funciona (fix: si se volvió del menú estando en pausa)
        this.time.paused = false;

        // Flag para saber si el juego ya terminó (victoria/gameOver)
        this.gameEnded = false;

        // Sistema de vidas (conserva las del nivel anterior)
        this.lives = this.startingLives;
        this.isInvulnerable = false;

        // Power-up (disparo triple)
        this.powerUp = false;

        // Contador de bosses vivos
        this.bossesAlive = 0;

        // Contador de frutas especiales (max 2 en nivel 2)
        this.specialFruitCount = 0;

        this.collisionManager = new CollisionManager(this);
        
        this.input.addPointer(2); // Permite usar dos dedos en la pantalla táctil

        this.mobileLeft = false;
        this.mobileRight = false;
        this.mobileJump = false;

        this.add.image(0, 0, 'background_tex').setOrigin(0, 0).setDisplaySize(800, 600);

        // Iniciar la música normal
        if (!this.sound.get('bgm')) {
            this.bgMusic = this.sound.add('bgm', { loop: true, volume: 0.4 });
            this.bgMusic.play();
        } else if (!this.sound.get('bgm').isPlaying) {
            this.sound.get('bgm').play();
        }

        this.platforms = this.physics.add.staticGroup();
        this.platforms.create(400, 580, 'player_tex').setScale(20, 1).refreshBody().setVisible(false);

        this.player = new Player(this, 100, 400);

        this.bullets = this.physics.add.group();
        this.slugs = this.physics.add.group();
        this.fruits = this.physics.add.group();

        // Destruir balas al salir de la pantalla
        this.physics.world.on('worldbounds', (body) => {
            if (body.gameObject && body.gameObject.active) body.gameObject.destroy();
        });

        this.collisionManager.setupEnvironmentCollisions(this.player, this.platforms, this.slugs, this.fruits);
        this.collisionManager.setupOverlaps(this.player, this.bullets, this.slugs, this.fruits);

        // HUD
        this.scoreText = this.add.text(16, 16, 'Puntuación: 0', { fontSize: '32px', fill: '#000' }).setDepth(10);
        this.timeText = this.add.text(16, 50, 'Tiempo Boss: 50s', { fontSize: '32px', fill: '#ff0000' }).setDepth(10);

        // Corazones de vida (uno por cada vida)
        this.hearts = [];
        for (let i = 0; i < this.lives; i++) {
            let heart = this.add.image(40 + i * 70, 130, 'corazon_tex').setScale(0.7).setDepth(10);
            this.hearts.push(heart);
        }

        this.levelText = this.add.text(350, 50, 'Nivel: ' + this.level, { fontSize: '24px', fill: '#000' }).setDepth(10);

        // Cargar estado de mute guardado
        this.sound.mute = StorageManager.getMute();

        this.muteBtn = this.add.text(700, 16, 'Mute', { fontSize: '20px', fill: this.sound.mute ? '#ff0000' : '#000' }).setDepth(10)
            .setInteractive()
            .on('pointerdown', () => {
                this.sound.mute = !this.sound.mute;
                this.muteBtn.setColor(this.sound.mute ? '#ff0000' : '#000');
                StorageManager.saveMute(this.sound.mute);
            });

        this.bossHealthBar = this.add.graphics().setDepth(9);

        // --- LOS 4 BOTONES TÁCTILES SEPARADOS ---
        this.createMobileControls();

        this.fruitTimer = this.time.addEvent({ delay: 3000, callback: this.spawnFruit, callbackScope: this, loop: true });

        // Corazón de vida cae cada 30 segundos
        this.heartTimer = this.time.addEvent({ delay: 30000, callback: this.spawnHeartItem, callbackScope: this, loop: true });

        // Nivel 1: babosas en el suelo | Nivel 2: babosas + abejas voladoras
        if (this.level === 1) {
            this.slugTimer = this.time.addEvent({ delay: 1200, callback: this.spawnSlug, callbackScope: this, loop: true });
        } else {
            this.slugTimer = this.time.addEvent({ delay: 800, callback: this.spawnSlug, callbackScope: this, loop: true });
            this.beeTimer = this.time.addEvent({ delay: 700, callback: this.spawnBee, callbackScope: this, loop: true });
            // En nivel 2, cae una fruta especial cada 15 segundos (máximo 2)
            this.specialTimer = this.time.addEvent({ delay: 15000, callback: this.spawnSpecialFruit, callbackScope: this, loop: true });
        }

        this.time.addEvent({ delay: 1000, callback: this.updateTimer, callbackScope: this, loop: true });

        // Pausa con tecla P
        this.pauseScreen = new PauseScreen(this);
        this.pauseKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.P);

        // Pausar automáticamente cuando se cambia de pestaña / pierde foco la ventana
        this.game.events.on('blur', this.handleBlur, this);
        this.events.once('shutdown', () => {
            this.game.events.off('blur', this.handleBlur, this);
        });
    }

    handleBlur() {
        if (!this.pauseScreen.isPaused && this.player && this.player.active && !this.gameEnded) {
            this.pauseScreen.toggle();
        }
    }

    createMobileControls() {
        // Botón Izquierda
        let btnIzq = this.add.image(60, 520, 'izq_btn').setInteractive().setDepth(10);
        btnIzq.on('pointerdown', () => this.mobileLeft = true);
        btnIzq.on('pointerup', () => this.mobileLeft = false);

        // Botón Derecha
        let btnDer = this.add.image(160, 520, 'der_btn').setInteractive().setDepth(10);
        btnDer.on('pointerdown', () => this.mobileRight = true);
        btnDer.on('pointerup', () => this.mobileRight = false);

        // Botón EXCLUSIVO de Saltar
        let btnSaltar = this.add.image(600, 520, 'jump_btn').setInteractive().setDepth(10);
        btnSaltar.on('pointerdown', () => this.mobileJump = true);
        btnSaltar.on('pointerup', () => this.mobileJump = false);

        // Botón EXCLUSIVO de Disparar
        let btnDisparar = this.add.image(700, 520, 'shoot_btn').setInteractive().setDepth(10);
        btnDisparar.on('pointerdown', () => this.shoot());

        // Botón de pausa táctil
        let btnPausa = this.add.text(550, 16, 'PAUSA', { fontSize: '20px', fill: '#000' }).setDepth(10)
            .setInteractive()
            .on('pointerdown', () => {
                if (!this.gameEnded) this.pauseScreen.toggle();
            });
    }

    update() {
        if (!this.player.active) return;
        if (this.gameEnded) return;

        // Tecla P para pausar/reanudar
        if (Phaser.Input.Keyboard.JustDown(this.pauseKey)) {
            this.pauseScreen.toggle();
        }

        if (this.pauseScreen.isPaused) return;

        this.player.updateMobile(this.mobileLeft, this.mobileRight, this.mobileJump);

        if (Phaser.Input.Keyboard.JustDown(this.player.spaceBar)) {
            this.shoot();
        }

        // Dibujar barras de vida de los bosses
        if (this.bossSpawned) {
            this.drawBossHealthBar();
            // Solo en nivel 1 el boss persigue al jugador
            if (this.level === 1 && this.boss && this.boss.active) {
                this.physics.moveToObject(this.boss, this.player, 100);
            }
            // Nivel 2: boss1 persigue, boss2 rebota DVD (rebote es automático)
            if (this.level === 2 && this.boss1 && this.boss1.active) {
                this.physics.moveToObject(this.boss1, this.player, 100);
            }
        }
    }

    drawBossHealthBar() {
        this.bossHealthBar.clear();

        // Dibujar barra de vida encima de cada boss activo
        let bosses = this.bossList || [];
        bosses.forEach(boss => {
            if (boss && boss.active) {
                this.bossHealthBar.fillStyle(0x000000, 1);
                this.bossHealthBar.fillRect(boss.x - 60, boss.y - 80, 120, 14);
                let w = (boss.hp / boss.maxHp) * 116;
                this.bossHealthBar.fillStyle(0xff0000, 1);
                this.bossHealthBar.fillRect(boss.x - 58, boss.y - 78, w, 10);
            }
        });
    }

    shoot() {
        this.sound.play('shoot_sfx', { volume: 0.3 });

        let direction = this.player.flipX ? -500 : 500; 

        // Bala normal (siempre)
        let bullet = this.bullets.create(this.player.x, this.player.y, 'disparo_tex');
        bullet.body.allowGravity = false;
        bullet.setScale(0.3); 
        bullet.setVelocityX(direction);
        bullet.body.checkWorldBounds = true;
        bullet.body.onWorldBounds = true;

        // Power-up: 2 balas extra en diagonal
        if (this.powerUp) {
            let b2 = this.bullets.create(this.player.x, this.player.y, 'disparo_tex');
            b2.body.allowGravity = false;
            b2.setScale(0.3);
            b2.setVelocity(direction, -150);
            b2.body.checkWorldBounds = true;
            b2.body.onWorldBounds = true;

            let b3 = this.bullets.create(this.player.x, this.player.y, 'disparo_tex');
            b3.body.allowGravity = false;
            b3.setScale(0.3);
            b3.setVelocity(direction, 150);
            b3.body.checkWorldBounds = true;
            b3.body.onWorldBounds = true;
        }
    }

    // Nivel 1: babosas caminan por el suelo
    spawnSlug() {
        if (this.bossSpawned) return;
        let x = Phaser.Math.Between(300, 800);
        let slug = this.slugs.create(x, 100, 'babosa_tex');
        slug.setScale(0.3); 
        slug.setBounce(0.4);
        slug.setVelocityX(-60);
    }

    // Nivel 2: abejas vuelan en horizontal (de derecha a izquierda)
    spawnBee() {
        if (this.bossSpawned) return;
        // Vuelan entre el aire medio y la altura de la bala del jugador (no más alto)
        let y = Phaser.Math.Between(330, 430);
        let bee = this.slugs.create(800, y, 'abeja_tex');
        bee.setScale(0.5);
        bee.body.allowGravity = false;
        bee.setVelocityX(-150);
    }

    spawnFruit() {
        let x = Phaser.Math.Between(50, 750);
        let fruit = this.fruits.create(x, 100, 'fruta_tex');
        fruit.setScale(0.4); 
        fruit.setBounce(0.2);

        // La fruta desaparece sola después de 4 segundos (aprox 2 en el suelo)
        this.time.delayedCall(4000, () => {
            if (fruit && fruit.active) fruit.destroy();
        });
    }

    // Fruta especial (power-up) - cae cada 15 segundos en nivel 2
    spawnSpecialFruit() {
        if (this.bossSpawned) return;
        this.specialFruitCount++;

        let x = Phaser.Math.Between(100, 700);
        let special = this.fruits.create(x, 100, 'fruta_especial_tex');
        special.setScale(0.6);
        special.setBounce(0.2);
        special.isSpecial = true; // Marca para saber que es especial

        this.time.delayedCall(6000, () => {
            if (special && special.active) special.destroy();
        });
    }

    // Corazón de vida que cae cada 30s, recoger suma 1 vida (tope: 5)
    spawnHeartItem() {
        if (this.bossSpawned) return;
        let x = Phaser.Math.Between(100, 700);
        let heartItem = this.fruits.create(x, 100, 'corazon_tex');
        heartItem.setScale(0.8);
        heartItem.setBounce(0.2);
        heartItem.isHeart = true; // Marca para saber que es corazón

        this.time.delayedCall(8000, () => {
            if (heartItem && heartItem.active) heartItem.destroy();
        });
    }

    hitSlug(bullet, slug) {
        bullet.destroy();
        // Las abejas dan 2 puntos, las babosas dan 1
        let points = (slug.texture.key === 'abeja_tex') ? 2 : 1;
        slug.destroy();
        this.score += points;
        this.scoreText.setText('Puntuación: ' + this.score + (this.powerUp ? ' ⚡' : ''));
    }

    hitBoss(boss, bullet) {
        bullet.disableBody(true, true); 
        bullet.destroy();

        if (boss.isInvulnerable) return;

        boss.hp--;
        boss.isInvulnerable = true;
        boss.setTint(0xff0000);

        this.time.delayedCall(300, () => {
            if (boss && boss.active) {
                boss.clearTint();
                boss.isInvulnerable = false;
            }
        });

        if (boss.hp <= 0) {
            boss.destroy();
            this.bossesAlive--;

            // Si ya no quedan bosses, victoria
            if (this.bossesAlive <= 0) {
                this.bossHealthBar.clear();
                this.victory(); 
            }
        }
    }

    collectFruit(player, fruit) {
        let isSpecial = fruit.isSpecial;
        let isHeart = fruit.isHeart;
        fruit.destroy();
        this.sound.play('collect_sfx', { volume: 0.5 });

        if (isHeart) {
            // Sumar 1 vida (máximo 5)
            if (this.lives < 5) {
                this.sound.play('extralife_sfx', { volume: 0.2 });
                this.lives++;
                let newHeart = this.add.image(40 + (this.lives - 1) * 70, 130, 'corazon_tex').setScale(0.7).setDepth(10);
                this.hearts.push(newHeart);
            }
        } else if (isSpecial) {
            // Power-up: dispara 3 balas durante 7 segundos
            this.powerUp = true;
            this.sound.play('powerup_sfx', { volume: 0.6 });
            this.scoreText.setText('Puntuación: ' + this.score + ' ⚡');

            // El power-up dura 7 segundos
            this.time.delayedCall(7000, () => {
                this.powerUp = false;
                this.scoreText.setText('Puntuación: ' + this.score);
            });
        } else {
            this.score += 10;
            this.scoreText.setText('Puntuación: ' + this.score + (this.powerUp ? ' ⚡' : ''));
        }
    }

    // Pierde una vida al tocar un enemigo
    loseLife() {
        if (this.isInvulnerable || this.gameEnded) return;

        this.lives--;
        this.sound.play('die_sfx', { volume: 0.5 });

        // Quita el último corazón visible
        let heart = this.hearts.pop();
        if (heart) heart.destroy();

        if (this.lives <= 0) {
            this.gameOver();
            return;
        }

        // Invulnerable por 2 segundos (el jugador parpadea)
        this.isInvulnerable = true;
        this.player.setAlpha(0.5);

        this.time.delayedCall(2000, () => {
            this.isInvulnerable = false;
            if (this.player.active) this.player.setAlpha(1);
        });
    }

    updateTimer() {
        if (!this.player.active || this.bossesAlive > 0) return; 

        if (this.timeLeft > 0) {
            this.timeLeft--;
            this.timeText.setText('Tiempo Boss: ' + this.timeLeft + 's');

            // Aviso "you will die" 2 seg antes del boss en nivel 2
            if (this.level === 2 && this.timeLeft === 2 && !this.uwillPlayed) {
                this.uwillPlayed = true;
                this.sound.play('uwilldie_sfx', { volume: 0.7 });
            }
        } else if (!this.bossSpawned) {
            this.spawnBoss();
        }
    }

    spawnBoss() {
        this.bossSpawned = true;
        this.slugTimer.remove();
        if (this.beeTimer) this.beeTimer.remove();
        if (this.specialTimer) this.specialTimer.remove();
        if (this.heartTimer) this.heartTimer.remove();
        this.timeText.setText('¡JEFE FINAL!');
        
        // --- CAMBIO A MÚSICA 2 ---
        if (this.sound.get('bgm')) this.sound.get('bgm').stop();
        this.sound.play('bgm2', { loop: true, volume: 0.5 });

        if (this.level === 1) {
            // Nivel 1: un boss que persigue al jugador (empieza arriba)
            this.boss = this.physics.add.sprite(400, 50, 'boss_tex');
            this.boss.setScale(1.3); 
            this.boss.setCollideWorldBounds(true);
            // Hitbox ajustada (60% del sprite, centrada)
            this.boss.body.setSize(this.boss.width * 0.6, this.boss.height * 0.6);
            this.boss.body.setOffset(this.boss.width * 0.2, this.boss.height * 0.2);
            this.boss.isInvulnerable = false;
            this.boss.hp = 20;
            this.boss.maxHp = 20;
            this.bossesAlive = 1;
            this.bossList = [this.boss];

            this.collisionManager.setupBossCollisions(this.player, this.boss, this.platforms, this.bullets);
        } else {
            // Nivel 2: dos bosses con comportamientos distintos (empiezan arriba)
            // Boss1: persigue al jugador (como nivel 1)
            this.boss1 = this.physics.add.sprite(250, 50, 'boss_tex');
            this.boss1.setScale(1);
            this.boss1.setCollideWorldBounds(true);
            this.boss1.body.setSize(this.boss1.width * 0.6, this.boss1.height * 0.6);
            this.boss1.body.setOffset(this.boss1.width * 0.2, this.boss1.height * 0.2);
            this.boss1.isInvulnerable = false;
            this.boss1.hp = 15;
            this.boss1.maxHp = 15;
            this.boss1.behavior = 'chase';

            // Boss2: rebota como DVD por toda la pantalla
            this.boss2 = this.physics.add.sprite(550, 50, 'boss_tex');
            this.boss2.setScale(1);
            this.boss2.setCollideWorldBounds(true);
            this.boss2.setBounce(1, 1);
            this.boss2.body.allowGravity = false;
            this.boss2.setVelocity(-120, 130);
            this.boss2.body.setSize(this.boss2.width * 0.6, this.boss2.height * 0.6);
            this.boss2.body.setOffset(this.boss2.width * 0.2, this.boss2.height * 0.2);
            this.boss2.isInvulnerable = false;
            this.boss2.hp = 15;
            this.boss2.maxHp = 15;
            this.boss2.behavior = 'dvd';

            this.bossesAlive = 2;
            this.bossList = [this.boss1, this.boss2];

            this.collisionManager.setupBossCollisions(this.player, this.boss1, this.platforms, this.bullets);
            this.collisionManager.setupBossCollisions(this.player, this.boss2, this.platforms, this.bullets);
        }
    }

    // Pide un nombre válido (solo letras/números/espacios, max 10 chars)
    askValidName(message) {
        let name = window.prompt(message);
        // Si cancela o está vacío
        if (name === null) return null;
        name = name.trim();
        // Validación: entre 1 y 10 caracteres, solo letras, números o espacios
        while (name.length === 0 || name.length > 10 || !/^[a-zA-Z0-9 ]+$/.test(name)) {
            name = window.prompt('Nombre inválido. Usa solo letras y números (1-10 caracteres):');
            if (name === null) return null;
            name = name.trim();
        }
        return name;
    }

    victory() {
        if (this.gameEnded) return;
        this.gameEnded = true;
        this.physics.pause();
        if (this.sound.get('bgm2')) this.sound.get('bgm2').stop();

        this.slugTimer.remove();
        if (this.beeTimer) this.beeTimer.remove();
        if (this.specialTimer) this.specialTimer.remove();
        if (this.heartTimer) this.heartTimer.remove();
        this.fruitTimer.remove(); 

        if (this.level === 1) {
            // Nivel 1 completado: guardar y pasar al nivel 2
            StorageManager.saveLevel(2);
            this.add.text(250, 250, '¡NIVEL 1 COMPLETADO!', { fontSize: '32px', fill: '#ff0000' }).setDepth(10);
            this.add.text(280, 300, 'Siguiente nivel...', { fontSize: '24px', fill: '#000' }).setDepth(10);

            this.time.delayedCall(2500, () => {
                this.sound.stopAll();
                this.scene.restart({ level: 2, lives: this.lives });
            });
        } else {
            // Victoria final del juego
            StorageManager.saveLevel(2);
            this.add.image(400, 250, 'victory_tex').setDepth(10);
            let name = this.askValidName('¡Ganaste! Escribe tu nombre:');
            if (name) StorageManager.saveScore(name, this.score);
            
            this.add.image(400, 400, 'menu_btn').setScale(0.18)
                .setDepth(10)
                .setInteractive()
                .on('pointerdown', () => {
                    this.sound.stopAll();
                    this.scene.start('MainMenu');
                });
        }
    }

    gameOver() {
        if (this.gameEnded) return;
        this.gameEnded = true;
        this.player.setActive(false).setVisible(false);
        this.physics.pause(); 
        
        // Pausar música cuando pierdes
        if (this.sound.get('bgm')) this.sound.get('bgm').pause();
        if (this.sound.get('bgm2')) this.sound.get('bgm2').pause();
        
        this.slugTimer.remove(); 
        if (this.beeTimer) this.beeTimer.remove();
        if (this.specialTimer) this.specialTimer.remove();
        if (this.heartTimer) this.heartTimer.remove();
        this.fruitTimer.remove(); 
        let name = this.askValidName('Game Over. Escribe tu nombre:');
        if (name) StorageManager.saveScore(name, this.score);

        this.add.image(400, 250, 'gameover_tex').setDepth(10);

        // Botones centrados: reintentar a la izquierda, menú a la derecha
        this.add.image(330, 330, 'reintentar_btn').setScale(0.5).setDepth(10)
            .setInteractive()
            .on('pointerdown', () => {
                this.sound.stopAll();
                this.scene.restart({ level: this.level });
            });

        this.add.image(530, 330, 'menu_btn').setScale(0.18).setDepth(10)
            .setInteractive()
            .on('pointerdown', () => {
                this.sound.stopAll();
                this.scene.start('MainMenu');
            });
    }
}