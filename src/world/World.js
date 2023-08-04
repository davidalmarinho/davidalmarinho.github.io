import { Constants } from "../utils/Constants.js";
import { BlockableTile } from "./BlockableTile.js";
import { Floor } from "./Floor.js"

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
    for (let xx = 0; xx < this.width; xx ++) {
      for (let yy = 0; yy < this.height; yy ++) {
        const red   = data[pixelIndex];
        const green = data[pixelIndex + 1];
        const blue  = data[pixelIndex + 2];
        const alpha = data[pixelIndex + 3];

        const CURRENT_PIXEL = alpha * 256 * 256 * 256 + red * 256 * 256 + green * 256 + blue;
        if (CURRENT_PIXEL == 0xFF000000) {
          let floor = new Floor(xx * Constants.SPRITE_SIZE * Constants.SCALE,
                                yy * Constants.SPRITE_SIZE * Constants.SCALE, 
                                0, 0);
          World.tilesList.push(floor);
        }
        else if (CURRENT_PIXEL == 0xFFffffff) {
          let wall = new BlockableTile(xx * Constants.SPRITE_SIZE * Constants.SCALE, 
                                       yy * Constants.SPRITE_SIZE * Constants.SCALE, 
                                       1, 0);
          World.tilesList.push(wall);
        }
        pixelIndex += 4;
      }
    }
  }

  draw(context) {
    for (let i = 0; i < World.tilesList.length; i++) {
      World.tilesList[i].draw(context);
    }
  }
}