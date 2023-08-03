export class World {
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
    for (let i = 0; i < data.length; i += 4) {
      const red   = data[i];
      const green = data[i + 1];
      const blue  = data[i + 2];
      const alpha = data[i + 3];

      const CURRENT_PIXEL = alpha * 256 * 256 * 256 + red * 256 * 256 + green * 256 + blue;
      switch (CURRENT_PIXEL) {
        case 0xFFffffff:
          // Place floor.
          // console.log("White has been found!");
          break;
        case 0xFF000000:
          // console.log("Black has been found");
          break;
      }
    }
  }
}