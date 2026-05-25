import Phaser from 'phaser';

export default class InstructionsScene extends Phaser.Scene {
    constructor() {
        super('InstructionsScene');
    }

    create() {
        // Aqui configurar fondo negro
        // this.cameras.main.setBackgroundColor('#000000');

        // Aqui mostrar titulo "INSTRUCCIONES" centrado arriba

        // Aqui dibujar linea divisoria vertical en el centro (x=400, de y=80 a y=500)

        // LADO IZQUIERDO: Objetivo
        // Aqui mostrar seccion "OBJETIVO:" con los siguientes puntos:
        // - Sobrevive 50 segundos
        // - Derrota al Jefe Final
        // - Esquiva las babosas
        // - Recoge frutas (+10 pts)
        // - Mata babosas (+1 pt)

        // Aqui mostrar seccion "PUNTAJE:" con:
        // - Fruta = +10 puntos
        // - Babosa = +1 punto

        // LADO DERECHO: Controles
        // Aqui mostrar seccion "CONTROLES:" con subsecciones:
        
        // TECLADO:
        // - Flechas izquierda/derecha para mover
        // - Flecha arriba para saltar
        // - ESPACIO para disparar
        // - P para pausar

        // MOVIL:
        // - Botones en pantalla

        // Aqui crear boton interactivo "VOLVER AL MENU" en la parte inferior
        // - Al hacer click, volver a 'MainMenu'
    }
}
