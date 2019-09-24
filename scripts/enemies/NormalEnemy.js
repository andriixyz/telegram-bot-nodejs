class NormalEnemy extends Tank {
    constructor(x, y) {
        super(35, 50, 10, x, y, 35, 35);
        this.tag = "Enemy";
        this.animationController.addAnimation("up", 100);
        this.animationController.addAnimation("right", 100);
        this.animationController.addAnimation("down", 100);
        this.animationController.addAnimation("left", 100);
        this.animationController.addSpriteToAnimation(
            "up",
            "sprites/red/v11.png",
            this.width,
            this.height
        );
        this.animationController.addSpriteToAnimation(
            "up",
            "sprites/red/v12.png",
            this.width,
            this.height
        );
        this.animationController.addSpriteToAnimation(
            "right",
            "sprites/red/v21.png",
            this.width,
            this.height
        );
        this.animationController.addSpriteToAnimation(
            "right",
            "sprites/red/v22.png",
            this.width,
            this.height
        );
        this.animationController.addSpriteToAnimation(
            "down",
            "sprites/red/v31.png",
            this.width,
            this.height
        );
        this.animationController.addSpriteToAnimation(
            "down",
            "sprites/red/v32.png",
            this.width,
            this.height
        );
        this.animationController.addSpriteToAnimation(
            "left",
            "sprites/red/v41.png",
            this.width,
            this.height
        );
        this.animationController.addSpriteToAnimation(
            "left",
            "sprites/red/v42.png",
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