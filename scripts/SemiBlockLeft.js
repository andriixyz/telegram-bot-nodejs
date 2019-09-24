class SemiBlockLeft extends GameObject {
  constructor(x, y) {
    super(x, y, 0, 0, 0);
    this.tag = "CustomBlock";
    this.layer = 1;

    map.addObject(new Brick(1, x, y));
    map.addObject(new Brick(1, x, y + 20));
  }

  destroy() {
    window.map.deleteObject(this);
  }
}
