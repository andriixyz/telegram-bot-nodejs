class AI {
  constructor() {}
  makeStep(tank) {
    if (tank == null) {
      return;
    }
    tank.move();
    tank.shoot();

    if (Math.floor(Math.random() * 20) == 5) {
      tank.turnAround(Math.floor(Math.random() * 4));
    }

    if (tank.isMoving) {
      switch (tank.direction) {
        case 0:
          tank.checkCollision(window.map, tank.x, tank.y - 1).then(res => {
            if (!res) {
              tank.turnAround(Math.floor(Math.random() * 4));
            }
          });
          break;
        case 1:
          tank.checkCollision(window.map, tank.x + 1, tank.y).then(res => {
            if (!res) {
              tank.turnAround(Math.floor(Math.random() * 4));
            }
          });
          break;
        case 2:
          tank.checkCollision(window.map, tank.x, tank.y + 1).then(res => {
            if (!res) {
              tank.turnAround(Math.floor(Math.random() * 4));
            }
          });
          break;
        case 3:
          tank.checkCollision(window.map, tank.x - 1, tank.y).then(res => {
            if (!res) {
              tank.turnAround(Math.floor(Math.random() * 4));
            }
          });
          break;
      }
    }
  }
}
