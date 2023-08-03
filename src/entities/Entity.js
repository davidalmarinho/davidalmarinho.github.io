export class Entity {
  constructor(x, y, width, height) {
    this.x = x;
    this.y = y;
    this.width  = width;
    this.height = height;
  }

  tick(keyListener) { }
  draw(context) { }
}