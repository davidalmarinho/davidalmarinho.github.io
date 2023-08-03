import { Spritesheet } from "../rendering/Spritesheet.js";

export class AssetPool {
  static playerSpritesheet = new Spritesheet("assets/textures/player.png", 256, 256);
  static museumSpritesheet = new Spritesheet("assets/tetxtures/museum.png", 256, 256);
}