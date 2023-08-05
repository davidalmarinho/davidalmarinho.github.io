export class Camera {
  static x = 0;
  static y = 0;

  static clamp(current, min, max) {
    if (current < min) {
      current = min;
    }

    if (current > max) {
      current = max;
    }

    return current;
  }
}