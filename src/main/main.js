import { Spritesheet } from "../rendering/Spritesheet.js";

const canvas = document.getElementById('canvas1');
const ctx = canvas.getContext('2d');
console.log(ctx);

const CANVAS_WIDTH = canvas.width = 600;
const CANVAS_HEIGHT = canvas.height = 600;

const spriteWidth = 256;
const spriteHeight = 256;
let frameX = 0;
let frameY = 0;

var playerSpritesheet = new Spritesheet("assets/textures/player.png", 256, 256);

function tick() {

};

function animate() {
  // Clear all the paint
  ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);

  ctx.fillRect(100, 50, 100, 100);

  ctx.drawImage(playerSpritesheet.image,
    frameX * spriteWidth, frameY * spriteHeight, 
    spriteWidth, spriteHeight, 0, 0,
    spriteWidth, spriteHeight, 0, 0);
};

function draw() {
  animate();
};


let lastTime = window.performance.now();
let accumulatorFPS = 0.0;
let fps = 0;

function gameLoop(currentTime) {
  let delta = currentTime - lastTime;
  accumulatorFPS += delta;
  lastTime = currentTime;

  tick();
  draw();

  fps += 1;
  
  if (accumulatorFPS > 1000) { // 1000ms <=> 1 second.
    console.log("FPS: " + fps + "\n");
    fps = 0;
    accumulatorFPS = 0.0;
  }
  
  requestAnimationFrame(gameLoop);
};

// Main
gameLoop(window.performance.now());