class Damage extends GameObject {
    constructor(x, y) {
        super(x, y, 0, 40, 40);
        this.tag = "Damage";
        this.bonDamage = 100;
        this.layer = 1;
        this.animationController = new AnimationController();
        this.animationController.addAnimation("damage", 300);


        this.animationController.addSpriteToAnimation(
            "damage",
            "sprites/damage/1.png",
            this.width,
            this.height
        );
        this.animationController.addSpriteToAnimation(
            "damage",
            "sprites/damage/2.png",
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