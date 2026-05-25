import Phaser from 'phaser';

// Aqui importar todos los assets de imagenes
// import playerImg from '../assets/player.png';
// import babosaImg from '../assets/babosa.png';
// import frutaImg from '../assets/fruta.png';
// import bossImg from '../assets/boss.png';
// import disparoImg from '../assets/disparo.png';
// import bgImg from '../assets/background.png';

// Aqui importar las imagenes de botones tactiles
// import izqImg from '../assets/izq.png';
// import derImg from '../assets/der.png';
// import jumpImg from '../assets/saltar.png';
// import shootImg from '../assets/disparar.png';
// import gameoverImg from '../assets/gameover.png';
// import victoryImg from '../assets/victory.png';
// import reintentarImg from '../assets/reintentar.png';
// import menuImg from '../assets/menu.png';

// Aqui importar los archivos de audio
// import bgmAudio from '../audio/musica.mp3'; 
// import bgm2Audio from '../audio/musica2.mp3'; 
// import shootAudio from '../audio/disparo.mp3';
// import collectAudio from '../audio/collect2.mp3';

export default class BootScene extends Phaser.Scene {
    constructor() {
        super('BootScene');
    }

    preload() {
        // Aqui cargar todas las texturas de sprites del juego
        // this.load.image('player_tex', playerImg);
        // this.load.image('babosa_tex', babosaImg);
        // this.load.image('fruta_tex', frutaImg);
        // this.load.image('boss_tex', bossImg);
        // this.load.image('disparo_tex', disparoImg);
        // this.load.image('background_tex', bgImg);

        // Aqui cargar los efectos de sonido y musica
        // this.load.audio('bgm', bgmAudio);
        // this.load.audio('bgm2', bgm2Audio);
        // this.load.audio('shoot_sfx', shootAudio);
        // this.load.audio('collect_sfx', collectAudio);

        // Aqui cargar las imagenes de los botones tactiles y pantallas finales
        // this.load.image('izq_btn', izqImg);
        // this.load.image('der_btn', derImg);
        // this.load.image('jump_btn', jumpImg);
        // this.load.image('shoot_btn', shootImg);
        // this.load.image('gameover_tex', gameoverImg);
        // this.load.image('victory_tex', victoryImg);
        // this.load.image('reintentar_btn', reintentarImg);
        // this.load.image('menu_btn', menuImg);
    }

    create() {
        // Aqui transicion al menu principal despues de cargar los assets
        // this.scene.start('MainMenu');
    }
}
