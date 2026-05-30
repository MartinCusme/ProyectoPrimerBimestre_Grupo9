export default class CollisionManager {
    constructor(scene) {
        // Guardamos una referencia a la escena principal para poder usar sus funciones
        this.scene = scene;
    }

    // Reglas para que las cosas no se caigan de la pantalla
    setupEnvironmentCollisions(player, platforms, slugs, fruits) {
        this.scene.physics.add.collider(player, platforms);
        this.scene.physics.add.collider(slugs, platforms);
        this.scene.physics.add.collider(fruits, platforms);
    }

    // Reglas de interacciones (superposiciones)
    setupOverlaps(player, bullets, slugs, fruits) {
        // Disparo mata babosa (llama a la función hitSlug de la escena)
        this.scene.physics.add.overlap(bullets, slugs, this.scene.hitSlug, null, this.scene);
        
        // Jugador come fruta (llama a collectFruit)
        this.scene.physics.add.overlap(player, fruits, this.scene.collectFruit, null, this.scene);
        
        // Enemigo toca jugador (llama a loseLife en vez de gameOver directo)
        this.scene.physics.add.overlap(player, slugs, this.scene.loseLife, null, this.scene);
    }

    // Reglas exclusivas para cuando aparece el jefe final
    setupBossCollisions(player, boss, platforms, bullets) {
        this.scene.physics.add.collider(boss, platforms);
        this.scene.physics.add.overlap(player, boss, this.scene.loseLife, null, this.scene);
        this.scene.physics.add.overlap(bullets, boss, this.scene.hitBoss, null, this.scene);
    }
}