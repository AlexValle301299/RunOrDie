class Game {
  constructor() {
    this.canvas = document.getElementById('gameCanvas');
    this.ctx = this.canvas.getContext('2d');

    // Instancias de todas las clases (Día 1: OOP)
    this.background = new Background(this.ctx);
    this.player = new Player(this.ctx);
    this.ui = new UI(this.ctx);

    // Arrays de entidades (Día 3: spawn system)
    this.obstacles = [];
    this.coins = [];

    // Contadores de spawn
    this.obstacleCounter = 0;
    this.obstacleRate = 120; // cada ~2s a 60fps
    this.coinCounter = 0;
    this.coinRate = 90; // cada ~1.5s a 60fps

    // Puntuación y distancia
    this.score = 0;
    this.distance = 0;

    // Estado del juego
    this.isGameOver = false;
    this.intervalId = null;

    // Controls (Día 2: keyboard events)
    this.handleKeyDown = (e) => {
      if (e.code === 'Space') {
        e.preventDefault();
        if (this.isGameOver) {
          this.restart();
        } else {
          this.player.isThrusting = true;
        }
      }
    };

    this.handleKeyUp = (e) => {
      if (e.code === 'Space') {
        this.player.isThrusting = false;
      }
    };

    // Soporte táctil y click (para móvil)
    this.handlePointerDown = () => {
      if (this.isGameOver) {
        this.restart();
      } else {
        this.player.isThrusting = true;
      }
    };

    this.handlePointerUp = () => {
      this.player.isThrusting = false;
    };
  }

  start() {
    // Registrar eventos (Día 2)
    document.addEventListener('keydown', this.handleKeyDown);
    document.addEventListener('keyup', this.handleKeyUp);
    this.canvas.addEventListener('pointerdown', this.handlePointerDown);
    this.canvas.addEventListener('pointerup', this.handlePointerUp);

    // Game loop con setInterval (Día 1 + Bonus: Async & Callbacks)
    this.intervalId = setInterval(() => {
      this.update();
    }, 1000 / 60);
  }

  update() {
    if (this.isGameOver) return;

    // 1. Limpiar canvas (Día 1: clearRect)
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

    // 2. Fondo
    this.background.move();
    this.background.draw();

    // 3. Spawn de obstáculos y monedas (Día 3)
    this.spawnObstacles();
    this.spawnCoins();

    // 4. Mover y dibujar obstáculos
    this.obstacles.forEach(obs => { obs.move(); obs.draw(); });
    this.coins.forEach(coin => { coin.move(); coin.draw(); });

    // 5. Player
    this.player.move();
    this.player.draw();

    // 6. Colisiones (Día 3: AABB)
    this.checkCollisions();

    // 7. Limpiar entidades fuera de pantalla (Día 3: memory cleanup)
    this.cleanUp();

    // 8. Actualizar distancia y dibujar UI
    this.distance++;
    this.ui.drawScore(this.score);
    this.ui.drawDistance(Math.floor(this.distance / 10));
  }

  spawnObstacles() {
    this.obstacleCounter++;
    if (this.obstacleCounter >= this.obstacleRate) {
      this.obstacles.push(new Obstacle(this.ctx));
      this.obstacleCounter = 0;
      // Aumentar dificultad progresivamente
      if (this.obstacleRate > 60) this.obstacleRate -= 0.5;
    }
  }

  spawnCoins() {
    this.coinCounter++;
    if (this.coinCounter >= this.coinRate) {
      this.coins.push(new Coin(this.ctx));
      this.coinCounter = 0;
    }
  }

  checkCollisions() {
    // Colisión con obstáculos → Game Over
    this.obstacles.forEach(obs => {
      if (this.player.collidesWith(obs)) {
        this.gameOver();
      }
    });

    // Colisión con monedas → sumar puntos
    this.coins.forEach(coin => {
      if (!coin.collected && this.player.collidesWith(coin)) {
        coin.collected = true;
        this.score++;
      }
    });
  }

  cleanUp() {
    // Inmutable con .filter() (Bonus: Value vs Reference)
    this.obstacles = this.obstacles.filter(obs => !obs.isOutOfScreen());
    this.coins = this.coins.filter(coin => !coin.isOutOfScreen() && !coin.collected);
  }

  gameOver() {
    this.isGameOver = true;
    clearInterval(this.intervalId);
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    this.background.draw();
    this.player.draw();
    this.ui.drawGameOver(this.score, Math.floor(this.distance / 10));
  }

  restart() {
    // Limpiar eventos anteriores
    document.removeEventListener('keydown', this.handleKeyDown);
    document.removeEventListener('keyup', this.handleKeyUp);
    this.canvas.removeEventListener('pointerdown', this.handlePointerDown);
    this.canvas.removeEventListener('pointerup', this.handlePointerUp);

    // Crear nueva instancia del juego
    const newGame = new Game();
    newGame.start();
  }

  stop() {
    clearInterval(this.intervalId);
    document.removeEventListener('keydown', this.handleKeyDown);
    document.removeEventListener('keyup', this.handleKeyUp);
  }
}