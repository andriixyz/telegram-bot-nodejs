class Water extends GameObject {
  constructor(x, y) {
    super(x, y, 0, 40, 40);
    this.tag = "Water";
    this.layer = 0;
    this.animationController = new AnimationController();
    this.animationController.addAnimation("Water", 300);
    this.animationController.addSpriteToAnimation(
      "Water",
      "sprites/water/1.png",
      this.width,
      this.height
    );
    this.animationController.addSpriteToAnimation(
      "Water",
      "sprites/water/2.png",
      this.width,
      this.height
    );
    this.animationController.addSpriteToAnimation(
      "Water",
      "sprites/water/3.png",
      this.width,
      this.height
    );

    this.animationController.start();
  }
  destroy() {
    this.animationController.stop();
    this.animationController = null;
    super.destroy();
  }
}
