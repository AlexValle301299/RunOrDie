class Background {
  constructor(ctx) {
    this.ctx = ctx;
    this.x = 0;
  }

  update(speed) {
    this.x -= speed;

    if (this.x <= -this.ctx.canvas.width) {
      this.x = 0;
    }
  }

  draw() {
    const canvas = this.ctx.canvas;
    const groundY = canvas.height - 50;

    this.ctx.fillStyle = '#bde0fe';
    this.ctx.fillRect(0, 0, canvas.width, canvas.height);

    this.ctx.fillStyle = '#444444';
    this.ctx.fillRect(0, groundY, canvas.width, 50);

    this.ctx.fillStyle = '#ffffff';

    for (let i = 0; i < 6; i++) {
      const lineX = this.x + i * 160;

      this.ctx.fillRect(lineX, groundY + 24, 70, 5);
      this.ctx.fillRect(lineX + canvas.width, groundY + 24, 70, 5);
    }
  }
}
