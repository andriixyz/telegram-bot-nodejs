class TrainBoss extends GameObject {
  constructor(x, y) {
    super(x, y, 0, 250, 50);
    this.turnAround(Direction.left);
    this.tag = "Boss";
    this.maximumHealth = 700;
    this.health = 700;
    this.damage = 25;
    this.isMoving = false;
    this.speed = 5;
    this.sideShoots = true;
    this.animationController = new AnimationController();
    this.animationController.addAnimation("boss", 200);
    this.animationController.addSpriteToAnimation(
      "boss",
      "sprites/boss/boss.png",
      this.width,
      this.heigth
    );
    this.barrels = [
      new Barrel(Direction.down, 1800),
      new Barrel(Direction.down, 1800),
      new Barrel(Direction.down, 1800),
      new Barrel(Direction.down, 1800),
      new Barrel(Direction.down, 1800),
      new Barrel(Direction.down, 1800)
    ];
    this.leftBarrels = [
      new Barrel(Direction.left, 2000),
      new Barrel(Direction.left, 2000),
      new Barrel(Direction.left, 2000),
      new Barrel(Direction.left, 2000),
      new Barrel(Direction.left, 2000),
      new Barrel(Direction.right, 2000),
      new Barrel(Direction.right, 2000),
      new Barrel(Direction.right, 2000),
      new Barrel(Direction.right, 2000),
      new Barrel(Direction.right, 2000)
    ];
    this.moveTimer = undefined;
    this.layer = 1;
    this.moveTo = -400;
    this.maxRangeX = {
      from: -500,
      to: 800
    };

    this.thinking = setInterval(() => {
      this.shoot();
      this.move();
      if (this.sideShoots) {
        this.leftRigthShoot();
      }
      if (this.x <= this.moveTo) {
        this.sideShoots = false;
      }

      if (this.direction == Direction.left) {
        if (this.x <= this.moveTo) {
          this.moveTo =
            Math.random() * (this.maxRangeX.to - this.maxRangeX.from) +
            this.maxRangeX.from;
          console.log(this.moveTo);
          if (this.moveTo > this.x) {
            this.turnAround(Direction.right);
          } else {
            this.turnAround(Direction.left);
          }
        }
      }
      if (this.direction == Direction.right) {
        if (this.x >= this.moveTo) {
          this.moveTo =
            Math.random() * (this.maxRangeX.to - this.maxRangeX.from) +
            this.maxRangeX.from;
          console.log(this.moveTo);
          if (this.moveTo > this.x) {
            this.turnAround(Direction.right);
          } else {
            this.turnAround(Direction.left);
          }
        }
      }
    }, 30);
  }
  turnAround(turn) {
    if (turn != this.direction) {
      this.direction = turn;
      this.stop();
    }
  }
  leftRigthShoot() {
    var range = this.height / this.leftBarrels.length;
    var counter = 0;
    for (let i = 0; i < this.leftBarrels.length; ++i) {
      var x;
      var y = this.y;
      if (this.leftBarrels[i].direction == Direction.right) {
        x = this.x + this.width;
        y = y - this.height * 1.3;
      } else {
        x = this.x;
        y = y - this.height / 6.5;
      }
      this.damage = 3000;
      this.leftBarrels[i].shoot(x, y + counter, this.tag, this.damage);
      counter += range * 2.5;
      this.damage = 25;
    }
  }
  stop() {
    this.isMoving = false;
    clearInterval(this.moveTimer);
  }
  shoot() {
    var range = this.width / this.barrels.length;
    var counter = 0;
    for (let i = 0; i < this.barrels.length; ++i) {
      this.barrels[i].shoot(
        this.x + counter,
        this.y + this.height,
        this.tag,
        this.damage
      );
      counter += range * 1.1;
    }
  }
  move() {
    if (this.isMoving) {
      return;
    }
    switch (this.direction) {
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
        if (map.objects[i].tag == "Rails") {
          continue;
        }
        if (map.objects[i].tag == "Grass") {
          continue;
        }

        if (
          x >= map.objects[i].x - width &&
          x <= map.objects[i].x + map.objects[i].width &&
          y >= map.objects[i].y - height &&
          y <= map.objects[i].y + map.objects[i].height
        ) {
          resolve(false);
        }
      }
      resolve(true);
    });
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
  destroy() {
    for (let i = 0; i < this.barrels.length; ++i) {
      this.barrels[i] = null;
    }
    clearInterval(this.thinking);
    clearInterval(this.moveTimer);
    window.map.deleteObject(this);
  }
  freeze() {
    clearInterval(this.thinking);
  }
  unFreeze() {
    this.thinking = setInterval(() => {
      this.shoot();
      this.move();
      if (this.sideShoots) {
        this.leftRigthShoot();
      }
      if (this.x <= this.moveTo) {
        this.sideShoots = false;
      }

      if (this.direction == Direction.left) {
        if (this.x <= this.moveTo) {
          this.moveTo =
            Math.random() * (this.maxRangeX.to - this.maxRangeX.from) +
            this.maxRangeX.from;
          console.log(this.moveTo);
          if (this.moveTo > this.x) {
            this.turnAround(Direction.right);
          } else {
            this.turnAround(Direction.left);
          }
        }
      }
      if (this.direction == Direction.right) {
        if (this.x >= this.moveTo) {
          this.moveTo =
            Math.random() * (this.maxRangeX.to - this.maxRangeX.from) +
            this.maxRangeX.from;
          console.log(this.moveTo);
          if (this.moveTo > this.x) {
            this.turnAround(Direction.right);
          } else {
            this.turnAround(Direction.left);
          }
        }
      }
    }, 30);
  }
}