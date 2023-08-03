export class KeyListener {
  constructor() {
    this.keys = [];
    window.addEventListener('keydown', e => {
      if ((e.key === 'w' || e.key === 'a' || e.key === 's' || e.key === 'd' ||
          e.key === 'ArrowDown' || e.key === 'ArrowUp' || e.key === 'ArrowLeft' || e.key === 'ArrowRight') &&
          this.keys.indexOf(e.key) === -1) {
        this.keys.push(e.key);
      }
    });

    window.addEventListener('keyup', e => {
      if (e.key === 'w' || e.key === 'a' || e.key === 's' || e.key === 'd' ||
          e.key === 'ArrowDown' || e.key === 'ArrowUp' || e.key === 'ArrowLeft' || e.key === 'ArrowRight') {
        this.keys.splice(this.keys.indexOf(e.key), 1);
      }
    });
  }

  isKeyPressed(key) {
    return this.keys.indexOf(key) > -1;
  }
}