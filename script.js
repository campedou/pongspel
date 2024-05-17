document.addEventListener('DOMContentLoaded', () => {
  const gameArea = document.querySelector('.game-area');
  const paddleLeft = document.getElementById('paddleLeft');
  const paddleRight = document.getElementById('paddleRight');
  const ball = document.getElementById('ball');
  const scoreDisplay = document.getElementById('score');

  let ballX = 400;
  let ballY = 200;
  let ballSpeedX = 5;
  let ballSpeedY = 5;
  let paddleLeftY = 160;
  let paddleRightY = 160;
  let scoreLeft = 0;
  let scoreRight = 0;

  let leftMoveUp = false;
  let leftMoveDown = false;
  let rightMoveUp = false;
  let rightMoveDown = false;

  function updatePaddlePositions() {
    if (leftMoveUp && paddleLeftY > 0) {
      paddleLeftY -= 4; // Move paddle up
    }
    if (leftMoveDown && paddleLeftY < 320) {
      paddleLeftY += 4; // Move paddle down
    }
    if (rightMoveUp && paddleRightY > 0) {
      paddleRightY -= 4; // Move paddle up
    }
    if (rightMoveDown && paddleRightY < 320) {
      paddleRightY += 4; // Move paddle down
    }

    paddleLeft.style.top = `${paddleLeftY}px`;
    paddleRight.style.top = `${paddleRightY}px`;

    requestAnimationFrame(updatePaddlePositions);
  }

  function updateBallPosition() {
    ballX += ballSpeedX;
    ballY += ballSpeedY;
    ball.style.left = `${ballX}px`;
    ball.style.top = `${ballY}px`;

    // Ball collision with walls
    if (ballY <= 0 || ballY >= 385) {
      ballSpeedY = -ballSpeedY;
    }

    // Ball collision with paddles
    if (ballX <= 30 && ballY >= paddleLeftY && ballY <= paddleLeftY + 80) {
      ballSpeedX = -ballSpeedX;
    } else if (ballX >= 770 && ballY >= paddleRightY && ballY <= paddleRightY + 80) {
      ballSpeedX = -ballSpeedX;
    }

    // Check if ball goes out of bounds (left or right)
    if (ballX <= 0) {
      scoreDisplay.textContent = `${++scoreRight} - ${scoreLeft}`;
      resetBall();
    } else if (ballX >= 800) {
      scoreDisplay.textContent = `${scoreRight} - ${++scoreLeft}`;
      resetBall();
    }

    requestAnimationFrame(updateBallPosition);
  }

  function resetBall() {
    ballX = 400;
    ballY = 200;
    ballSpeedX = -ballSpeedX;
    ballSpeedY = Math.random() > 0.5 ? -5 : 5;
  }

  // Event listeners for keydown and keyup events
  document.addEventListener('keydown', (event) => {
    if (event.key === 'w') {
      leftMoveUp = true;
    }
    if (event.key === 's') {
      leftMoveDown = true;
    }
    if (event.key === 'ArrowUp') {
      rightMoveUp = true;
    }
    if (event.key === 'ArrowDown') {
      rightMoveDown = true;
    }
  });

  document.addEventListener('keyup', (event) => {
    if (event.key === 'w') {
      leftMoveUp = false;
    }
    if (event.key === 's') {
      leftMoveDown = false;
    }
    if (event.key === 'ArrowUp') {
      rightMoveUp = false;
    }
    if (event.key === 'ArrowDown') {
      rightMoveDown = false;
    }
  });

  // Start updating paddle positions and ball position
  updatePaddlePositions();
  updateBallPosition();
});
