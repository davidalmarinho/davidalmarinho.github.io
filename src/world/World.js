import { GlobalVariables } from "../utils/GlobalVariables.js";
import { BlockableTile } from "./BlockableTile.js";
import { Floor } from "./Floor.js";
import { Camera } from "./Camera.js";
import { Signal } from "../entities/Signal.js";
import { Entity } from "../entities/Entity.js";
import { Game } from "../main/Game.js";

export class World {
  static tilesList = [];
  static width  = 0;
  static height = 0;

  constructor(filename, width, height) {
    this.map     = new Image();
    this.map.src = filename;
    World.width   = width;
    World.height  = height;

    // Set the world dimensions in the Entity class to avoid circular dependency.
    Entity.setWorldDimensions(width, height);
  }

  init() {
    // Read image.
    const canvas = document.getElementById('canvas1');
    canvas.width  = World.width;
    canvas.height = World.height;
    const ctx = canvas.getContext('2d');
    ctx.drawImage(this.map, 0, 0);
    const imgData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    const data = imgData.data;

    // Depending of pixel's color, we gonna place a Tile.
    let pixelIndex = 0;
    for (let yy = 0; yy < World.height; yy++) {
      for (let xx = 0; xx < World.width; xx++) {
        const red   = data[pixelIndex];
        const green = data[pixelIndex + 1];
        const blue  = data[pixelIndex + 2];
        const alpha = data[pixelIndex + 3];

        const CURRENT_PIXEL = alpha * 256 * 256 * 256 + red * 256 * 256 + green * 256 + blue;
        if (CURRENT_PIXEL == 0xFF000000) {
          let floor = new Floor(xx * GlobalVariables.SPRITE_SIZE * GlobalVariables.SCALE,
                                yy * GlobalVariables.SPRITE_SIZE * GlobalVariables.SCALE,
                                0, 1);
          World.tilesList.push(floor);
        }
        else if (CURRENT_PIXEL == 0xFFffffff) {
          let wall = new BlockableTile(xx * GlobalVariables.SPRITE_SIZE * GlobalVariables.SCALE,
                                       yy * GlobalVariables.SPRITE_SIZE * GlobalVariables.SCALE,
                                       1, 0);
          World.tilesList.push(wall);
        }
        else if (CURRENT_PIXEL == 0xFF836152) {
          let floor = new Floor(xx * GlobalVariables.SPRITE_SIZE * GlobalVariables.SCALE,
            yy * GlobalVariables.SPRITE_SIZE * GlobalVariables.SCALE,
            0, 1);
          World.tilesList.push(floor);

          let signal = new Signal(xx * GlobalVariables.SPRITE_SIZE * GlobalVariables.SCALE,
                                  yy * GlobalVariables.SPRITE_SIZE * GlobalVariables.SCALE,
                                  GlobalVariables.ENTITY_SIZE, GlobalVariables.ENTITY_SIZE);
          Game.entitiesList.push(signal);
        }
        pixelIndex += 4;
      }
    }
  }

  draw(context) {
    let exponent = GlobalVariables.SPRITE_SIZE * GlobalVariables.SCALE;
    let xStart = Camera.x / exponent;
    xStart = Math.floor(xStart);
    let yStart = Camera.y / exponent;
    yStart = Math.floor(yStart);

    const canvas = document.getElementById('canvas1');
    let w = canvas.width;
    let h = canvas.height;
    let xFinal = xStart + Math.ceil(w / GlobalVariables.SPRITE_SIZE * GlobalVariables.SCALE);
    let yFinal = yStart + Math.ceil(h / GlobalVariables.SPRITE_SIZE * GlobalVariables.SCALE);

    for (let xx = xStart; xx <= xFinal; xx++) {
      for (let yy = yStart; yy <= yFinal; yy++) {
        if (xx < 0 || xx > World.width || yy < 0 || yy > World.height)
          continue;
        
        var tile = World.tilesList[xx + yy * World.width];
        if (tile != null)
          tile.draw(context)
      }
    }
  }

  static isFree(xNext, yNext, speed, width, height) {
    const X_START = Math.floor(xNext / GlobalVariables.TILE_SIZE);
    const Y_START = Math.floor(yNext / GlobalVariables.TILE_SIZE);

    const X_FINAL = Math.floor((xNext + width - speed) / GlobalVariables.TILE_SIZE);
    const Y_FINAL = Math.floor((yNext + height - speed) / GlobalVariables.TILE_SIZE);

    for (let x = X_START; x <= X_FINAL; x++) {
      for (let y = Y_START; y <= Y_FINAL; y++) {
        if (World.tilesList[x + y * World.width] instanceof BlockableTile) {
          return false;
        }
      }
    }

  return true;
}
}