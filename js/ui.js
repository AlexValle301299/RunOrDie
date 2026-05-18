class UI {
  constructor(ctx) {
    this.ctx = ctx;
  }

  drawScore(score, distance) {
    this.ctx.fillStyle = '#222222';
    this.ctx.font = '20px Arial';
    this.ctx.textAlign = 'left';
    this.ctx.fillText('Monedas: ' + score, 20, 30);
    this.ctx.fillText('Distancia: ' + distance + ' m', 20, 58);
  }

  drawStartMenu() {
    const canvas = this.ctx.canvas;

    this.ctx.fillStyle = '#bde0fe';
    this.ctx.fillRect(0, 0, canvas.width, canvas.height);

    this.ctx.fillStyle = '#222222';
    this.ctx.font = '40px Arial';
    this.ctx.textAlign = 'center';
    this.ctx.fillText('Run Or Die', canvas.width / 2, 150);

    this.ctx.font = '22px Arial';
    this.ctx.fillText('Pulsa ESPACIO para empezar', canvas.width / 2, 210);
    this.ctx.fillText('Manten ESPACIO para volar', canvas.width / 2, 245);
    this.ctx.fillText('Pulsa M para pausar', canvas.width / 2, 280);
  }

  drawPauseMenu() {
    const canvas = this.ctx.canvas;

    this.ctx.fillStyle = 'rgba(255, 255, 255, 0.8)';
    this.ctx.fillRect(0, 0, canvas.width, canvas.height);

    this.ctx.fillStyle = '#222222';
    this.ctx.font = '42px Arial';
    this.ctx.textAlign = 'center';
    this.ctx.fillText('Pausa', canvas.width / 2, 150);

    this.ctx.font = '22px Arial';
    this.ctx.fillText('Pulsa M para continuar', canvas.width / 2, 215);
    this.ctx.fillText('Pulsa S para salir al menu', canvas.width / 2, 250);
  }

  drawPauseText() {
    const canvas = this.ctx.canvas;

    this.ctx.fillStyle = '#222222';
    this.ctx.font = '18px Arial';
    this.ctx.textAlign = 'right';
    this.ctx.fillText('Pulsa M para pausar', canvas.width - 20, 30);
  }

  drawGameOver(score, distance) {
    const canvas = this.ctx.canvas;

    this.ctx.fillStyle = 'rgba(255, 255, 255, 0.8)';
    this.ctx.fillRect(0, 0, canvas.width, canvas.height);

    this.ctx.fillStyle = '#222222';
    this.ctx.font = '42px Arial';
    this.ctx.textAlign = 'center';
    this.ctx.fillText('Game Over', canvas.width / 2, 140);

    this.ctx.font = '22px Arial';
    this.ctx.fillText('Monedas: ' + score, canvas.width / 2, 200);
    this.ctx.fillText('Distancia: ' + distance + ' m', canvas.width / 2, 235);
    this.ctx.fillText('Pulsa ESPACIO para reiniciar', canvas.width / 2, 295);
  }
}
