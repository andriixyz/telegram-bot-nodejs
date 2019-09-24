function action(e) {
  if (player == null) {
    return;
  }
  switch (e.keyCode) {
    case 38:
      player.turnAround(0);
      player.move();
      break;
    case 39:
      player.turnAround(1);
      player.move();
      break;
    case 40:
      player.turnAround(2);
      player.move();
      break;
    case 37:
      player.turnAround(3);
      player.move();
      break;
    case 32:
      player.shoot(0);
      break;
  }
}
function disAction(e) {
  if (player == null) {
    return;
  }

  if (e.keyCode != 32) {
    player.stop();
  }
}

document.onkeydown = action;
document.onkeyup = disAction;
