import { Spritesheet } from "../rendering/Spritesheet.js";

export class AssetPool {
  static playerSpritesheet = new Spritesheet("assets/textures/player.png", 256, 256);
  static museumSpritesheet = new Spritesheet("assets/textures/museum.png", 256, 256);
}