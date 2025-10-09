const canvas = document.getElementById("pong");
const ctx = canvas.getContext("2d");

// Raquetes e bola
const player = { x: 10, y: 150, w: 10, h: 100, dy: 0 };
const ai = { x: canvas.width - 20, y: 150, w: 10, h: 100 };
const ball = { x: canvas.width / 2, y: canvas.height / 2, r: 8, dx: 4, dy: 4 };

// Placar 
let playerScore = 0;
let aiScore = 0;

// Movimento do jogador
document.addEventListener("keydown", e => {
  if (e.key === "w") player.dy = -5;
  if (e.key === "s") player.dy = 5;
});
document.addEventListener("keyup", () => player.dy = 0);

// Funções de desenho
function drawRect(obj, color) {
  ctx.fillStyle = color;
  ctx.fillRect(obj.x, obj.y, obj.w, obj.h);
}
//bola
function drawBall(ball, color) {
  ctx.fillStyle = color;
  ctx.beginPath();
  ctx.arc(ball.x, ball.y, ball.r, 0, Math.PI * 2);
  ctx.fill();
}

// Colisão
function checkCollision(p) {
  return ball.x - ball.r < p.x + p.w &&
         ball.x + ball.r > p.x &&
         ball.y > p.y &&
         ball.y < p.y + p.h;
}

// Reiniciar bola
function resetBall() {
  ball.x = canvas.width / 2;
  ball.y = canvas.height / 2;
  ball.dx *= -1;
  ball.dy = 4 * (Math.random() > 0.5 ? 1 : -1);
}

// Função para desenhar o placar
function drawScore() {
  ctx.fillStyle = "white";
  ctx.font = "20px Arial" ;
  ctx.fillText(`Jogador: ${playerScore}`, 20, 30);
  ctx.fillText(`Computador: ${aiScore}`, canvas.width - 150, 30);
}

// Atualização do jogo
function move() {
  player.y += player.dy;
  if (player.y < 0) player.y = 0;
  if (player.y + player.h > canvas.height) player.y = canvas.height - player.h;

  ai.y += (ball.y - (ai.y + ai.h / 2)) * 0.05;

  ball.x += ball.dx;
  ball.y += ball.dy;

  if (ball.y - ball.r < 0 || ball.y + ball.r > canvas.height) ball.dy *= -1;

  if (checkCollision(player) || checkCollision(ai)) ball.dx *= -1;

  if (ball.x < 0) {
    aiScore++;
    resetBall();
  }

  if (ball.x > canvas.width) {
    playerScore++;
    resetBall();
  }
}

// Desenhar tudo
function update() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  drawRect(player, "white");
  drawRect(ai, "white");
  drawBall(ball, "white");
  drawScore();
  move();
  requestAnimationFrame(update);
}

update();