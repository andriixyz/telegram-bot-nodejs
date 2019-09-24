class Titan extends GameObject {
  constructor(x, y) {
    super(x, y, 0, 20, 20);
    this.tag = "Titan";
    this.layer = 1;
    this.animationController = new AnimationController();
    this.animationController.addAnimation("animation", 200);
    this.animationController.addSpriteToAnimation(
      "animation",
      "sprites/titanblock/1.png",
      this.width,
      this.heigth
    );

    this.animationController.resetAnimation(0);

    this.animationController.startAnimationDefault();
  }
}
