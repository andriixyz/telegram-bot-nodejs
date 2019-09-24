class Brick extends GameObject {
  constructor(health, x, y) {
    super(x, y, 0, 20, 20);
    this.tag = "Brick";
    this.health = health;
    this.layer = 1;
    this.animationController = new AnimationController();
    this.animationController.addAnimation("animation", 200);
    this.animationController.addSpriteToAnimation(
      "animation",
      "sprites/brick/brick.png",
      this.width,
      this.heigth
    );
    this.animationController.startAnimationDefault();
  }
  takeDamage(damage) {
    this.health -= damage;
    if (this.health <= 0) {
      this.destroy();
    }
  }
}
