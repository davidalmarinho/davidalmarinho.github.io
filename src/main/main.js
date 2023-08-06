import { GlobalVariables } from "../utils/GlobalVariables.js";
import { Game } from "./Game.js";

const canvas = document.getElementById('canvas1');
const ctx = canvas.getContext('2d');
ctx.mozImageSmoothingEnabled = false;
ctx.msImageSmoothingEnabled = false;
ctx.imageSmoothingEnabled = false;
console.log(ctx);

canvas.width  = GlobalVariables.GAME_WIDTH;
canvas.height = GlobalVariables.GAME_HEIGHT;

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

let lastTime = window.performance.now();
let accumulatorFPS = 0.0;
let fps = 0;
const MAX_FPS = 30;

function main() {
  let game = new Game();
  game.init();
  game.run(window.performance.now());
}

// Main
main();