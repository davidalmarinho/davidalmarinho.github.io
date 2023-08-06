import { AssetPool } from "../utils/AssetPool.js";
import { Entity } from "../entities/Entity.js"
import { GlobalVariables } from "../utils/GlobalVariables.js"
import { Camera } from "../world/Camera.js";
import { World } from "../world/World.js";

export class Player extends Entity {
  fps = 0;
  isIdleRight = true;
  frameX = 0;
  frameY = 0;

  constructor(x, y, width, height) {
    super(x, y, width, height);
  }

  tick(keyListener) {
    // Move player.
    const SPEED = 5;
    const MOVE_RIGHT = (keyListener.isKeyPressed('ArrowRight') || keyListener.isKeyPressed('d')) && 
                      World.isFree(this.x + SPEED, this.y, SPEED, this.width, this.height);
    const MOVE_LEFT = (keyListener.isKeyPressed('ArrowLeft') || keyListener.isKeyPressed('a')) &&
                      World.isFree(this.x - SPEED, this.y, SPEED, this.width, this.height);
    const MOVE_UP = (keyListener.isKeyPressed('ArrowUp') || keyListener.isKeyPressed('w')) &&
                    World.isFree(this.x, this.y - SPEED, SPEED, this.width, this.height);
    const MOVE_DOWN = (keyListener.isKeyPressed('ArrowDown') || keyListener.isKeyPressed('s')) &&
                      World.isFree(this.x, this.y + SPEED, SPEED, this.width, this.height);

    if (MOVE_RIGHT) {
      this.x += SPEED;
    }
    else if (MOVE_LEFT) {
      this.x -= SPEED;
    }
    
    if (MOVE_UP) {
      this.y -= SPEED;
    }
    else if (MOVE_DOWN) {
      this.y += SPEED;
    }
    
    // Player animation.
    if (this.isIdleRight) {
      this.performIdleRight();
    }
    
    this.updateCamera();
  }

  performIdleRight() {
    // TODO: Reset frameX and frameY before working on them.
    this.fps++;
    if (this.fps >= 20) {
      this.fps = 0;
      this.frameX++;
    }
    
    if (this.frameX > 1) {
      this.frameX = 0;
    }
  }

  draw(ctx) {
    // ctx.drawImage(AssetPool.museumSpritesheet.image, 
    ctx.drawImage(AssetPool.playerSpritesheet.image, 
      this.frameX * GlobalVariables.SPRITE_SIZE, this.frameY * GlobalVariables.SPRITE_SIZE, 
      GlobalVariables.SPRITE_SIZE, GlobalVariables.SPRITE_SIZE, 
      this.x - Camera.x,
      this.y - Camera.y,
      GlobalVariables.SPRITE_SIZE * GlobalVariables.SCALE, 
      GlobalVariables.SPRITE_SIZE * GlobalVariables.SCALE, 
      0, 0
    );
  }
}