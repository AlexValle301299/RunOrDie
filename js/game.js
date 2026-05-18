class Game {
  constructor() {
    this.canvas = document.getElementById('gameCanvas');
    this.ctx = this.canvas.getContext('2d');

    this.background = new Background(this.ctx);
    this.player = new Player(this.ctx);
    this.ui = new UI(this.ctx);

    this.keys = {};
    this.obstacles = [];
    this.coins = [];
    this.frame = 0;
    this.score = 0;
    this.distance = 0;
    this.started = false;
    this.gameOver = false;
    this.paused = false;

    this.addEvents();
  }

  addEvents() {
    window.addEventListener('keydown', (event) => {
      this.keys[event.code] = true;

      if (event.code === 'Space') {
        event.preventDefault();
      }

      if (event.code === 'KeyM' && !event.repeat && this.started && !this.gameOver) {
        this.paused = !this.paused;
      }

      if (event.code === 'KeyS' && this.started && this.paused) {
        this.goToMenu();
      }

      if (!this.started && event.code === 'Space') {
        this.startGame();
      }

      if (this.gameOver && event.code === 'Space') {
        this.restart();
      }
    });

    window.addEventListener('keyup', (event) => {
      this.keys[event.code] = false;
    });
  }

  start() {
    this.ui.drawStartMenu();
  }

  startGame() {
    this.started = true;
    this.gameOver = false;
    this.paused = false;
    this.gameLoop();
  }

  restart() {
    this.background = new Background(this.ctx);
    this.player = new Player(this.ctx);
    this.obstacles = [];
    this.coins = [];
    this.frame = 0;
    this.score = 0;
    this.distance = 0;
    this.started = true;
    this.gameOver = false;
    this.paused = false;
    this.gameLoop();
  }

  goToMenu() {
    this.background = new Background(this.ctx);
    this.player = new Player(this.ctx);
    this.obstacles = [];
    this.coins = [];
    this.frame = 0;
    this.score = 0;
    this.distance = 0;
    this.started = false;
    this.gameOver = false;
    this.paused = false;
    this.keys = {};
    this.ui.drawStartMenu();
  }

  gameLoop() {
    this.update();
    this.draw();

    if (!this.gameOver && this.started) {
      requestAnimationFrame(() => {
        this.gameLoop();
      });
    }
  }

  update() {
    if (!this.started || this.gameOver || this.paused) {
      return;
    }

    this.frame++;
    this.distance++;

    const speed = 4 + Math.floor(this.distance / 500);

    this.background.update(speed);
    this.player.update(this.keys);

    if (this.frame % 90 === 0) {
      this.obstacles.push(new Obstacle(this.ctx));
    }

    if (this.frame % 130 === 0) {
      this.coins.push(new Coin(this.ctx));
    }

    this.obstacles.forEach((obstacle) => {
      obstacle.update(speed);
    });

    this.coins.forEach((coin) => {
      coin.update(speed);
    });

    this.checkCollisions();

    this.obstacles = this.obstacles.filter((obstacle) => {
      return !obstacle.isOutOfScreen();
    });

    this.coins = this.coins.filter((coin) => {
      return !coin.isOutOfScreen() && !coin.collected;
    });
  }

  checkCollisions() {
    this.obstacles.forEach((obstacle) => {
      if (this.player.collidesWith(obstacle)) {
        this.gameOver = true;
      }
    });

    this.coins.forEach((coin) => {
      if (!coin.collected && this.player.collidesWith(coin)) {
        coin.collected = true;
        this.score++;
      }
    });
  }

  draw() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

    if (!this.started) {
      this.ui.drawStartMenu();
      return;
    }

    this.background.draw();

    this.obstacles.forEach((obstacle) => {
      obstacle.draw();
    });

    this.coins.forEach((coin) => {
      coin.draw();
    });

    this.player.draw();
    this.ui.drawScore(this.score, this.distance);
    this.ui.drawPauseText();

    if (this.gameOver) {
      this.ui.drawGameOver(this.score, this.distance);
    }

    if (this.paused) {
      this.ui.drawPauseMenu();
    }
  }
}
