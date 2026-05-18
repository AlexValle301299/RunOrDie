class Player {
  constructor(ctx) {
    this.ctx = ctx;
    this.w = 40;
    this.h = 55;
    this.x = 80;
    this.groundY = this.ctx.canvas.height - 50 - this.h;
    this.y = this.groundY;
    this.vy = 0;
    this.gravity = 0.5;
    this.flyPower = -1;
    this.maxFallSpeed = 7;
    this.maxFlySpeed = -7;
    this.frame = 0;
    this.imageLoaded = false;
    this.image = new Image();

    this.image.onload = () => {
      this.imageLoaded = true;
    };

    this.image.src = 'images/robot.svg';
  }

  update(keys) {
    if (keys.Space || keys.ArrowUp) {
      this.vy += this.flyPower;
    }

    this.vy += this.gravity;

    if (this.vy > this.maxFallSpeed) {
      this.vy = this.maxFallSpeed;
    }

    if (this.vy < this.maxFlySpeed) {
      this.vy = this.maxFlySpeed;
    }

    this.y += this.vy;

    if (this.y >= this.groundY) {
      this.y = this.groundY;
      this.vy = 0;
    }

    if (this.y <= 20) {
      this.y = 20;
      this.vy = 0;
    }

    this.frame++;
  }

  draw() {
    const ctx = this.ctx;

    if (this.imageLoaded) {
      ctx.drawImage(this.image, this.x, this.y, this.w, this.h);
      return;
    }

    ctx.fillStyle = '#457b9d';
    ctx.fillRect(this.x, this.y, this.w, this.h);
  }

  collidesWith(element) {
    return (
      this.x < element.x + element.w &&
      this.x + this.w > element.x &&
      this.y < element.y + element.h &&
      this.y + this.h > element.y
    );
  }
}
