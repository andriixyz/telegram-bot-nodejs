class Effect extends GameObject {
  constructor(x, y, width, height, duration) {
    super(x, y, 0, width, height);
    this.tag = "Effect";
    this.duration = duration;
    this.animationController = new AnimationController();
  }
  destroy() {
    if (this.animationController != null) {
      this.animationController.stop();
      this.animationController = null;
      map.deleteObject(this);
    }
  }
  start() {
    this.animationController.start();
    setTimeout(() => {
      this.destroy();
    }, this.duration);
  }
}
