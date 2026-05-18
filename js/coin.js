class Coin {
  constructor(ctx) {
    this.ctx = ctx;
    this.w = 24;
    this.h = 24;
    this.x = this.ctx.canvas.width;
    this.y = 90 + Math.random() * 190;
    this.collected = false;
  }

  update(speed) {
    this.x -= speed;
  }

  draw() {
    if (this.collected) {
      return;
    }

    this.ctx.fillStyle = '#f4c430';
    this.ctx.beginPath();
    this.ctx.arc(this.x + 12, this.y + 12, 12, 0, Math.PI * 2);
    this.ctx.fill();

    this.ctx.strokeStyle = '#222222';
    this.ctx.stroke();
  }

  isOutOfScreen() {
    return this.x + this.w < 0;
  }
}
