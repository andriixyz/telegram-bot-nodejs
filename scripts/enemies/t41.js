class t41 extends Tank {
    constructor(x, y) {
        super(50, 75, 10, x, y, 48, 48);
        this.tag = "Enemy";
        this.animationController.addAnimation("up", 100);
        this.animationController.addAnimation("right", 100);
        this.animationController.addAnimation("down", 100);
        this.animationController.addAnimation("left", 100);
        this.animationController.addSpriteToAnimation(
            "up",
            "sprites/red/vv11.png",
            this.width,
            this.height
        );
        this.animationController.addSpriteToAnimation(
            "up",
            "sprites/red/vv12.png",
            this.width,
            this.height
        );
        this.animationController.addSpriteToAnimation(
            "right",
            "sprites/red/vv21.png",
            this.width,
            this.height
        );
        this.animationController.addSpriteToAnimation(
            "right",
            "sprites/red/vv22.png",
            this.width,
            this.height
        );
        this.animationController.addSpriteToAnimation(
            "down",
            "sprites/red/vv31.png",
            this.width,
            this.height
        );
        this.animationController.addSpriteToAnimation(
            "down",
            "sprites/red/vv32.png",
            this.width,
            this.height
        );
        this.animationController.addSpriteToAnimation(
            "left",
            "sprites/red/vv41.png",
            this.width,
            this.height
        );
        this.animationController.addSpriteToAnimation(
            "left",
            "sprites/red/vv42.png",
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