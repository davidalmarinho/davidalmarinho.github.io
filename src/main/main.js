import { Player } from "../entities/Player.js";
import { KeyListener } from "../utils/KeyListener.js";

const canvas = document.getElementById('canvas1');
const ctx = canvas.getContext('2d');
console.log(ctx);

const CANVAS_WIDTH = canvas.width = 600;
const CANVAS_HEIGHT = canvas.height = 600;

var entitiesList = [];
var keyListener = new KeyListener();

function tick(keyListener) {
  for (let i = 0; i < entitiesList.length; i++) {
    entitiesList[i].tick(keyListener);
  }
}

function animate() {
  // Clear all the paint
  ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);

  ctx.fillRect(100, 50, 100, 100);

  for (let i = 0; i < entitiesList.length; i++) {
    entitiesList[i].draw(ctx);
  }
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

  tick(keyListener);
  draw();

  fps += 1;
  
  if (accumulatorFPS > 1000) { // 1000ms <=> 1 second.
    console.log("FPS: " + fps + "\n");
    fps = 0;
    accumulatorFPS = 0.0;
  }
  
  requestAnimationFrame(gameLoop);
};

function main() {
  let player = new Player(0, 0, 16, 16);
  entitiesList.push(player);
  
  gameLoop(window.performance.now());
}

// Main
main();