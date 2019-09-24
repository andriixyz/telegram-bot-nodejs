class ClassicEnemy extends Tank {
  constructor(x, y) {
    super(25, 1, 7, x, y, 35, 35);
    this.tag = "Enemy";
    this.animationController.addAnimation("up", 100);
    this.animationController.addAnimation("right", 100);
    this.animationController.addAnimation("down", 100);
    this.animationController.addAnimation("left", 100);
    this.animationController.addSpriteToAnimation(
      "up",
      "sprites/red/11.png",
      this.width,
      this.height
    );
    this.animationController.addSpriteToAnimation(
      "up",
      "sprites/red/12.png",
      this.width,
      this.height
    );
    this.animationController.addSpriteToAnimation(
      "right",
      "sprites/red/21.png",
      this.width,
      this.height
    );
    this.animationController.addSpriteToAnimation(
      "right",
      "sprites/red/22.png",
      this.width,
      this.height
    );
    this.animationController.addSpriteToAnimation(
      "down",
      "sprites/red/31.png",
      this.width,
      this.height
    );
    this.animationController.addSpriteToAnimation(
      "down",
      "sprites/red/32.png",
      this.width,
      this.height
    );
    this.animationController.addSpriteToAnimation(
      "left",
      "sprites/red/41.png",
      this.width,
      this.height
    );
    this.animationController.addSpriteToAnimation(
      "left",
      "sprites/red/42.png",
      this.width,
      this.height
    );

    this.animationController.resetAnimation(1); // пожалуйста, скопируй это
    this.AI = new AI();
    this.timerAI = setInterval(() => {
      this.AI.makeStep(this);
    }, 30);

    this.destroy = () => {
      Tank.prototype.destroy.call(this);
      clearInterval(this.timerAI);
      this.AI = null;
    };
  }
  freeze() {
    clearInterval(this.timerAI);
    clearInterval(this.moveTimer);
  }
  unFreeze() {
    this.timerAI = setInterval(() => {
      this.AI.makeStep(this);
    }, 30);
  }
}