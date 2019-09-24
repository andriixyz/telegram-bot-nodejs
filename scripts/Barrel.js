class Barrel extends GameObject {
  constructor(direction, reloadTime) {
    super(0, 0, 0, 0, 0);
    this.isShooted = false;
    this.timer = null;
    this.direction = direction;
    this.reloadTime = reloadTime;
  }
  shoot(x, y, parent, damage) {
    if (!this.isShooted) {
      this.isShooted = true;
      window.map.addObject(
        new Bullet(damage, 5, x, y, 5, 5, this.direction, parent)
      );

      this.timer = setTimeout(() => {
        this.isShooted = false;
      }, this.reloadTime);
    }
  }
  setPosition(x, y) {
    this.x = x;
    this.y = y;
  }
  turnAround(turn) {
    this.direction = turn;
  }
}
