export class KeyListener {
  constructor() {
    this.keys = [];
    window.addEventListener('keydown', e => {
      if (this.keys.indexOf(e.key) === -1) {
        this.keys.push(e.key);
      }
    });

    window.addEventListener('keyup', e => {
      this.keys.splice(this.keys.indexOf(e.key), 1);
    });
  }

  isKeyPressed(key) {
    return this.keys.indexOf(key) > -1;
  }
}