class Background {
  constructor(ctx) {
    this.ctx = ctx;

    this.x = 0;
    this.y = 0;
    this.w = ctx.canvas.width;
    this.h = ctx.canvas.height;
    this.vx = -2; // velocidad de scroll (hacia la izquierda)

    // Colores para simular el fondo sin imagen por ahora
    this.color1 = '#0f3460';
    this.color2 = '#16213e';
  }

  draw() {
    // Capa de fondo base
    this.ctx.fillStyle = this.color2;
    this.ctx.fillRect(0, 0, this.w, this.h);

    // Suelo
    this.ctx.fillStyle = '#1a1a2e';
    this.ctx.fillRect(0, this.h - 20, this.w, 20);

    // Líneas de velocidad para efecto de movimiento
    this.ctx.strokeStyle = 'rgba(233, 69, 96, 0.2)';
    this.ctx.lineWidth = 1;
    for (let i = 0; i < 10; i++) {
      let lineX = ((this.x * 3 + i * 90) % this.w + this.w) % this.w;
      this.ctx.beginPath();
      this.ctx.moveTo(lineX, 50 + i * 30);
      this.ctx.lineTo(lineX - 60, 50 + i * 30);
      this.ctx.stroke();
    }
  }

  move() {
    this.x += this.vx;
    // Reset infinito con módulo (Bonus: Basic Animations)
    if (this.x <= -this.w) {
      this.x = 0;
    }
  }
}