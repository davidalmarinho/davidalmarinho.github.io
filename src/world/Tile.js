import { AssetPool } from "../utils/AssetPool.js";
import { GlobalVariables } from "../utils/GlobalVariables.js";
import { Camera } from "./Camera.js";

export class Tile {
  constructor(x, y, frameX, frameY) {
    this.x = x;
    this.y = y;
    this.frameX = frameX;
    this.frameY = frameY;
  }

  draw(context) {
    context.drawImage(AssetPool.museumSpritesheet.image, 
      this.frameX * GlobalVariables.SPRITE_SIZE, this.frameY * GlobalVariables.SPRITE_SIZE, 
      GlobalVariables.SPRITE_SIZE, GlobalVariables.SPRITE_SIZE, 
      this.x - Camera.x, this.y - Camera.y,
      GlobalVariables.SPRITE_SIZE * GlobalVariables.SCALE, GlobalVariables.SPRITE_SIZE * GlobalVariables.SCALE, 
      0, 0
    );
  }
}