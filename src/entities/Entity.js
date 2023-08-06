import { GlobalVariables } from "../utils/GlobalVariables.js";
import { Camera } from "../world/Camera.js";
import { World } from "../world/World.js";

export class Entity {
  constructor(x, y, width, height) {
    this.x = x;
    this.y = y;
    this.width  = width;
    this.height = height;
  }

  tick(keyListener) { }
  draw(context) { }

  updateCamera() {
    const canvas = document.getElementById('canvas1');
    let w = GlobalVariables.GAME_WIDTH;
    let h = GlobalVariables.GAME_HEIGHT;

    const ENTITY_WIDTH  = this.width;
    const ENTITY_HEIGHT = this.height;

    let x = this.x - Math.floor(w / 2) + Math.floor(ENTITY_WIDTH / 2);
    let y = this.y - Math.floor(h / 2) + Math.floor(ENTITY_HEIGHT / 2);
    Camera.x = Camera.clamp(x, 0,
            World.width * GlobalVariables.SCALE * GlobalVariables.SPRITE_SIZE - w);
    Camera.y = Camera.clamp(y, 0,
            World.height * GlobalVariables.SCALE * GlobalVariables.SPRITE_SIZE - h);
  }
}