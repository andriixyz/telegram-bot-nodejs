class Lava extends GameObject {
  constructor(x, y) {
    super(x, y, 0, 40, 40);
    this.tag = "Lava";
    this.layer = 0;
    this.animationController = new AnimationController();
    this.animationController.addAnimation("Lava", 100);
    this.animationController.addSpriteToAnimation(
      "Lava",
      "sprites/lava/10001.png",
      this.width,
      this.height
    );
    for (let i = 10002; i < 10045; ++i) {
      let path = "sprites/lava/" + i + ".png";

      this.animationController.addSpriteToAnimation(
        "Lava",
        path,
        this.width,
        this.height
      );
    }

    this.animationController.start();
  }
  destroy() {
    this.animationController.stop();
    this.animationController = null;
    map.deleteObject(this);
  }
}
