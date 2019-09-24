class Anim {
  constructor(name, speed) {
    this.name = name;
    this.sprites = [];
    this.currentSprite = null;
    this.counter = 0;
    this.animationSpeed = speed;
    this.timer = null;
  }
  addSprite(path, width, height) {
    this.sprites.push(new Sprite(path, width, height));
  }
  start() {
    this.timer = setInterval(() => {
      if (this.counter > this.sprites.length - 1) {
        this.counter = 0;
      }
      this.currentSprite = this.sprites[this.counter];
      this.counter++;
    }, this.animationSpeed);
  }
  stop() {
    clearInterval(this.timer);
  }
  getCurrentSprite() {
    if (this.currentSprite == null) {
      this.currentSprite = this.sprites[this.counter];
    }
    return this.currentSprite.image;
  }
}
