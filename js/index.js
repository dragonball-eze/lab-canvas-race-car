const canvas = document.getElementById("canvas");
const context = canvas.getContext("2d");
let interval;

const game = {
  frames: 0,
  obstacles: [],
  start: () => {
      interval = setInterval(() => {
          updateCanvas();
      }, 10);
  },
  clear: () => {
      context.clearRect(0, 0, canvas.clientWidth, canvas.clientHeight);
  },
  stop: () => {
      clearInterval(interval);
  }
};

class Car {
  constructor(x, y) {
    this.x = x;
    this.y = y;

    const img = new Image();
    img.src = './images/car.png';
    img.onload = () => {
      this.image = img;
      this.draw();
    };
  }

  draw() {
    context.drawImage(this.image, this.x, this.y, 50, 50);
  }

  moveLeft() {
    this.x -= 25;
  }

  moveRight() {
    this.x += 25;
  }
}

const player1 = new Car(250, 630);

document.addEventListener("keydown", (e) => {
  switch(e.key) {
      case "ArrowLeft":
              player1.moveLeft();
              break;
      case "ArrowRight":
          player1.moveRight();
          break;
  }

  context.clearRect (0, 0, canvas.clientWidth, canvas.clientHeight);
  player1.draw();
});

function drawObstacles() {
  game.obstacles.forEach((obstacle) => {
      obstacle.x -= 1;
      obstacle.draw();
  })

  game.frames++;

if (game.frames%120===0){
  const minHeight = 20;
  const maxHeight = 160;
  const randomHeight = Math.floor(Math.random()*(maxHeight-minHeight + 1) + minHeight);

  const minGap = 50;
  const maxGap = 80;
  const randomGap = Math.floor(Math.random()*(maxGap - minGap + 1) + minGap);

  const obstacleLeft = new Car(0, randomHeight);

  game.obstacles.push(obstacleLeft);

  const obstacleRight = new Car(canvas.clientWidth, 0);

  game.obstacles.push(obstacleRight);
}

window.onload = () => {
  document.getElementById('start-button').onclick = () => {
    startGame();
  };

  function startGame() {
    player1.draw();
    drawObstacles();
  }
}
}
