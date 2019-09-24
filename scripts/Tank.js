class Tank extends GameObject {
  constructor(damage, health, speed, x, y, width, heigth) {
    super(x, y, 0, width, heigth);
    this.maximumHealth = 100;
    this.maximumSpeed = 0;
    this.maximumDamage = 100;
    this.minimumSpeed = 10;
    this.minimumDamage = 25;
    this.health = health;
    this.damage = damage;
    this.isMoving = false;
    this.speed = speed;
    this.barrel = new Barrel(Direction.up, 1000);
    this.animationController = new AnimationController();
    this.moveTimer = undefined;
    this.layer = 1;
  }
  shoot() {
    var turn = this.direction;
    var width = this.width / 2 - 3;
    var height = this.height / 2 - 3;
    var x = 0;
    var y = 0;
    switch (turn) {
      case 0: // up
        (x = 0), (y = -1);
        break;
      case 1: // right
        (x = 1), (y = 0);
        break;
      case 2: // down
        (x = 0), (y = 1);
        break;
      case 3: // left
        (x = -1), (y = 0);
        break;
    }
    this.barrel.shoot(
      this.x + width + x * width,
      this.y + height + y * height,
      this.tag,
      this.damage
    );
  }
  stop() {
    this.animationController.stop();
    this.isMoving = false;
    clearInterval(this.moveTimer);
  }
  move() {
    if (this.isMoving) {
      return;
    }
    this.animationController.start();
    switch (this.direction) {
      case Direction.up:
        this.isMoving = true;

        this.moveTimer = setInterval(() => {
          this.checkCollision(window.map, this.x, this.y - 1).then(res => {
            if (res) {
              this.y -= 1;
            }
          });
        }, this.speed);

        break;
      case Direction.right:
        this.isMoving = true;
        this.moveTimer = setInterval(() => {
          this.checkCollision(window.map, this.x + 1, this.y).then(res => {
            if (res) {
              this.x += 1;
            }
          });
        }, this.speed);

        break;
      case Direction.down:
        this.isMoving = true;

        this.moveTimer = setInterval(() => {
          this.checkCollision(window.map, this.x, this.y + 1).then(res => {
            if (res) {
              this.y += 1;
            }
          });
        }, this.speed);

        break;
      case Direction.left:
        this.isMoving = true;
        this.moveTimer = setInterval(() => {
          this.checkCollision(window.map, this.x - 1, this.y).then(res => {
            if (res) {
              this.x -= 1;
            }
          });
        }, this.speed);

        break;
    }
  }
  turnAround(turn) {
    if (turn != this.direction) {
      this.barrel.turnAround(turn);
      this.animationController.resetAnimation(turn);
      this.direction = turn;
      this.stop();
    }
  }
  destroy() {
    this.animationController.stop();
    this.barrel = null;
    this.animationController = null;
    clearInterval(this.moveTimer);
    window.map.deleteObject(this);
  }
  takeDamage(damage) {
    if (this.health <= 0) {
      map.addObject(new ExplosionTank(this.x, this.y));
      this.destroy();
    }
    this.health -= damage;
    if (this.health <= 0) {
      map.addObject(new ExplosionTank(this.x, this.y));
      this.destroy();
    }
  }
  restoreHealth(health) {
    if (health + this.health > this.maximumHealth) {
      this.health = this.maximumHealth;
    } else {
      this.health += health;
    }
  }

  bonusDamage(damage) {
    if (damage + this.damage > this.maximumDamage) {
      this.damage = this.maximumDamage;
      setTimeout(() => {
        this.damage = this.minimumDamage;
      }, 10000);
    }
  }
  bonusSpeed(speed) {
    if (speed + this.speed > this.maximumSpeed) {
      this.speed = this.maximumSpeed;
      setTimeout(() => {
        this.speed = this.minimumSpeed;
      }, 5000);
    }
  }

  checkCollision(map, xExpected, yExpected) {
    let x = xExpected;
    let y = yExpected;
    var width = this.width;
    var height = this.height;
    return new Promise((resolve, reject) => {
      for (var i = 0; i < map.objects.length; ++i) {
        if (map.objects[i] == this) {
          continue;
        }
        if (map.objects[i].tag == "Bullet") {
          continue;
        }
        if (map.objects[i].tag == "Grass") {
          continue;
        }
        if (map.objects[i].tag == "BrickBlock") {
          continue;
        }
        if (map.objects[i].tag == "CustomBlock") {
          continue;
        }
        if (
          x >= map.objects[i].x - width &&
          x <= map.objects[i].x + map.objects[i].width &&
          y >= map.objects[i].y - height &&
          y <= map.objects[i].y + map.objects[i].height
        ) {
          if (map.objects[i].tag == "Health") {
            this.restoreHealth(map.objects[i].healthRestores);
            map.objects[i].destroy();
            continue;
          }
          if (map.objects[i].tag == "Damage") {
            this.bonusDamage(map.objects[i].bonDamage);
            map.objects[i].destroy();
            continue;
          }
          if (map.objects[i].tag == "Speed") {
            this.bonusSpeed(map.objects[i].bonSpeed);
            map.objects[i].destroy();
            continue;
          }
          resolve(false);
        }
      }
      resolve(true);
    });
  }
}
