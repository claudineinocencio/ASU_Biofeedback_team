// Canvas setup
const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

// Game variables
let ballY = 0; // Ball's position in "world space"
let ballSpeed = 0;
let gravity = 0.5;
let isRising = false;
let riseSpeed = -10;
let cameraY = 0; // Camera's position in "world space"

const gradients = [
  {
    color1: "#87CEEB",
    color2: "#E0FFFF",
    start: canvas.height,
    end: (canvas.height * 3) / 4,
  }, // Daytime (Bottom)
  {
    color1: "#E0FFFF",
    color2: "#4682B4",
    start: (canvas.height * 3) / 4,
    end: canvas.height / 2,
  }, // Skyline
  {
    color1: "#4682B4",
    color2: "#000080",
    start: canvas.height / 2,
    end: canvas.height / 4,
  }, // Stratosphere
  { color1: "#000000", color2: "#1A1A1A", start: canvas.height / 4, end: 0 }, // Space (Top)
];

// Handle space bar input
window.addEventListener("keydown", (e) => {
  if (e.code === "Space") {
    isRising = true;
  }
});

window.addEventListener("keyup", (e) => {
  if (e.code === "Space") {
    isRising = false;
  }
});

// Function to interpolate between two colors
function interpolateColor(color1, color2, factor) {
  const c1 = parseInt(color1.slice(1), 16);
  const c2 = parseInt(color2.slice(1), 16);

  const r1 = (c1 >> 16) & 0xff,
    g1 = (c1 >> 8) & 0xff,
    b1 = c1 & 0xff;
  const r2 = (c2 >> 16) & 0xff,
    g2 = (c2 >> 8) & 0xff,
    b2 = c2 & 0xff;

  const r = Math.round(r1 + factor * (r2 - r1));
  const g = Math.round(g1 + factor * (g2 - g1));
  const b = Math.round(b1 + factor * (b2 - b1));

  return `rgb(${r}, ${g}, ${b})`;
}

// Get the gradient color based on the ball's Y position
function getGradientColor(y) {
  for (let i = 0; i < gradients.length; i++) {
    const { color1, color2, start, end } = gradients[i];
    if (y >= start && y <= end) {
      const factor = (y - start) / (end - start); // Normalize position within the range
      return interpolateColor(color1, color2, factor);
    }
  }
  return gradients[gradients.length - 1].color2; // Default to space
}

// Game loop
function gameLoop() {
  // Ball physics
  if (isRising) {
    ballSpeed = riseSpeed;
  } else {
    ballSpeed += gravity;
  }

  ballY += ballSpeed;

  // Update camera to follow the ball
  cameraY = ballY - canvas.height / 2;

  // Clear canvas
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // Draw the background gradient
  drawBackground();

  // Draw the ball
  drawBall();

  // Repeat loop
  requestAnimationFrame(gameLoop);
}

function drawBackground() {
  // Calculate the gradient based on the camera's position
  const gradientColor = getGradientColor(ballY);
  document.body.style.background = gradientColor;
}

function drawBall() {
  ctx.beginPath();
  const ballScreenY = canvas.height / 2; // Ball is always in the center of the screen
  ctx.arc(canvas.width / 2, ballScreenY, 20, 0, Math.PI * 2);
  ctx.fillStyle = "red";
  ctx.fill();
  ctx.closePath();
}

// Start the game
gameLoop();
