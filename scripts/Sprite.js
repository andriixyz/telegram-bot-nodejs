class Sprite {
  constructor(path, width, heigth) {
    this.image = new Image(width, heigth);

    this.image.src = path;
  }
}
