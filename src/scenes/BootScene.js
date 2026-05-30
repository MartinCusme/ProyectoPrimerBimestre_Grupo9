import Phaser from 'phaser';

import playerImg from '../assets/player.png';
import babosaImg from '../assets/babosa.png';
import abejaImg from '../assets/abeja.png';
import frutaImg from '../assets/fruta.png';
import frutaEspecialImg from '../assets/fruta_especial.png';
import bossImg from '../assets/boss.png';
import disparoImg from '../assets/disparo.png';
import bgImg from '../assets/background.png';
import corazonImg from '../assets/corazon.png';

import izqImg from '../assets/izq.png';
import derImg from '../assets/der.png';
import jumpImg from '../assets/saltar.png';
import shootImg from '../assets/disparar.png';
import gameoverImg from '../assets/gameover.png';
import victoryImg from '../assets/victory.png';
import reintentarImg from '../assets/reintentar.png';
import menuImg from '../assets/menu.png';

import bgmAudio from '../audio/musica.mp3'; 
import bgm2Audio from '../audio/musica2.mp3'; 
import shootAudio from '../audio/disparo.mp3';
import collectAudio from '../audio/collect2.mp3';
import powerupAudio from '../audio/powerup.mp3';
import dieAudio from '../audio/die.mp3';
import uwilldieAudio from '../audio/uwilldie.mp3';
import extralifeAudio from '../audio/extralife.mp3';

export default class BootScene extends Phaser.Scene {
    constructor() {
        super('BootScene');
    }

    preload() {
        this.load.image('player_tex', playerImg);
        this.load.image('babosa_tex', babosaImg);
        this.load.image('abeja_tex', abejaImg);
        this.load.image('fruta_tex', frutaImg);
        this.load.image('fruta_especial_tex', frutaEspecialImg);
        this.load.image('boss_tex', bossImg);
        this.load.image('disparo_tex', disparoImg);
        this.load.image('background_tex', bgImg);
        this.load.image('corazon_tex', corazonImg);
        
        this.load.audio('bgm', bgmAudio);
        this.load.audio('bgm2', bgm2Audio);
        this.load.audio('shoot_sfx', shootAudio);
        this.load.audio('collect_sfx', collectAudio);
        this.load.audio('powerup_sfx', powerupAudio);
        this.load.audio('die_sfx', dieAudio);
        this.load.audio('uwilldie_sfx', uwilldieAudio);
        this.load.audio('extralife_sfx', extralifeAudio);

        this.load.image('izq_btn', izqImg);
        this.load.image('der_btn', derImg);
        this.load.image('jump_btn', jumpImg);
        this.load.image('shoot_btn', shootImg);
        this.load.image('gameover_tex', gameoverImg);
        this.load.image('victory_tex', victoryImg);
        this.load.image('reintentar_btn', reintentarImg);
        this.load.image('menu_btn', menuImg);
    }

    create() {
        this.scene.start('MainMenu');
    }
}