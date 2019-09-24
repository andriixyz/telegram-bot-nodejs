class Grass extends GameObject {
  constructor(x, y) {
    super(x, y, 0, 40, 40);
    this.tag = "Grass";
    this.layer = 2;
    this.animationController = new AnimationController();
    this.animationController.addAnimation("grass", 300);

    this.animationController.addSpriteToAnimation(
      "grass",
      "sprites/grass/1.png",
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
