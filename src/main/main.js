import { Player } from "../entities/Player.js";
import { GlobalVariables } from "../utils/GlobalVariables.js";
import { KeyListener } from "../utils/KeyListener.js";
import { World } from "../world/World.js"

const canvas = document.getElementById('canvas1');
const ctx = canvas.getContext('2d');
ctx.mozImageSmoothingEnabled = false;
ctx.msImageSmoothingEnabled = false;
ctx.imageSmoothingEnabled = false;
console.log(ctx);

canvas.width  = GlobalVariables.GAME_WIDTH;
canvas.height = GlobalVariables.GAME_HEIGHT;
var entitiesList = [];
var keyListener = new KeyListener();
var world = new World("assets/levels/map.png", 20, 20);

window.onload = function() {
  prepareDocument();
  resizeCanvas();
  ctx.mozImageSmoothingEnabled = false;
  ctx.msImageSmoothingEnabled = false;
  ctx.imageSmoothingEnabled = false;
}

function resizeCanvas() {
  // TODO: Think in the best solution for this.
  // canvas.width  = window.innerWidth;
  // canvas.height = window.innerHeight;

  /*GlobalVariables.GAME_WIDTH = window.innerWidth;
  GlobalVariables.GAME_HEIGHT = window.innerHeight;

  // Detects if the smartphone is in landscape orientation.
  if (window.innerHeight < window.innerWidth) {
    GlobalVariables.GAME_WIDTH = window.innerWidth;
    GlobalVariables.GAME_HEIGHT = window.innerHeight;
  }*/

  // - - - - - - - - - - - - - - - - - - - - -
  canvas.width  = GlobalVariables.GAME_WIDTH;
  canvas.height = GlobalVariables.GAME_HEIGHT;
}

function prepareDocument() {
  document.body.style.padding = "0px";
  document.body.style.margin = "0px";
}

function tick(keyListener) {
  for (let i = 0; i < entitiesList.length; i++) {
    entitiesList[i].tick(keyListener);
  }
}

function draw() {
  // Clear all the paint
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  world.draw(ctx);

  for (let i = 0; i < entitiesList.length; i++) {
    entitiesList[i].draw(ctx);
  }
};

let lastTime = window.performance.now();
let accumulatorFPS = 0.0;
let fps = 0;
const MAX_FPS = 30;

function gameLoop(currentTime) {
  let delta = currentTime - lastTime;
  accumulatorFPS += delta;
  lastTime = currentTime;

  tick(keyListener);
  draw();

  fps++;
  
  if (accumulatorFPS > 1000) { // 1000ms <=> 1 second.
    console.log("FPS: " + fps + "\n");
    fps = 0;
    accumulatorFPS = 0.0;
  }
  
  //setTimeout(() => {
    requestAnimationFrame(gameLoop);
  //}, 1000 / MAX_FPS);
};

function main() {
  // let player = new Player(1088, 1600, 16, 16);
  let player = new Player(128, 128, GlobalVariables.SPRITE_SIZE, GlobalVariables.SPRITE_SIZE);
  entitiesList.push(player);
  
  gameLoop(window.performance.now());
}

// Main
main();