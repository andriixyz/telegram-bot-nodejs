class Bullet extends GameObject {
  constructor(damage, speed, x, y, width, heigth, direction, parent) {
    super(x, y, direction, width, heigth);
    this.tag = "Bullet";
    this.speed = speed;
    this.damage = damage;
    this.parent = parent;
    this.layer = 1;
    this.animationController = new AnimationController();
    this.animationController.addAnimation(new Anim("bullet", 100));

    this.animationController.animations[0].addSprite(
      "sprites/bullet/bullet.png",
      width,
      heigth
    );
    this.animationController.resetAnimation(0);
    this.animationController.startAnimationDefault();

    this.timer = setTimeout(() => {
      this.destroy();
    }, 3000);
    this.movement = setInterval(() => {
      this.checkCollision(this.x, this.y);
      this.move();
    }, this.speed);
  }
  destroy() {
    clearInterval(this.movement);
    this.speed = 0;
    this.animationController.stop();
    map.deleteObject(this);
  }
  move() {
    switch (this.direction) {
      case Direction.up:
        this.y -= 1;
        break;
      case Direction.right:
        this.x += 1;
        break;
      case Direction.down:
        this.y += 1;
        break;
      case Direction.left:
        this.x -= 1;
    }
  }
  checkCollision(xExpected, yExpected) {
    let x = xExpected;
    let y = yExpected;
    var width = this.width;
    var height = this.height;

    for (var i = 0; i < map.objects.length; ++i) {
      if (
        x >= map.objects[i].x - width &&
        x <= map.objects[i].x + map.objects[i].width &&
        y >= map.objects[i].y - height &&
        y <= map.objects[i].y + map.objects[i].height
      ) {
        if (map.objects[i] == this) {
          continue;
        }
        if (map.objects[i].tag == this.parent) {
          continue;
        }
        switch (map.objects[i].tag) {
          case "Bullet":
            map.addObject(new Explosion(this.x, this.y));
            this.destroy();
            return;
          case "Brick":
            map.addObject(new Explosion(this.x, this.y));
            this.destroy();
            map.objects[i].takeDamage(this.damage);
            return;
          case "Titan":
            map.addObject(new Explosion(this.x, this.y));
            this.destroy();
            return;
          case "TitanBlock":
            map.addObject(new Explosion(this.x, this.y));
            this.destroy();
            return;
          case "Base":
            map.addObject(new Explosion(this.x, this.y));
            this.destroy();
            map.objects[i].takeDamage(this.damage);
            return;
          case "Boss":
            map.addObject(new Explosion(this.x, this.y));
            this.destroy();
            map.objects[i].takeDamage(this.damage);
        }

        if (Tank.prototype.isPrototypeOf(map.objects[i])) {
          if (map.objects[i].tag != this.parent) {
            map.addObject(new Explosion(this.x, this.y));
            this.destroy();
            map.objects[i].takeDamage(this.damage);
            return;
          }
        }
      }
    }
  }
  freeze() {
    clearInterval(this.timer);
    clearInterval(this.movement);
  }
  unFreeze() {
    this.timer = setTimeout(() => {
      this.destroy();
    }, 3000);
    this.movement = setInterval(() => {
      this.checkCollision(this.x, this.y);
      this.move();
    }, this.speed);
  }
}