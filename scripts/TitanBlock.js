class TitanBlock extends GameObject {
  constructor(x, y) {
    super(x, y, 0, 0, 0);
    this.tag = "CustomBlock";
    this.layer = 1;

    map.addObject(new Titan(x, y));
    map.addObject(new Titan(x, y + 20));
    map.addObject(new Titan(x + 20, y + 20));
    map.addObject(new Titan(x + 20, y));
  }

  destroy() {
    window.map.deleteObject(this);
  }
}
