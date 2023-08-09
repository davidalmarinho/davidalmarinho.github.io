import { AssetPool } from "../utils/AssetPool.js";
import { Entity } from "./Entity.js";
import { GlobalVariables } from "../utils/GlobalVariables.js";
import { Camera } from "../world/Camera.js";
import { World } from "../world/World.js";
import { Game } from "../main/Game.js";
import { Signal } from "./Signal.js";
import { Frame } from "../rendering/Frame.js";

export class Player extends Entity {
  constructor(x, y, width, height) {
    super(x, y, width, height);
    
    this.fps = 0;
    this.animationIndex = 0;

    this.idleRightFrames    = [];
    this.idleLeftFrames     = [];
    this.walkingRightFrames = [];
    this.walkingLeftFrames  = [];

    this.isIdleRight    = true;
    this.isIdleLeft     = false;
    this.isWalkingRight = false;
    this.isWalkingLeft  = false;

    this.lastIdleRight      = this.isIdleRight;
    this.lastIdleLeft       = this.isIdleLeft;
    this.lastIsWalkingRight = this.isWalkingRight;
    this.lastIsWalkingLeft  = this.isWalkingLeft;

    this.showInteractingTip = false;

    // Setup idle right animation.
    for (let i = 0; i < 2; i++) {
      this.idleRightFrames.push(new Frame(i, 0));
    }

    // Setup idle left animation.
    for (let i = 0; i < 2; i++) {
      this.idleLeftFrames.push(new Frame(i, 1));
    }

    // Setup right walking animation.
    for (let i = 0; i < 3; i++) {
      this.walkingRightFrames.push(new Frame(i, 2));
    }

    // Setup left walking animation.
    for (let i = 0; i < 3; i++) {
      this.walkingLeftFrames.push(new Frame(i, 3));
    }
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

    this.isWalkingRight = false;
    this.isWalkingLeft  = false;

    if (MOVE_RIGHT) {
      this.x += SPEED;
      this.isWalkingRight = true;
    }
    else if (MOVE_LEFT) {
      this.x -= SPEED;
      this.isWalkingLeft = true;
    }
    
    if (MOVE_UP) {
      this.y -= SPEED;
    }
    else if (MOVE_DOWN) {
      this.y += SPEED;
    }

    if (this.isWalkingLeft || this.isWalkingRight) {
      this.isIdleLeft  = false;
      this.isIdleRight = false;
    }
    
    if (this.isWalkingLeft && !this.isWalkingRight) {
      this.isIdleLeft = true;
    }

    if (this.isWalkingRight && !this.isWalkingLeft) {
      this.isIdleRight = true;
    }

    if (this.isIdleLeft != this.lastIdleLeft || this.isIdleRight != this.lastIdleRight ||
      this.isWalkingRight != this.lastIsWalkingRight || this.isWalkingLeft != this.lastIsWalkingLeft) {
     this.resetAnim();
    }
    
    // Player animation.

    if (this.isWalkingRight) {
      this.performAnimation(12, this.walkingRightFrames.length - 1);
    }
    else if (this.isWalkingLeft) {
      this.performAnimation(12, this.walkingLeftFrames.length - 1);
    }
    else if (this.isIdleLeft) {
      this.performAnimation(60, this.idleLeftFrames.length - 1);
    }
    else if (this.isIdleRight) {
      this.performAnimation(60, this.idleRightFrames.length - 1);
    }
    
    this.showInteractingTip = false;
    this.checkCollision();
    this.updateCamera();
  }

  checkCollision() {
    for (let i = 0; i < Game.entitiesList.length; i++) {
      const CUR_ENT = Game.entitiesList[i];
      if (CUR_ENT instanceof Player) {
        continue;
      }
      else if (CUR_ENT instanceof Signal) {
        if (this.isColliding(this, CUR_ENT)) {
          this.showInteractingTip = true;
        }
      }
    }
  }

  performAnimation(maxFps, maxAnimIndex) {
    this.fps++;
    if (this.fps >= maxFps) {
      this.fps = 0;
      this.animationIndex++;
    }
    
    if (this.animationIndex > maxAnimIndex) {
      this.animationIndex = 0;
    }
  }

  resetAnim() {
    this.lastIdleRight      = this.isIdleRight;
    this.lastIdleLeft       = this.isIdleLeft;
    this.lastIsWalkingRight = this.isWalkingRight;
    this.lastIsWalkingLeft  = this.isWalkingLeft;
    
    this.animationIndex = 0;
    this.fps = 0;
  }

  draw(ctx) {
    if (this.isWalkingRight) {
      this.drawSprite(ctx, this.walkingRightFrames[this.animationIndex]);
    }
    else if (this.isWalkingLeft) {
      this.drawSprite(ctx, this.walkingLeftFrames[this.animationIndex]);
    }
    else if (this.isIdleLeft) {
      this.drawSprite(ctx, this.idleLeftFrames[this.animationIndex]);
    }
    else if (this.isIdleRight) {
      this.drawSprite(ctx, this.idleRightFrames[this.animationIndex]);
    }

    if (this.showInteractingTip) {
      ctx.font = "24px serif";
      ctx.fillStyle = 'white';
      ctx.fillText("Press 'E' to interact", 
                   GlobalVariables.GAME_WIDTH - 240,
                   GlobalVariables.GAME_HEIGHT - 20);
    }
  }

  drawSprite(context, frame) {
    context.drawImage(AssetPool.playerSpritesheet.image, 
      frame.frameX * GlobalVariables.SPRITE_SIZE, 
      frame.frameY * GlobalVariables.SPRITE_SIZE, 
      GlobalVariables.SPRITE_SIZE, GlobalVariables.SPRITE_SIZE, 
      this.x - Camera.x,
      this.y - Camera.y,
      GlobalVariables.SPRITE_SIZE * GlobalVariables.SCALE, 
      GlobalVariables.SPRITE_SIZE * GlobalVariables.SCALE, 
      0, 0
    );
  }
}