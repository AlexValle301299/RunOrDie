class UI {
  constructor(ctx) {
    this.ctx = ctx;
  }

  // Dibuja la puntuación en pantalla (Bonus: Drawing Text & Styles)
  drawScore(score) {
    const ctx = this.ctx;

    ctx.save(); // (Bonus: Transformations & Compositing)

    ctx.fillStyle = 'rgba(0, 0, 0, 0.4)';
    ctx.fillRect(10, 10, 160, 40);

    ctx.fillStyle = '#ffffff';
    ctx.font = 'bold 18px Arial';
    ctx.textAlign = 'left';
    ctx.textBaseline = 'middle';
    ctx.fillText(`Monedas: ${score}`, 20, 31);

    ctx.restore();
  }

  // Dibuja la distancia recorrida
  drawDistance(distance) {
    const ctx = this.ctx;

    ctx.save();

    ctx.fillStyle = 'rgba(0, 0, 0, 0.4)';
    ctx.fillRect(ctx.canvas.width - 170, 10, 160, 40);

    ctx.fillStyle = '#f5a623';
    ctx.font = 'bold 18px Arial';
    ctx.textAlign = 'right';
    ctx.textBaseline = 'middle';
    ctx.fillText(`${distance}m`, ctx.canvas.width - 20, 31);

    ctx.restore();
  }

  // Pantalla de Game Over (Día 3: stop game)
  drawGameOver(score, distance) {
    const ctx = this.ctx;
    const w = ctx.canvas.width;
    const h = ctx.canvas.height;

    ctx.save();

    // Fondo semitransparente (Bonus: globalAlpha)
    ctx.globalAlpha = 0.75;
    ctx.fillStyle = '#1a1a2e';
    ctx.fillRect(0, 0, w, h);
    ctx.globalAlpha = 1;

    // Título GAME OVER
    ctx.fillStyle = '#e94560';
    ctx.font = 'bold 56px Arial';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText('GAME OVER', w / 2, h / 2 - 60);

    // Estadísticas
    ctx.fillStyle = '#ffffff';
    ctx.font = '24px Arial';
    ctx.fillText(`Monedas recogidas: ${score}`, w / 2, h / 2);
    ctx.fillText(`Distancia: ${distance}m`, w / 2, h / 2 + 40);

    // Instrucción para reiniciar
    ctx.fillStyle = '#f5a623';
    ctx.font = '20px Arial';
    ctx.fillText('Pulsa ESPACIO para reiniciar', w / 2, h / 2 + 100);

    ctx.restore();
  }
}