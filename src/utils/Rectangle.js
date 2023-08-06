export class Rectangle {
  constructor(x, y, width, height) {
    this.x = x;
    this.y = y;
    this.width  = width;
    this.height = height;
  }

  intersects(otherRectangle) {
    return (
      this.x < otherRectangle.x + otherRectangle.width &&
      this.x + this.width > otherRectangle.x &&
      this.y < otherRectangle.y + otherRectangle.height &&
      this.y + this.height > otherRectangle.y
    );
  }

  // Checks if a point is inside the rectangle.
  contains(x, y) {
    return (
      x >= this.x && x <= this.x + this.width &&
      y >= this.y && y <= this.y + this.height
    );
  }
}