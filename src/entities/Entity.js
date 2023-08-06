import { GlobalVariables } from "../utils/GlobalVariables.js";
import { Rectangle } from "../utils/Rectangle.js";
import { Camera } from "../world/Camera.js";

export class Entity {
  static worldWidth = 0;
  static worldHeight = 0;

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
            Entity.worldWidth * GlobalVariables.SCALE * GlobalVariables.SPRITE_SIZE - w);
    Camera.y = Camera.clamp(y, 0,
            Entity.worldHeight * GlobalVariables.SCALE * GlobalVariables.SPRITE_SIZE - h);
  }

  isColliding(e1, e2) {
    // const ENT1_REC = new Rectangle(e1.x + e1.xMask, e1.y + e1.yMask,
    //                                e1.widthMask, e1.heightMask);
    // const ENT2_REC = new Rectangle(e2.x + e2.xMask, e2.y + e2.yMask,
    //                                e2.widthMask, e2.heightMask);

    const ENT1_REC = new Rectangle(e1.x, e1.y,
                                    e1.width, e1.height);
    const ENT2_REC = new Rectangle(e2.x, e2.y,
                                    e2.width, e2.height);
    return ENT1_REC.intersects(ENT2_REC);
  }

  static setWorldDimensions(width, height) {
    Entity.worldWidth  = width;
    Entity.worldHeight = height;
  }
}