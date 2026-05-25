# El Ataque de las Babosas

> Videojuego 2D tipo **Arcade Shooter / Plataforma** desarrollado con **Phaser.js** para la asignatura de Aplicaciones Web — Ingeniería en Software, Escuela Politécnica Nacional (EPN).

---

## Descripción

**El Ataque de las Babosas** es un videojuego de acción y plataformas en el que el jugador debe sobrevivir oleadas de enemigos (babosas y abejas), recolectar frutas para acumular puntos y enfrentarse a jefes finales para avanzar de nivel.

El juego cuenta con **2 niveles** con dificultad progresiva, sistema de vidas, power-ups, múltiples efectos de sonido, persistencia de datos y controles tanto para escritorio como para dispositivos móviles.

---

## Gameplay

### Objetivo

- Sobrevive durante **50 segundos** eliminando enemigos y recolectando frutas.
- Al terminar el tiempo, aparece el **Jefe Final**. ¡Derrótalo para avanzar al siguiente nivel!
- Tienes **5 vidas** iniciales. Si las pierdes todas, es **Game Over**.

### Niveles

| Nivel       | Enemigos                 | Jefe Final                                                    | Características especiales                             |
| ----------- | ------------------------ | ------------------------------------------------------------- | ------------------------------------------------------ |
| **Nivel 1** | Babosas (suelo)          | 1 Boss que persigue al jugador (20 HP)                        | Mecánicas básicas                                      |
| **Nivel 2** | Babosas + Abejas (vuelo) | 2 Bosses: uno persigue (15 HP) y otro rebota tipo DVD (15 HP) | Fruta especial (power-up), aviso sonoro antes del boss |

### Ítems

| Ítem                          | Efecto                                           |
| ----------------------------- | ------------------------------------------------ |
| **Fruta verde**               | +10 puntos                                       |
| **Fruta especial (amarilla)** | Disparo triple durante 7 segundos (solo nivel 2) |
| **Corazón**                   | +1 vida (máximo 5, aparece cada 30 segundos)     |

---

## Controles

### Teclado (Escritorio)

| Tecla     | Acción                         |
| --------- | ------------------------------ |
| `←` `→`   | Mover a la izquierda / derecha |
| `↑`       | Saltar                         |
| `Espacio` | Disparar                       |
| `P`       | Pausar / Reanudar              |

### Táctil (Móvil / Tablet)

| Botón         | Acción                    |
| ------------- | ------------------------- |
| Botón `←`     | Mover a la izquierda      |
| Botón `→`     | Mover a la derecha        |
| Botón `↑`     | Saltar                    |
| Botón `Space` | Disparar                  |
| Botón `PAUSA` | Pausar / Reanudar         |
| Botón `Mute`  | Silenciar / Activar audio |

---

## Instalación y Ejecución

### Requisitos previos

- [Node.js](https://nodejs.org/) (v18 o superior)
- [npm](https://www.npmjs.com/) (incluido con Node.js)

### Pasos

1. **Clonar el repositorio:**

   ```bash
   git clone https://github.com/MartinCusme/ProyectoPrimerBimestre_Grupo9.git
   cd phaser-game
   ```

2. **Instalar dependencias:**

   ```bash
   npm install
   ```

3. **Ejecutar en modo desarrollo:**

   ```bash
   npm run dev
   ```

   El servidor se abrirá por defecto en `http://localhost:5173/`.

4. **Compilar para producción (opcional):**

   ```bash
   npm run build
   ```

5. **Previsualizar la build de producción:**
   ```bash
   npm run preview
   ```

---

## Estructura del Proyecto

```
phaser-game/
│
├── index.html                  # Página principal del juego
├── style.css                   # Estilos globales
├── package.json                # Configuración de npm y dependencias
│
├── src/
│   ├── main.js                 # Punto de entrada — configuración de Phaser
│   │
│   ├── scenes/                 # Escenas del juego
│   │   ├── BootScene.js        # Carga de todos los assets (imágenes y audio)
│   │   ├── MainMenu.js         # Menú principal con puntajes y opciones
│   │   ├── GameScene.js        # Lógica principal del juego (gameplay)
│   │   └── InstructionsScene.js # Pantalla de instrucciones y controles
│   │
│   ├── objects/                # Objetos del juego
│   │   └── Player.js           # Clase del jugador (movimiento, controles)
│   │
│   ├── managers/               # Gestores
│   │   └── StorageManager.js   # Persistencia con localStorage (scores, mute, nivel)
│   │
│   ├── ui/                     # Componentes de interfaz
│   │   └── PauseScreen.js      # Pantalla de pausa (toggle pausa/reanudación)
│   │
│   ├── physics/                # Física y colisiones
│   │   └── CollisionManager.js # Gestión de colisiones y overlaps
│   │
│   ├── assets/                 # Recursos gráficos
│   │   ├── player.png          # Sprite del jugador
│   │   ├── babosa.png          # Sprite de la babosa (enemigo suelo)
│   │   ├── abeja.png           # Sprite de la abeja (enemigo volador)
│   │   ├── boss.png            # Sprite del jefe final
│   │   ├── fruta.png           # Sprite de la fruta normal
│   │   ├── fruta_especial.png  # Sprite de la fruta power-up
│   │   ├── corazon.png         # Sprite del corazón (vida extra)
│   │   ├── disparo.png         # Sprite del proyectil
│   │   ├── background.png      # Fondo del juego
│   │   ├── gameover.png        # Imagen de Game Over
│   │   ├── victory.png         # Imagen de Victoria
│   │   ├── reintentar.png      # Botón de reintentar
│   │   ├── menu.png            # Botón de volver al menú
│   │   ├── izq.png             # Botón táctil izquierda
│   │   ├── der.png             # Botón táctil derecha
│   │   ├── saltar.png          # Botón táctil saltar
│   │   └── disparar.png        # Botón táctil disparar
│   │
│   └── audio/                  # Recursos de audio
│       ├── musica.mp3          # Música de fondo principal
│       ├── musica2.mp3         # Música del jefe final
│       ├── disparo.mp3         # Efecto de sonido: disparo
│       ├── collect2.mp3        # Efecto de sonido: recoger fruta
│       ├── powerup.mp3         # Efecto de sonido: power-up activado
│       ├── die.mp3             # Efecto de sonido: perder vida
│       ├── extralife.mp3       # Efecto de sonido: vida extra
│       └── uwilldie.mp3        # Efecto de sonido: aviso antes del boss (nivel 2)
│
└── public/                     # Archivos estáticos
```

---

## Características Técnicas

### Arquitectura Phaser

- **4 Escenas:** BootScene (carga), MainMenu (menú), GameScene (juego), InstructionsScene (instrucciones).
- **Loader de assets:** Carga centralizada de imágenes y audio en `BootScene.js`.
- **Sistema de estados:** Manejo de estados del juego (playing, paused, boss, game over, victory).
- **Menú principal** con opciones de iniciar juego, ver instrucciones y tabla de mejores puntajes.
- **Pausa:** Se puede pausar y reanudar el juego con la tecla `P` o botón táctil.
- **Pantalla Game Over** con opción de reintentar.
- **Reinicio del juego** sin necesidad de recargar la página.

### Mecánicas de Juego

- **Movimiento** fluido del jugador con animación de volteo (flip).
- **Sistema de disparo** con proyectiles y power-up de disparo triple.
- **Colisiones** entre jugador, enemigos, balas, frutas y plataformas.
- **Sistema de puntaje** con acumulación de puntos por frutas y enemigos eliminados.
- **HUD** con puntuación, temporizador del boss, nivel actual, vidas (corazones) y botón de mute.
- **Enemigos:** Babosas (suelo) y abejas (vuelo) con diferente puntuación.
- **Jefes finales** con barra de vida, diferentes comportamientos (persecución y rebote).
- **Condición de victoria:** Derrotar al boss de cada nivel.
- **Condición de derrota:** Perder todas las vidas.
- **Sistema de vidas** con invulnerabilidad temporal al recibir daño.

### Física y Colisiones

- **Arcade Physics** de Phaser con gravedad (`y: 500`).
- **Detección de colisiones** entre sprites usando `CollisionManager`.
- **Overlaps** para interacciones (balas vs enemigos, jugador vs frutas, jugador vs enemigos).
- **Gravedad** y rebote configurados para jugador, enemigos e ítems.
- **Colisiones con bordes del mundo** (`setCollideWorldBounds`).

### Audio

- **Música de fondo** principal durante el gameplay.
- **Música de jefe final** que se activa al aparecer el boss.
- **8 efectos de sonido:** disparo, recolección, power-up, muerte, vida extra, aviso de boss.
- **Botón de mute** para silenciar/activar todo el audio.

### Persistencia (localStorage)

- **High Scores:** Top 3 mejores puntajes con nombre del jugador.
- **Nivel alcanzado:** Se guarda el progreso del nivel.
- **Configuración de audio:** Se persiste el estado de mute entre sesiones.

### Responsive Design y Controles

- **Escritorio:** Controles con teclado (flechas + espacio + P).
- **Móvil/Tablet:** Botones táctiles en pantalla (izquierda, derecha, saltar, disparar, pausa).
- **Escalado automático:** `Phaser.Scale.FIT` con centrado automático para cualquier resolución.
- **Soporte multi-touch:** Permite usar dos dedos simultáneamente en pantalla táctil.

### Rendimiento

- **Mínimo 45 FPS** durante toda la ejecución.
- Sin congelamientos ni bloqueos.
- Carga eficiente de assets con el sistema de precarga de Phaser.

### Accesibilidad

- Contraste adecuado en textos e interfaz.
- Instrucciones visibles desde el menú principal.
- Controles documentados en la escena de instrucciones.
- Opción de mute siempre disponible.

---

## Tecnologías Utilizadas

| Tecnología            | Uso                                                   |
| --------------------- | ----------------------------------------------------- |
| **Phaser.js v4**      | Motor de juegos 2D (Arcade Physics)                   |
| **JavaScript (ES6+)** | Lenguaje principal (clases, módulos, arrow functions) |
| **Vite v8**           | Bundler y servidor de desarrollo                      |
| **HTML5**             | Estructura de la página web                           |
| **CSS3**              | Estilos del contenedor del juego                      |
| **localStorage**      | Persistencia de datos del juego                       |

---

## Assets y Créditos

### Recursos Gráficos

- Sprites y assets gráficos personalizados para el proyecto.

### Recursos de Audio

- Música y efectos de sonido obtenidos de fuentes gratuitas:
  - [Kenney Assets](https://kenney.nl/assets)
  - [OpenGameArt](https://opengameart.org)
  - [Pixabay Music](https://pixabay.com/music/)

---

## Autor

- **Nombre:** Martín Cusme, David Cuasquer, Juan Murillo
- **Asignatura:** Aplicaciones Web
- **Carrera:** Ingeniería en Software
- **Universidad:** Escuela Politécnica Nacional (EPN)
- **Docente:** Jaime Sayago-Heredia
- **Fecha de entrega:** 26 de mayo de 2026

---

## Licencia

Este proyecto fue desarrollado con fines académicos para la Escuela Politécnica Nacional (EPN).
