class Wood extends Effect {
  constructor(x, y) {
    super(x, y, 100, 100, 10000);
    this.layer = 1;
    this.animationController.addAnimation("explosion", 70);

    this.animationController.addSpriteToAnimation(
      "explosion",
      "sprites/test/2.png",
      this.width,
      this.height
    );
    this.animationController.addSpriteToAnimation(
      "explosion",
      "sprites/test/3.png",
      this.width,
      this.height
    );
    this.animationController.addSpriteToAnimation(
      "explosion",
      "sprites/test/4.png",
      this.width,
      this.height
    );
    this.animationController.addSpriteToAnimation(
      "explosion",
      "sprites/test/5.png",
      this.width,
      this.height
    );
    this.animationController.addSpriteToAnimation(
      "explosion",
      "sprites/test/6.png",
      this.width,
      this.height
    );
    this.animationController.addSpriteToAnimation(
      "explosion",
      "sprites/test/7.png",
      this.width,
      this.height
    );
    this.animationController.addSpriteToAnimation(
      "explosion",
      "sprites/test/8.png",
      this.width,
      this.height
    );
    this.animationController.addSpriteToAnimation(
      "explosion",
      "sprites/test/9.png",
      this.width,
      this.height
    );
    this.animationController.addSpriteToAnimation(
      "explosion",
      "sprites/test/10.png",
      this.width,
      this.height
    );
    this.start();
  }
}
