var canvas = document.getElementById("game-canvas");
var ctx = canvas.getContext("2d");
var gameWidth = canvas.clientWidth;
var gameWidth = canvas.clientHeight;
var map = new World();
var spawnPlayer;
var enemies = 0;
var currentStage = 1;
var stageCount = 2;
var gameEnd = false;
let player;
let timer;
let score = 0;
let scoreTimer;
let timerSpawn;
canvas.addEventListener("click", function(evt) {
  var mousePos = getMousePos(canvas, evt);
  console.log(mousePos.x);
  console.log(mousePos.y);
});

function getMousePos(canvas, evt) {
  var rect = canvas.getBoundingClientRect();
  return {
    x: evt.clientX - rect.left,
    y: evt.clientY - rect.top
  };
}

function mapEditor() {
  var my_awesome_script = document.createElement("script");
  my_awesome_script.setAttribute("src", "scripts/MapEditor.js");
  document.head.appendChild(my_awesome_script);
}
document.addEventListener(
  "keypress",
  function(e) {
    if (e.keyCode === 13) {
      toggleFullScreen();
    }
  },
  false
);

function toggleFullScreen() {
  if (!document.fullscreenElement) {
    document.documentElement.requestFullscreen();
  } else {
    if (document.exitFullscreen) {
      document.exitFullscreen();
    }
  }
}
let healthBar = document.getElementById("player-health");

canvas.addEventListener(
  "click",
  function(evt) {
    var mousePos = getMousePos(canvas, evt);
  },
  false
);

//Get Mouse Position
function getMousePos(canvas, evt) {
  var rect = canvas.getBoundingClientRect();
  return {
    x: evt.clientX - rect.left,
    y: evt.clientY - rect.top
  };
}

function nextStage() {
  clearInterval(timer);
  clearInterval(scoreTimer);
  ctx.clearRect(0, 0, canvas.clientWidth, canvas.clientHeight);
  ChangeStage().then(res => {
    map.unFreezeMap();
    timer = setInterval(function() {
      Update();
    }, 10);
    scoreTimer = setInterval(function() {
      ++score;
    }, 1000);
  });
}

function ChangeStage() {
  return new Promise(resolve => {
    setTimeout(() => {
      map.clean().then(res => {
        for (let i = 0; i < 32; ++i) {
          map.addObject(new Brick(9999, 0, i * 20, 20, 20));
          map.addObject(new Brick(9999, i * 20, 31 * 20, 20, 20));
          map.addObject(new Brick(9999, i * 20, 0, 20, 20));
          map.addObject(new Brick(9999, 31 * 20, i * 20, 20, 20));
        }

        stages[currentStage].generate();
        player = new Player(
          stageConfig.spawnPlayer.x,
          stageConfig.spawnPlayer.y
        );
        map.addObject(player);
        map.freezeMap();
        resolve(true);
      });
    }, 3000);

    gameEnd = false;
    timerSpawn = setInterval(() => {
      let spawnRandom = Math.floor(
        Math.random() * stageConfig.spawnEnemies.length
      );
      let spawn = stageConfig.spawnEnemies[spawnRandom];
      let enemy = stageConfig.enemies[0];
      if (stageConfig.enemies.length == 0) {
        clearInterval(timerSpawn);
      }
      map.checkCollision(spawn.x, spawn.y, 25, 25).then(res => {
        if (!res) {
          map.addObject(new enemy(spawn.x, spawn.y));
          stageConfig.enemies.splice(0, 1);
        }
      });
    }, 3000);

    ctx.font = "50px Arial";
    ctx.fillStyle = "red";
    ctx.fillText(stages[currentStage].name, 175, canvas.height / 2);
  });
}

function startGame1() {
  nextStage();
}

function startGame2() {
  ctx.fillStyle = "black";
  ctx.fillRect(0, 0, 640, 640);
}

function Update() {
  if (!gameEnd) {
    if (map.enemies == 0) {
      ++currentStage;
      nextStage();
      return;
    }
    if (map.base == false) {
      gameEnd = true;
      clearInterval(timer);
      clearInterval(scoreTimer);

      alert("YOU ARE LOSE! Your score is: " + score);
      score = 0;

      document.location.reload(true);
      return;
    }
    if (player == null) {
      clearInterval(timer);
      clearInterval(scoreTimer);
      gameEnd = true;

      alert("YOU ARE LOSE! Your score is: " + score);
      score = 0;
      document.location.reload(true);
      return;
    }
    if (player != null) {
      healthBar.innerHTML = player.health;
    }

    Draw();
  }
}

function Draw() {
  ctx.clearRect(0, 0, canvas.clientWidth, canvas.clientHeight);

  ctx.fillStyle = "black";
  ctx.fillRect(0, 0, 640, 640);
  if (player != null && player.animationController != null) {
    ctx.drawImage(
      player.animationController.getCurrentSprite(),
      player.x,
      player.y,
      player.width,
      player.height
    );
  }

  if (map.objects.length != 0) {
    for (let i = 0; i < map.objects.length; ++i) {
      let object = map.objects[i];
      if (Player.prototype.isPrototypeOf(map.objects[i])) {
        continue;
      }
      if (map.objects[i].animationController == null) {
        ctx.fillStyle = "purple";
        ctx.fillRect(object.x, object.y, object.width, object.height);
        continue;
      }
      ctx.drawImage(
        object.animationController.getCurrentSprite(),
        object.x,
        object.y,
        object.width,
        object.height
      );
    }
  }
}
