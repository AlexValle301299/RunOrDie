class Player {
  constructor(ctx) {
    this.ctx = ctx;

    // Posición y tamaño
    this.w = 50;
    this.h = 60;
    this.x = 100;
    this.y = ctx.canvas.height / 2;
    this.image = new Image();
    this.image.src = 'images/sonic.png';

    // Física
    this.vy = 0;         // velocidad vertical
    this.gravity = 0.5;  // gravedad (Bonus: Advanced Animations)
    this.lift = -0.8;    // fuerza del jetpack (contrarresta gravedad)
    this.isThrusting = false;

    // Límites del canvas
    this.groundY = ctx.canvas.height - this.h;
    this.ceilY = 0;
  }

  draw() {
    if (this.image.complete && this.image.naturalWidth > 0) {
      this.ctx.drawImage(this.image, this.x, this.y, this.w, this.h);
    } else {
      this.ctx.fillStyle = '#e94560';
      this.ctx.fillRect(this.x, this.y, this.w, this.h);
    }

    // Llama si jetpack activo: dibujar "fuego"
    if (this.isThrusting) {
      this.ctx.fillStyle = '#f5a623';
      this.ctx.fillRect(this.x - 15, this.y + 20, 15, 20);
    }
  }

  move() {
    // Aplicar gravedad siempre
    this.vy += this.gravity;

    // Aplicar fuerza del jetpack si está activo
    if (this.isThrusting) {
      this.vy += this.lift;
    }

    // Actualizar posición vertical
    this.y += this.vy;

    // Límite inferior (suelo)
    if (this.y >= this.groundY) {
      this.y = this.groundY;
      this.vy = 0;
    }

    // Límite superior (techo)
    if (this.y <= this.ceilY) {
      this.y = this.ceilY;
      this.vy = 0;
    }
  }

  // AABB collision detection (Día 3)
  collidesWith(element) {
    return (
      this.x < element.x + element.w &&
      this.x + this.w > element.x &&
      this.y < element.y + element.h &&
      this.y + this.h > element.y
    );
  }
}
