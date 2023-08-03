import { AssetPool } from "../utils/AssetPool.js";
import { Entity } from "../entities/Entity.js"
import { Constants } from "../utils/Constants.js"

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
    if (keyListener.keys.indexOf('ArrowRight') > -1 || keyListener.keys.indexOf('d') > -1) {
      this.x++;
    }
    else if (keyListener.keys.indexOf('ArrowLeft') > -1 || keyListener.keys.indexOf('a') > -1) {
      this.x--;
    }

    // Player animation.
    if (this.isIdleRight) {
      this.performIdleRight();
    }
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
    ctx.drawImage(AssetPool.playerSpritesheet.image, 
      this.frameX * Constants.SPRITE_SIZE, this.frameY * Constants.SPRITE_SIZE, 
      Constants.SPRITE_SIZE, Constants.SPRITE_SIZE, 
      this.x, this.y,
      Constants.SPRITE_SIZE * Constants.SPRITE_SCALE, Constants.SPRITE_SIZE * Constants.SPRITE_SCALE, 
      0, 0
    );
  }
}