class Speed extends GameObject {
    constructor(x, y) {
        super(x, y, 0, 40, 40);
        this.tag = "Speed";
        this.bonSpeed = 0;
        this.layer = 1;
        this.animationController = new AnimationController();
        this.animationController.addAnimation("speed", 300);


        this.animationController.addSpriteToAnimation(
            "speed",
            "sprites/speed/1.png",
            this.width,
            this.height
        );
        this.animationController.addSpriteToAnimation(
            "speed",
            "sprites/speed/2.png",
            this.width,
            this.height
        );
        this.animationController.start();
    }

    destroy() {
        this.animationController.stop();
        this.animationController = null;
        map.deleteObject(this);
    }
}