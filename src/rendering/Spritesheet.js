export class Spritesheet {
  constructor(filename, width, height) {
    this.image     = new Image();
    this.image.src = filename;
    this.width     = width;
    this.height    = height;
  }
}