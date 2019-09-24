class World {
  constructor() {
    this.objects = [];
    this.enemies = 0;
    this.base = true;
  }
  addObject(object) {
    this.objects.push(object);
    this.sortLayer();
  }
  checkCollision(x, y, width, height) {
    return new Promise(resolve => {
      for (let i = 0; i < this.objects.length; ++i) {
        if (
          x >= this.objects[i].x - width &&
          x <= this.objects[i].x + this.objects[i].width &&
          y >= this.objects[i].y - height &&
          y <= this.objects[i].y + this.objects[i].height
        ) {
          console.log(this.objects[i]);
          resolve(true);
        }
      }

      resolve(false);
    });
  }
  deleteObjectFromCoordinate(x, y) {
    for (let i = 0; i < this.objects.length; ++i) {
      if (this.objects[i].x == x && this.objects[i].y == y) {
        if (this.objects[i].name != "checkBlock") {
          this.deleteObject(this.objects[i]);
        }
      }
    }
  }
  deleteObject(object) {
    for (let i = 0; i < this.objects.length; ++i) {
      if (object == this.objects[i]) {
        if (object.tag == "Player") {
          console.log("11111111111");
          console.log("Player deleted");
          console.log("11111111111");
          player = null;
        }
        if (object.tag == "Enemy") {
          console.log("11111111111");
          console.log("Enemy deleted");
          console.log("11111111111");
          --this.enemies;
        }
        if (object.tag == "Base") {
          this.base = false;
        }
        this.objects[i] = null;
        this.objects.splice(i, 1);
      }
    }
  }
  sortLayer() {
    for (var i = 0; i < this.objects.length - 1; i++) {
      for (var j = 0; j < this.objects.length - 1 - i; j++) {
        if (this.objects[j + 1].layer < this.objects[j].layer) {
          var t = this.objects[j + 1];
          this.objects[j + 1] = this.objects[j];
          this.objects[j] = t;
        }
      }
    }
  }

  clean() {
    return new Promise((resolve, reject) => {
      while (this.objects.length >= 1) {
        if (this.objects[0] == undefined) {
          this.deleteObject(this.objects[0]);
        } else {
          this.objects[0].destroy();
        }
        console.log(1);
      }
      resolve(true);
      console.log(this.objects);
    });
  }
  freezeMap() {
    for (let i = 0; i < map.objects.length; ++i) {
      if (map.objects[i].freeze != null) map.objects[i].freeze();
    }
  }
  unFreezeMap() {
    for (let i = 0; i < map.objects.length; ++i) {
      if (map.objects[i].unFreeze != null) map.objects[i].unFreeze();
    }
  }
}
