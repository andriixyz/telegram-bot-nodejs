class GameObject {
  constructor(x, y, direction, width, height, tag) {
    this.x = x;
    this.y = y;
    this.direction = direction;
    this.width = width;
    this.height = height;
    this.tag = tag;
    this.layer = 0;
  }
  destroy() {
    window.map.deleteObject(this);
  }
}
