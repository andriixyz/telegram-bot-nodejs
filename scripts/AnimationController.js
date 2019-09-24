class AnimationController {
  constructor() {
    this.animations = [];
    this.currentAnimation = 0;
  }
  addAnimation(name, speed) {
    this.animations.push(new Anim(name, speed));
  }
  addSpriteToAnimation(name, path, width, height) {
    for (let i = 0; i < this.animations.length; ++i) {
      if (this.animations[i].name == name) {
        this.animations[i].addSprite(path, width, height);
      }
    }
  }
  start() {
    this.animations[this.currentAnimation].start();
  }
  stop() {
    this.animations[this.currentAnimation].stop();
  }
  resetAnimation(toAnimation) {
    if (toAnimation == this.currentAnimation) {
      return;
    }
    this.stop();
    this.currentAnimation = toAnimation;
    this.start();
  }
  getCurrentSprite() {
    return this.animations[this.currentAnimation].getCurrentSprite();
  }
  startAnimationDefault() {
    this.animations[this.currentAnimation].start();
  }
}
