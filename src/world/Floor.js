import { AssetPool } from "../utils/AssetPool.js";
import { Tile } from "./Tile.js";
import { Constants } from "../utils/Constants.js";

export class Floor extends Tile {
  constructor(x, y, frameX, frameY) {
    super(x, y, frameX, frameY);
  }

  draw(context) {
    context.drawImage(AssetPool.museumSpritesheet.image, 
      this.frameX * Constants.SPRITE_SIZE, this.frameY * Constants.SPRITE_SIZE, 
      Constants.SPRITE_SIZE, Constants.SPRITE_SIZE, 
      this.x, this.y, 
      Constants.SPRITE_SIZE * Constants.SCALE, Constants.SPRITE_SIZE * Constants.SCALE, 
      0, 0
    );
  }
};