/* Simple Snake game (no dependencies) */
const canvas = document.getElementById('game');
const ctx = canvas.getContext('2d');
const scoreEl = document.getElementById('score');
const restartBtn = document.getElementById('restart');

const gridSize = 20; // size of a single cell in pixels
const cols = canvas.width / gridSize;
const rows = canvas.height / gridSize;

let snake = [];
let dir = {x: 1, y: 0};
let food = null;
let tickInterval = 120; // ms per tick
let timer = null;
let score = 0;
let gameOver = false;

function resetGame() {
  snake = [ {x: Math.floor(cols/2), y: Math.floor(rows/2)} ];
  dir = {x: 1, y: 0};
  score = 0;
  gameOver = false;
  placeFood();
  scoreEl.textContent = `Score: ${score}`;
  clearInterval(timer);
  timer = setInterval(tick, tickInterval);
}

function placeFood(){
  while(true){
    const f = { x: Math.floor(Math.random()*cols), y: Math.floor(Math.random()*rows) };
    if(!snake.some(s=>s.x===f.x && s.y===f.y)){
      food = f; break;
    }
  }
}

function tick(){
  if(gameOver) return;

  const head = { x: snake[0].x + dir.x, y: snake[0].y + dir.y };

  // Wrap around the edges
  head.x = (head.x + cols) % cols;
  head.y = (head.y + rows) % rows;

  // Check collision with self
  if(snake.some(s => s.x === head.x && s.y === head.y)){  
    endGame();
    return;
  }

  snake.unshift(head);

  // Eat food
  if(food && head.x === food.x && head.y === food.y){
    score += 1;
    scoreEl.textContent = `Score: ${score}`;
    placeFood();
    // gradually speed up
    if(tickInterval > 45){
      tickInterval = Math.max(45, tickInterval - 3);
      clearInterval(timer);
      timer = setInterval(tick, tickInterval);
    }
  } else {
    snake.pop();
  }

  draw();
}

function endGame(){
  gameOver = true;
  clearInterval(timer);
  // flash the canvas to indicate game over
  ctx.fillStyle = 'rgba(255,0,0,0.06)';
  ctx.fillRect(0,0,canvas.width,canvas.height);
}

function draw(){
  // background
  ctx.fillStyle = '#071422';
  ctx.fillRect(0,0,canvas.width,canvas.height);

  // draw food
  if(food){
    ctx.fillStyle = '#f97316';
    ctx.fillRect(food.x * gridSize + 1, food.y * gridSize + 1, gridSize - 2, gridSize - 2);
  }

  // draw snake
  for(let i=0;i<snake.length;i++){
    const s = snake[i];
    const px = s.x * gridSize;
    const py = s.y * gridSize;
    if(i===0){
      ctx.fillStyle = '#10b981';
      ctx.fillRect(px+1,py+1,gridSize-2,gridSize-2);
    } else {
      ctx.fillStyle = '#064e3b';
      ctx.fillRect(px+1,py+1,gridSize-2,gridSize-2);
    }
  }
}

// input
window.addEventListener('keydown', e=>{
  if(gameOver && e.code === 'Space'){
    resetGame();
    return;
  }

  switch(e.key){
    case 'ArrowUp': case 'w': case 'W':
      if(dir.y === 1) break; dir = {x:0,y:-1}; break;
    case 'ArrowDown': case 's': case 'S':
      if(dir.y === -1) break; dir = {x:0,y:1}; break;
    case 'ArrowLeft': case 'a': case 'A':
      if(dir.x === 1) break; dir = {x:-1,y:0}; break;
    case 'ArrowRight': case 'd': case 'D':
      if(dir.x === -1) break; dir = {x:1,y:0}; break;
  }
});

restartBtn.addEventListener('click', ()=> resetGame());

// Initialize
resetGame();

// Pause when the page is hidden to avoid runaway timers
document.addEventListener('visibilitychange', ()=>{
  if(document.hidden){ clearInterval(timer); } else if(!gameOver){ clearInterval(timer); timer = setInterval(tick, tickInterval); }
});
