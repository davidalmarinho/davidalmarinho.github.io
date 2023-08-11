import { Entity } from "../entities/Entity.js";
import { Player } from "../entities/Player.js";
import { GlobalVariables } from "../utils/GlobalVariables.js";
import { KeyListener } from "../utils/KeyListener.js";
import { World } from "../world/World.js"

export class Game {
  static entitiesList = [];

  constructor() {
    this.keyListener = new KeyListener();
    this.world = new World("assets/levels/map.png", 20, 20);
    this.accumulatorFPS = 0.0;
    this.lastTime = 0.0;
    this.fps = 0;
  }

  init() {
    let player = new Player(128, 128, GlobalVariables.ENTITY_SIZE, GlobalVariables.ENTITY_SIZE);
    Game.entitiesList.push(player);

    this.world.map.onload = () => {
      this.world.init();
    }
  }

  run(currentTime) {
    this.gameLoop(currentTime);
  }

  gameLoop(currentTime) {
    let delta = currentTime - this.lastTime;
    this.accumulatorFPS += delta;
    this.lastTime = currentTime;

    this.tick(this.keyListener);
    this.draw();

    this.fps++;
  
    if (this.accumulatorFPS > 1000) { // 1000ms <=> 1 second.
      console.log("FPS: " + this.fps + "\n");
      this.fps = 0;
      this.accumulatorFPS = 0.0;
    }
  
  //setTimeout(() => {
    requestAnimationFrame(this.gameLoop.bind(this));
  //}, 1000 / MAX_FPS);
  }

  tick(keyListener) {
    for (let i = 0; i < Game.entitiesList.length; i++) {
      Game.entitiesList[i].tick(keyListener);
    }
  }

  draw() {
    const canvas = document.getElementById('canvas1');
    const ctx = canvas.getContext('2d');

    // Clear all the paint
    ctx.clearRect(0, 0, canvas.width, canvas.height);
  
    this.world.draw(ctx);
    
    Game.entitiesList.sort(Entity.entitySorter);
    for (let i = 0; i < Game.entitiesList.length; i++) {
      Game.entitiesList[i].draw(ctx);
    }
  }
}