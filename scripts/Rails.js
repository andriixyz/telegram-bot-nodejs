class Rails extends GameObject {
    constructor(x, y) {
        super(x, y, 0, 50, 56);
        this.tag = "Rails";
        this.layer = 0;
        this.animationController = new AnimationController();
        this.animationController.addAnimation("animation", 200);
        this.animationController.addSpriteToAnimation(
            "animation",
            "sprites/rails/rails.png",
            this.width,
            this.heigth
        );

        this.animationController.resetAnimation(0);

        this.animationController.startAnimationDefault();
    }
}