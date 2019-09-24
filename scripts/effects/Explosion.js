class Explosion extends Effect {
  constructor(x, y) {
    super(x, y, 20, 20, 300);
    this.layer = 1;
    this.animationController.addAnimation("explosion", 60);

    this.animationController.addSpriteToAnimation(
      "explosion",
      "sprites/explosion/1.png",
      this.width,
      this.height
    );
    this.animationController.addSpriteToAnimation(
      "explosion",
      "sprites/explosion/2.png",
      this.width,
      this.height
    );
    this.animationController.addSpriteToAnimation(
      "explosion",
      "sprites/explosion/3.png",
      this.width,
      this.height
    );
    this.animationController.addSpriteToAnimation(
      "explosion",
      "sprites/explosion/4.png",
      this.width,
      this.height
    );
    this.animationController.addSpriteToAnimation(
      "explosion",
      "sprites/explosion/5.png",
      this.width,
      this.height
    );
    this.start();
  }
}