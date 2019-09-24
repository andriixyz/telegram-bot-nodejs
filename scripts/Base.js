class Base extends GameObject {
  constructor(x, y) {
    super(x, y, 0, 40, 40);
    this.tag = "Base";
    this.health = 100;
    this.layer = 1;
    this.animationController = new AnimationController();
    this.animationController.addAnimation("animation", 200);
    this.animationController.addSpriteToAnimation(
      "animation",
      "sprites/base/base.png",
      this.width,
      this.heigth
    );

    this.animationController.resetAnimation(0);

    this.animationController.startAnimationDefault();
  }

  destroy() {
    map.deleteObject(this);
  }
  takeDamage(damage) {
    if (this.health <= 0) {
      this.destroy();
    }
    this.health -= damage;
    if (this.health <= 0) {
      this.destroy();
    }
  }
}
