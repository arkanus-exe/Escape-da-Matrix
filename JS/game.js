const mazes = {
easy: [
  [0,0,1,0,0,1,0,0,1,0],
  [1,0,1,0,1,1,0,1,1,0],
  [0,0,0,1,0,0,0,0,1,0],
  [1,1,0,1,1,1,0,1,0,0],
  [0,0,0,0,0,1,0,1,1,0],
  [1,1,1,0,1,1,0,0,0,0],
  [0,0,0,0,0,1,1,1,1,0],
  [1,1,0,1,0,0,0,1,0,0],
  [0,0,0,1,0,1,0,1,0,1],
  [0,1,0,0,0,1,0,0,0,0]
],
  medium: [
  [0,1,0,0,1,0,1,0,0,1,0,1,0,0,0],
  [0,1,1,0,1,0,1,1,0,1,0,1,1,1,0],
  [0,0,0,1,0,0,0,0,1,0,0,0,0,1,0],
  [1,1,0,1,1,1,0,1,1,1,0,1,1,0,0],
  [0,0,0,0,0,1,0,0,0,1,0,0,1,1,0],
  [1,1,1,0,1,1,1,1,0,1,1,0,0,0,0],
  [0,0,0,0,0,1,0,0,0,1,1,1,1,1,0],
  [1,1,0,1,0,0,0,1,0,0,0,0,1,0,0],
  [0,0,0,1,0,1,0,1,0,1,0,1,0,0,1],
  [1,0,1,0,0,1,0,0,0,1,0,1,1,0,0],
  [0,0,1,1,1,1,1,1,0,1,0,0,1,1,0],
  [1,0,0,0,0,0,0,1,0,1,1,0,0,0,0],
  [0,1,1,1,0,1,0,1,0,0,1,1,1,1,0],
  [0,0,0,1,0,1,0,1,1,0,0,0,0,1,0],
  [1,1,0,0,0,1,0,0,0,1,1,1,0,0,0]
],
 hard: [
  [0,1,0,0,1,0,1,0,0,1,0,1,0,0,0,1,0,1,0,0],
  [0,1,1,0,1,0,1,1,0,1,0,1,1,1,0,1,0,1,1,0],
  [0,0,0,1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1,0],
  [1,1,0,1,1,1,0,1,1,1,0,1,1,0,0,1,1,0,1,0],
  [0,0,0,0,0,1,0,0,0,1,0,0,1,1,0,0,0,0,1,0],
  [1,1,1,0,1,1,1,1,0,1,1,0,0,0,0,1,1,0,0,0],
  [0,0,0,0,0,1,0,0,0,1,1,1,1,1,0,0,0,0,1,0],
  [1,1,0,1,0,0,0,1,0,0,0,0,1,0,0,1,1,0,0,0],
  [0,0,0,1,0,1,0,1,0,1,0,1,0,0,1,0,0,0,1,1],
  [1,0,1,0,0,1,0,0,0,1,0,1,1,0,0,1,0,1,0,0],
  [0,0,1,1,1,1,1,1,0,1,0,0,1,1,0,0,0,1,1,0],
  [1,0,0,0,0,0,0,1,0,1,1,0,0,0,0,1,0,0,0,0],
  [0,1,1,1,0,1,0,1,0,0,1,1,1,1,0,0,1,1,1,0],
  [0,0,0,1,0,1,0,1,1,0,0,0,0,1,0,1,0,0,1,0],
  [1,1,0,0,0,1,0,0,0,1,1,1,0,0,0,1,0,1,0,0],
  [0,0,1,1,1,1,0,1,0,0,0,1,1,1,0,1,0,1,1,0],
  [1,0,0,0,0,0,0,1,1,1,0,0,0,1,0,0,0,0,1,0],
  [0,1,1,1,0,1,0,0,0,1,1,1,0,1,1,1,0,1,0,0],
  [0,0,0,1,0,1,1,1,0,0,0,1,0,0,0,1,0,1,0,1],
  [1,1,0,0,0,0,0,0,1,1,0,0,0,1,0,0,0,0,0,0]
]
};

let mazeData, size, playerPos, enemyPos, enemyFrozen, playing, canEliminate;
const maze = document.getElementById("maze");
const statusText = document.getElementById("status");
const restartBtn = document.getElementById("restart");
const menu = document.getElementById("menu");
const startBtn = document.getElementById("start");
const diffDiv = document.getElementById("difficulties");

maze.style.display = "none";
statusText.style.display = "none";
restartBtn.style.display = "none";

startBtn.onclick = () => {
  startBtn.style.display = "none";
  diffDiv.style.display = "flex";
  window.focus();
};

// Ao escolher dificuldade, inicia o jogo
diffDiv.querySelectorAll("button").forEach(btn => {
  btn.onclick = () => {
    const diff = btn.getAttribute("data-diff");
    startGame(diff);
    document.getElementById("header-menu").style.display = "none";
    maze.style.display = "";
    statusText.style.display = "";
    window.focus();
  };
});

// Inicia o jogo com a matriz escolhida
function startGame(difficulty) {
  mazeData = JSON.parse(JSON.stringify(mazes[difficulty]));
  size = mazeData.length;
  playerPos = { x: 0, y: 0 };
  enemyPos = // Fácil: 1 agente | Médio: 2 agentes | Difícil: 3 agentes
enemyPos = difficulty === "easy" ? [{ x: size-1, y: size-1 }] :
           difficulty === "medium" ? [{ x: 10, y: 14 }, { x: 5, y: 5 }] :
           /* hard */ [{ x: 19, y: 19 }, { x: 10, y: 10 }, { x: 5, y: 15 }];
  enemyFrozen = false;
  playing = true;
  canEliminate = true;
  statusText.textContent = "";
  restartBtn.style.display = "none";
  renderMaze();
}

// Renderiza o labirinto na tela
function renderMaze() {
  maze.innerHTML = "";
  maze.style.gridTemplateColumns = `repeat(${size}, 28px)`;
  maze.style.gridTemplateRows = `repeat(${size}, 28px)`;
  for (let y = 0; y < size; y++) {
    for (let x = 0; x < size; x++) {
      const cell = document.createElement("div");
      cell.classList.add("cell");
      if (mazeData[y][x] === 1) cell.classList.add("wall");
      if (x === size - 1 && y === 0) {
        cell.classList.add("exit");
        cell.textContent = "🚪";
      }
      if (x === playerPos.x && y === playerPos.y) {
        cell.classList.add("player");
        cell.textContent = "🕶️";
      } else if (enemyPos.some(enemy => enemy.x === x && enemy.y === y)) {
        cell.classList.add("enemy");
        cell.textContent = "👔";
      }
      maze.appendChild(cell);
    }
  }
}

// Movimenta o jogador
function movePlayer(dx, dy) {
  if (!playing) return;
  const newX = playerPos.x + dx;
  const newY = playerPos.y + dy;
  if (newX >= 0 && newX < size && newY >= 0 && newY < size && mazeData[newY][newX] === 0) {
    playerPos = {x: newX, y: newY};
    checkWin();
    renderMaze();
  }
}


function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

// Movimento do agente (backtracking)
async function enemyBacktrack() {
  if (!playing || enemyFrozen) return;

  for (const enemy of enemyPos) {
    const visited = {};
    await moveEnemy(enemy, visited);
  }
}

async function moveEnemy(enemy, visited) {
  if (enemy.x === playerPos.x && enemy.y === playerPos.y) {
    gameOver();
    return true;
  }
  const key = `${enemy.x},${enemy.y}`;
  if (visited[key]) return false;
  visited[key] = true;
  const directions = [[0, -1], [1, 0], [0, 1], [-1, 0]];
  for (const [dx, dy] of directions) {
    const newX = enemy.x + dx, newY = enemy.y + dy;
    if (
      newX >= 0 && newX < size &&
      newY >= 0 && newY < size &&
      mazeData[newY][newX] === 0
    ) {
      enemy.x = newX;
      enemy.y = newY;
      renderMaze();
      await sleep(100);
      if (await moveEnemy(enemy, visited)) return true;
    }
  }
  return false;
}

// Verifica se o agente está perto do jogador
function isEnemyNear() {
  const dx = Math.abs(playerPos.x - enemyPos.x);
  const dy = Math.abs(playerPos.y - enemyPos.y);
  return dx + dy <= 2;
}

// Neo cria uma parede acima dele
function createWall() {
  if (!playing) return;
  const wx = playerPos.x;
  const wy = playerPos.y - 1;
  if (wy >= 0 && mazeData[wy][wx] === 0 && !(wx === enemyPos.x && wy === enemyPos.y)) {
    mazeData[wy][wx] = 1;
    statusText.textContent = "Neo criou uma parede!";
    setTimeout(() => { statusText.textContent = ""; }, 2000);
    renderMaze();
  } else {
    statusText.textContent = "Não é possível criar parede aqui!";
    setTimeout(() => { statusText.textContent = ""; }, 2000);
  }
}

// Neo pode eliminar um agente uma vez por jogo
function eliminateAgent() {
  if (!playing || !canEliminate || enemyPos.length === 0) return;
  canEliminate = false;

  // Encontra o agente mais próximo de Neo
  let closestEnemyIndex = 0;
  let closestDistance = Infinity;
  enemyPos.forEach((enemy, index) => {
    const distance = Math.abs(playerPos.x - enemy.x) + Math.abs(playerPos.y - enemy.y);
    if (distance < closestDistance) {
      closestDistance = distance;
      closestEnemyIndex = index;
    }
  });

  // Remove o agente mais próximo
  enemyPos.splice(closestEnemyIndex, 1);

  statusText.textContent = "Neo eliminou um agente! (só 1 vez)";
  setTimeout(() => { statusText.textContent = ""; }, 3000);
  renderMaze(); // Atualiza o labirinto para refletir a mudança
}

// Teleporta o jogador para trás do agente mais próximo
function teleportBehindAgent() {
  if (!playing || enemyPos.length === 0) return;

  // Encontra o agente mais próximo de Neo
  let closestEnemyIndex = 0;
  let closestDistance = Infinity;
  enemyPos.forEach((enemy, index) => {
    const distance = Math.abs(playerPos.x - enemy.x) + Math.abs(playerPos.y - enemy.y);
    if (distance < closestDistance) {
      closestDistance = distance;
      closestEnemyIndex = index;
    }
  });

  const closestEnemy = enemyPos[closestEnemyIndex];

  // Calcula a direção oposta ao agente
  let dx = playerPos.x - closestEnemy.x;
  let dy = playerPos.y - closestEnemy.y;
  let dirX = dx !== 0 ? dx / Math.abs(dx) : 0;
  let dirY = dy !== 0 ? dy / Math.abs(dy) : 0;

  // Move duas casas na direção oposta ao agente
  let newX = closestEnemy.x - 2 * dirX;
  let newY = closestEnemy.y - 2 * dirY;

  // Garante que o novo local é válido e não é parede
  if (
    newX >= 0 && newX < size &&
    newY >= 0 && newY < size &&
    mazeData[newY][newX] === 0
  ) {
    playerPos = { x: newX, y: newY };
    renderMaze();
  }
}

// Eventos aleatórios do sistema
function randomEvent() {
  if (!playing) return;
  const event = Math.floor(Math.random() * 4);
  if (event === 0) {
    enemyFrozen = true;
    statusText.textContent = "Antivírus ativado! Agente travado por 5s.";
    setTimeout(() => {
      enemyFrozen = false;
      statusText.textContent = "";
    }, 5000);
  } else if (event === 1) {
    const wallX = Math.floor(Math.random() * size);
    const wallY = Math.floor(Math.random() * size);
    if (mazeData[wallY][wallX] === 0) mazeData[wallY][wallX] = 1;
    else mazeData[wallY][wallX] = 0;
    statusText.textContent = "O sistema mudou o mapa!";
    setTimeout(() => { statusText.textContent = ""; }, 3000);
  } else if (event === 2) {
    // Troca posições entre o jogador e o primeiro agente
    if (enemyPos.length > 0) {
      const temp = { ...playerPos };
      playerPos = { ...enemyPos[0] };
      enemyPos[0] = temp;
      statusText.textContent = "Bug de sistema: posições trocadas!";
      setTimeout(() => { statusText.textContent = ""; }, 3000);
    }
  } else if (event === 3) {
    let tx, ty;
    do {
      tx = Math.floor(Math.random() * size);
      ty = Math.floor(Math.random() * size);
    } while (mazeData[ty][tx] !== 0 || (tx === playerPos.x && ty === playerPos.y));
    enemyPos[0] = { x: tx, y: ty }; // Teleporta o primeiro agente
    statusText.textContent = "O agente se teleportou!";
    setTimeout(() => { statusText.textContent = ""; }, 3000);
  }
  renderMaze();
}

// Verifica vitória
function checkWin() {
  if (playerPos.x === size-1 && playerPos.y === 0) {
    statusText.textContent = "Você (Neo) escapou do sistema!";
    playing = false;
    restartBtn.style.display = "block";
    showBigMessage("VOCÊ ESCAPOU DA MATRIX");
  }
}

// Verifica derrota
function gameOver() {
  statusText.textContent = "Você foi capturado pelo Agente!";
  playing = false;
  restartBtn.style.display = "block";
  showBigMessage("GAME OVER");
}

// Controle do teclado
function keyHandler(e) {
  if (!playing) return;
  const key = e.key.toLowerCase();
  if (key === "w") movePlayer(0, -1);
  else if (key === "s") movePlayer(0, 1);
  else if (key === "a") movePlayer(-1, 0);
  else if (key === "d") movePlayer(1, 0);
  else if (key === "f") teleportBehindAgent();
  else if (key === "q") eliminateAgent();
}
document.addEventListener("keydown", keyHandler);

// Botão de reiniciar
restartBtn.addEventListener("click", () => {
  hideBigMessage();
  document.getElementById("header-menu").style.display = "flex";
  maze.style.display = "none";
  statusText.style.display = "none";
  restartBtn.style.display = "none";
});

// Movimento do agente e eventos aleatórios
setInterval(() => {
  if (playing) enemyBacktrack(enemyPos.x, enemyPos.y);
}, 3000);
setInterval(randomEvent, 10000);

// Mensagem grande de vitória/derrota com efeito Matrix
function showBigMessage(text) {
  const bigMsg = document.getElementById("big-message");
  const bigText = document.getElementById("big-text");
  const bigMatrix = document.getElementById("big-matrix");
  bigMsg.style.display = "flex";
  bigText.textContent = text;
  let width = window.innerWidth;
  let height = window.innerHeight;
  bigMatrix.width = width;
  bigMatrix.height = height;
  const fontSize = 32;
  const columns = Math.floor(width / fontSize);
  const drops = Array(columns).fill(1);
  const ctx = bigMatrix.getContext("2d");
  function drawBigMatrix() {
    ctx.fillStyle = "rgba(17,17,17,0.15)";
    ctx.fillRect(0, 0, width, height);
    ctx.font = fontSize + "px monospace";
    for (let i = 0; i < drops.length; i++) {
      const text = letters[Math.floor(Math.random() * letters.length)];
      ctx.fillStyle = "#0f0";
      ctx.fillText(text, i * fontSize, drops[i] * fontSize);
      if (drops[i] * fontSize > height && Math.random() > 0.975) drops[i] = 0;
      drops[i]++;
    }
  }
  bigMsg._interval = setInterval(drawBigMatrix, 50);
  window.addEventListener('resize', () => {
    width = window.innerWidth;
    height = window.innerHeight;
    bigMatrix.width = width;
    bigMatrix.height = height;
  });
}
function hideBigMessage() {
  const bigMsg = document.getElementById("big-message");
  bigMsg.style.display = "none";
  if (bigMsg._interval) clearInterval(bigMsg._interval);
}