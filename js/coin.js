class Coin {
  constructor(ctx) {
    this.ctx = ctx;

    this.radius = 12;

    // Aparece en el borde derecho a altura aleatoria (Día 3: Coin class)
    this.x = ctx.canvas.width + this.radius;
    this.y = 60 + Math.random() * (ctx.canvas.height - 120);

    this.vx = -4; // misma velocidad que los obstáculos

    this.collected = false;
    this.color = '#f5a623';
  }

  draw() {
    if (this.collected) return;

    const ctx = this.ctx;

    // Círculo exterior (Día 1: arc)
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
    ctx.fillStyle = this.color;
    ctx.fill();
    ctx.strokeStyle = '#ffcc00';
    ctx.lineWidth = 2;
    ctx.stroke();
    ctx.closePath();

    // Símbolo "$" encima (Bonus: Drawing Text & Styles)
    ctx.fillStyle = '#1a1a2e';
    ctx.font = 'bold 12px Arial';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText('$', this.x, this.y);
  }

  move() {
    if (this.collected) return;
    this.x += this.vx;
  }

  // Limpieza de memoria (Día 3)
  isOutOfScreen() {
    return this.x + this.radius < 0;
  }
}