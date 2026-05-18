class Obstacle {
  constructor(ctx) {
    this.ctx = ctx;
    this.w = 35;
    this.h = 35 + Math.random() * 40;
    this.x = this.ctx.canvas.width;

    const groundY = this.ctx.canvas.height - 50;

    if (Math.random() < 0.4) {
      this.y = groundY - this.h;
    } else {
      this.y = 80 + Math.random() * (groundY - this.h - 100);
    }
  }

  update(speed) {
    this.x -= speed;
  }

  draw() {
    this.ctx.fillStyle = '#c1121f';
    this.ctx.fillRect(this.x, this.y, this.w, this.h);
  }

  isOutOfScreen() {
    return this.x + this.w < 0;
  }
}
