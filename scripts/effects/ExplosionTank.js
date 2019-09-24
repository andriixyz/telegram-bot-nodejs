class ExplosionTank extends Effect {
    constructor(x, y) {
        super(x, y, 50, 50, 500);
        this.layer = 1;
        this.animationController.addAnimation("explosiontank", 100);

        this.animationController.addSpriteToAnimation(
            "explosiontank",
            "sprites/explosiontank/1.png",
            this.width,
            this.height
        );
        this.animationController.addSpriteToAnimation(
            "explosiontank",
            "sprites/explosiontank/2.png",
            this.width,
            this.height
        );
        this.animationController.addSpriteToAnimation(
            "explosiontank",
            "sprites/explosiontank/3.png",
            this.width,
            this.height
        );
        this.animationController.addSpriteToAnimation(
            "explosiontank",
            "sprites/explosiontank/4.png",
            this.width,
            this.height
        );
        this.animationController.addSpriteToAnimation(
            "explosiontank",
            "sprites/explosiontank/5.png",
            this.width,
            this.height
        );
        this.start();
    }
}