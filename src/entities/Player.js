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
    const SPEED = 5;
    if (keyListener.isKeyPressed('ArrowRight') || keyListener.isKeyPressed('d')) {
      this.x += SPEED;
    }
    else if (keyListener.isKeyPressed('ArrowLeft') || keyListener.isKeyPressed('a')) {
      this.x -= SPEED;
    }

    if (keyListener.isKeyPressed('ArrowUp') || keyListener.isKeyPressed('w')) {
      this.y -= SPEED;
    }
    else if (keyListener.isKeyPressed('ArrowDown') || keyListener.isKeyPressed('s')) {
      this.y += SPEED;
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
    const canvas = document.getElementById('canvas1');
    ctx.drawImage(AssetPool.playerSpritesheet.image, 
      this.frameX * Constants.SPRITE_SIZE, this.frameY, 
      Constants.SPRITE_SIZE, Constants.SPRITE_SIZE, 
      this.x, this.y,
      canvas.width * Constants.SPRITE_WIDTH_RENDER, canvas.height * Constants.SPRITE_HEIGHT_RENDER, 
      0, 0
    );
  }
}