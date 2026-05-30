export default class StorageManager {
    // Guarda un puntaje con nombre en el top 3
    static saveScore(name, score) {
        let scores = this.getScores();
        scores.push({ name: name, score: score });
        scores.sort((a, b) => b.score - a.score);
        scores = scores.slice(0, 3);
        localStorage.setItem('phaser_scores', JSON.stringify(scores));
    }

    // Lee los puntajes guardados
    static getScores() {
        let data = localStorage.getItem('phaser_scores');
        return data ? JSON.parse(data) : [];
    }

    // Guarda si el sonido está muteado
    static saveMute(isMuted) {
        localStorage.setItem('phaser_mute', JSON.stringify(isMuted));
    }

    // Lee si el sonido estaba muteado
    static getMute() {
        let data = localStorage.getItem('phaser_mute');
        return data ? JSON.parse(data) : false;
    }

    // Guarda el nivel alcanzado
    static saveLevel(level) {
        localStorage.setItem('phaser_level', JSON.stringify(level));
    }

    // Lee el nivel alcanzado
    static getLevel() {
        let data = localStorage.getItem('phaser_level');
        return data ? JSON.parse(data) : 1;
    }
}