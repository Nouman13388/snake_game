import "./style.css";

let appDiv = document.getElementById("app");
appDiv.innerHTML = `
  <h1>Snake Game</h1>
  <canvas id="snake"></canvas>
`;

let canvas = document.getElementById("snake");
let context = canvas.getContext("2d");
canvas.width = 400;
canvas.height = 400;

let boxSize = 20;

let snake = [
  { x: 10, y: 10 }
];

let moveX = 0;
let moveY = 0;

const updateSnake = () => {
    console.log("Updating snake...");
    let head = {
        x: snake[0].x + moveX,
        y: snake[0].y + moveY
    };
    console.log(`New head position: { x: ${head.x}, y: ${head.y} }`);

    let maxX = canvas.width / boxSize;
    let maxY = canvas.height / boxSize;
    if (head.x < 0 || head.x >= maxX || head.y < 0 || head.y >= maxY) {
        console.log("Snake hit the boundary. Game Over.");
        return false;
    }

    snake.unshift(head);
    snake.pop();
    console.log(`Updated snake: ${JSON.stringify(snake)}`);
    return true;
}


const drawGame = () => {
  console.log("Drawing game...");
  context.fillStyle = "black";
  context.fillRect(0, 0, canvas.width, canvas.height);

  context.fillStyle = "yellow";
  for (let i = 0; i < snake.length; i++) {
    let part = snake[i];
    console.log(`Drawing part ${i}: { x: ${part.x}, y: ${part.y} }`);
    context.fillRect(
      part.x * boxSize,
      part.y * boxSize,
      boxSize - 4,
      boxSize - 4
    );
  }
}

const gameLoop = () => {
    console.log("Starting game loop...");
    if (!updateSnake()) {
        appDiv.innerHTML = `<h1>Game Over!</h1><p>Refresh to play again.</p>`;
        console.log("Game Over! Refresh to play again.");
        return;
    }
    drawGame();
    setTimeout(gameLoop, 100);
}


document.addEventListener("keydown", function(event) {
  console.log(`Key pressed: ${event.key}`);
  if (event.key === "ArrowUp" && moveY !== 1) {
    moveX = 0;
    moveY = -1;
    console.log("Moving up");
  } else if (event.key === "ArrowDown" && moveY !== -1) {
    moveX = 0;
    moveY = 1;
    console.log("Moving down");
  } else if (event.key === "ArrowLeft" && moveX !== 1) {
    moveX = -1;
    moveY = 0;
    console.log("Moving left");
  } else if (event.key === "ArrowRight" && moveX !== -1) {
    moveX = 1;
    moveY = 0;
    console.log("Moving right");
  }
});

gameLoop();
