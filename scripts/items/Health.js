class Health extends GameObject {
  constructor(x, y) {
    super(x, y, 0, 40, 40);
    this.healthRestores = 25;
    this.tag = "Health";
    this.layer = 1;
    this.animationController = new AnimationController();
    this.animationController.addAnimation("health", 300);


    this.animationController.addSpriteToAnimation(
      "health",
      "sprites/health/1.png",
      this.width,
      this.height
    );
    this.animationController.addSpriteToAnimation(
      "health",
      "sprites/health/2.png",
      this.width,
      this.height
    );
    this.animationController.start();
  }

  destroy() {
    this.animationController.stop();
    this.animationController = null;
    map.deleteObject(this);
  }
}