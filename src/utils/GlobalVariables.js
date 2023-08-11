export class GlobalVariables {
  static get SPRITE_SIZE() { return 16 };
  static get TILE_SIZE() { return 128 };
  static get SCALE() { return 8 };
  static get ENTITY_SIZE() { return GlobalVariables.SPRITE_SIZE * GlobalVariables.SCALE };
  static get LINE_SPACING() { return 32; }
  static get IFRAME_WIDTH() { return "360px" };
  static get IFRAME_HEIGHT() { return "210px" };

  static GAME_WIDTH  = 1024;
  static GAME_HEIGHT = 768;
}