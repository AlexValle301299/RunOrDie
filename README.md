# Run Or Die

Juego sencillo hecho con HTML, CSS, JavaScript y Canvas.

El objetivo es volar, esquivar obstaculos y recoger monedas. Si el jugador toca un obstaculo, la partida termina.

## Como jugar

- Pulsa `ESPACIO` para empezar.
- Manten pulsado `ESPACIO` o `ArrowUp` para volar.
- Pulsa `M` para pausar y continuar.
- En pausa, pulsa `S` para volver al menu principal.
- Recoge monedas para sumar puntos.
- Evita los obstaculos rojos. Pueden salir en el suelo o por el aire.
- Cuando pierdas, pulsa `ESPACIO` para reiniciar.

## Tecnologias

- HTML
- CSS
- JavaScript
- Canvas

## Conceptos usados

- `canvas` y `getContext('2d')`
- `fillRect`, `arc`, `fillText` y `clearRect`
- `requestAnimationFrame`
- Eventos de teclado con `keydown` y `keyup`
- Gravedad y vuelo manteniendo una tecla
- Carga de imagen con `new Image()` y `onload`
- Arrays para enemigos y monedas
- Colisiones AABB
- Limpieza de elementos fuera de la pantalla con `filter`

## Archivos principales

- `index.html`
- `css/style.css`
- `js/game.js`
- `js/player.js`
- `js/obstacle.js`
- `js/coin.js`
- `js/background.js`
- `js/ui.js`
- `images/robot.svg`

## Como abrirlo

Abre `index.html` en el navegador.
