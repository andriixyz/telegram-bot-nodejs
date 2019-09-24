class Player extends Tank {
  constructor(x, y) {
    super(25, 50, 10, x, y, 35, 35);
    this.tag = "Player";
    this.animationController.addAnimation("up", 100);
    this.animationController.addAnimation("right", 100);
    this.animationController.addAnimation("down", 100);
    this.animationController.addAnimation("left", 100);

    this.animationController.addSpriteToAnimation(
      "up",
      "sprites/green/11.png",
      this.width,
      this.height
    );
    this.animationController.addSpriteToAnimation(
      "up",
      "sprites/green/12.png",
      this.width,
      this.height
    );
    this.animationController.addSpriteToAnimation(
      "right",
      "sprites/green/21.png",
      this.width,
      this.height
    );
    this.animationController.addSpriteToAnimation(
      "right",
      "sprites/green/22.png",
      this.width,
      this.height
    );
    this.animationController.addSpriteToAnimation(
      "down",
      "sprites/green/31.png",
      this.width,
      this.height
    );
    this.animationController.addSpriteToAnimation(
      "down",
      "sprites/green/32.png",
      this.width,
      this.height
    );
    this.animationController.addSpriteToAnimation(
      "left",
      "sprites/green/41.png",
      this.width,
      this.height
    );
    this.animationController.addSpriteToAnimation(
      "left",
      "sprites/green/42.png",
      this.width,
      this.height
    );
  }
}