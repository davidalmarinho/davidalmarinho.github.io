import { GlobalVariables } from "../utils/GlobalVariables.js";
import { BlockableTile } from "./BlockableTile.js";
import { Floor } from "./Floor.js"
import { Camera } from "./Camera.js"

export class World {
  static tilesList = [];

  constructor(filename, width, height) {
    this.map     = new Image();
    this.map.src = filename;
    this.width   = width;
    this.height  = height;

    this.map.onload = () => {
      this.init();
    }
  }

  init() {
    // Read image.
    const canvas = document.getElementById('canvas1');
    canvas.width  = this.width;
    canvas.height = this.height;
    const ctx = canvas.getContext('2d');
    ctx.drawImage(this.map, 0, 0);
    const imgData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    const data = imgData.data;

    // Depending of pixel's color, we gonna place a Tile.
    let pixelIndex = 0;
    for (let yy = 0; yy < this.height; yy++) {
      for (let xx = 0; xx < this.width; xx++) {
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
        if (xx < 0 || xx > this.width || yy < 0 || yy > this.height)
          continue;
        
        var tile = World.tilesList[xx + yy * this.width];
        if (tile != null)
          tile.draw(context)
      }
    }

    /*for (let xx = 0; xx < 20; xx++) {
      for (let yy = 0; yy < 20; yy++) {
        // if (xx < 0 || xx >= this.width || yy < 0 || yy >= this.height)
        // continue;
        
        var tile = World.tilesList[xx + yy * this.width];
        if (tile != null)
          tile.draw(context)
      }
    }*/
  }
}