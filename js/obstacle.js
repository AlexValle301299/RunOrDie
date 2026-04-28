class Obstacle {
  constructor(ctx) {
    this.ctx = ctx;

    // Tamaño aleatorio para variedad
    this.w = 30 + Math.random() * 20;
    this.h = 40 + Math.random() * 60;

    // Aparece en el borde derecho (Día 3: Enemy class)
    this.x = ctx.canvas.width;

    // Posición vertical: en el suelo
    this.y = ctx.canvas.height - this.h - 20; // -20 por el suelo

    this.vx = -4; // se mueve hacia la izquierda
    this.color = '#e94560';
  }

  draw() {
    this.ctx.fillStyle = this.color;
    this.ctx.fillRect(this.x, this.y, this.w, this.h);

    // Detalle visual: borde superior más brillante
    this.ctx.fillStyle = '#ff6b81';
    this.ctx.fillRect(this.x, this.y, this.w, 5);
  }

  move() {
    this.x += this.vx;
  }

  // Limpieza de memoria (Día 3)
  isOutOfScreen() {
    return this.x + this.w < 0;
  }
}