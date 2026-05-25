// Pantalla de pausa: muestra/oculta el texto "PAUSA" y detiene/reanuda la fisica
export default class PauseScreen {
    constructor(scene) {
        this.scene = scene;
        this.isPaused = false;

        // Aqui crear el texto grande "PAUSA" centrado en pantalla
        // - Posicion: (400, 300), centrado con setOrigin(0.5)
        // - Estilo: fontSize 64px, color blanco, fondo negro
        // - Profundidad (depth) alta para que se vea encima de todo
        // - Oculto al inicio con setVisible(false)
    }

    // Alterna entre pausar y reanudar
    toggle() {
        // Aqui implementar la logica de pausa/reanudacion:
        // - Alternar this.isPaused
        // - Si se pausa:
        //     - Pausar la fisica del juego
        //     - Pausar todos los sonidos
        //     - Mostrar el texto de "PAUSA"
        // - Si se reanuda:
        //     - Reanudar la fisica
        //     - Reanudar todos los sonidos
        //     - Ocultar el texto de "PAUSA"
    }
}
