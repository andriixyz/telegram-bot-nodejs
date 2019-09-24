var canvas = document.getElementById("game-canvas");
var ctx = canvas.getContext("2d");
var paletteItemsContainer = document.getElementById("palette-itmes");
ctx.fillStyle = "black";
ctx.fillRect(0, 0, 640, 640);
var ctx = canvas.getContext("2d");
var gameWidth = canvas.clientWidth;
var gameWidth = canvas.clientHeight;
var grid = [[]];
var tempInfo = [];
ctx.fillStyle = "black";
ctx.fillRect(0, 0, 640, 640);
for (let i = 0; i < 16; ++i) {
  for (let j = 0; j < 16; ++j) {
    ctx.strokeStyle = "white";
    map.addObject({ name: "checkBlock", x: i * 40, y: j * 40 });
    ctx.strokeRect(i * 40, j * 40, 40, 40);
  }
}
var currentItem = null;
var selectedItem = null;
var mover = null;
var temp = new Image();
temp.className = "avatar";

temp.style.position = "absolute";
paletteItemsContainer.appendChild(temp);

var items = [
  { item: Water, srcIcon: "sprites/water/1.png" },
  { item: Lava, srcIcon: "sprites/lava/10001.png" },
  { item: BrickBlock, srcIcon: "sprites/brick/brick.png" },
  { item: SemiBlockUp, srcIcon: "sprites/brick/brick.png" },
  { item: SemiBlockRight, srcIcon: "sprites/brick/brick.png" },
  { item: SemiBlockDown, srcIcon: "sprites/brick/brick.png" },
  { item: SemiBlockLeft, srcIcon: "sprites/brick/brick.png" },
  { item: TitanBlock, srcIcon: "sprites/titanblock/1.png" },
  { item: TitanUp, srcIcon: "sprites/titanblock/1.png" },
  { item: TitanRight, srcIcon: "sprites/titanblock/1.png" },
  { item: TitanDown, srcIcon: "sprites/titanblock/1.png" },
  { item: TitanLeft, srcIcon: "sprites/titanblock/1.png" },
  { item: Base, srcIcon: "sprites/base/base.png" },
  { item: Grass, srcIcon: "sprites/grass/1.png" },
  { item: Latex, srcIcon: "sprites/latex/latex.png" }
];

var paletteItems = [];
for (let i = 0; i < items.length; ++i) {
  paletteItems.push(new Image(32, 32));
  paletteItems[i].src = items[i].srcIcon;

  paletteItems[i].onclick = () => {
    temp.width = paletteItems[i].width;
    temp.height = paletteItems[i].height;
    temp.src = paletteItems[i].src;

    selectItem(items[i].item);
  };
  paletteItemsContainer.appendChild(paletteItems[i]);
}
function selectItem(item) {
  currentItem = item;
  function updateAvatarPosition(e) {
    document.getElementsByClassName("avatar")[0].style.left = e.x + "px";
    document.getElementsByClassName("avatar")[0].style.top = e.y + "px";
  }

  document.onmousemove = updateAvatarPosition;
}
map.freezeMap();
canvas.addEventListener(
  "click",
  function(evt) {
    var mousePos = getMousePos(canvas, evt);
    console.log(mousePos.x);
    console.log(mousePos.y);
    for (let i = 0; i < map.objects.length; ++i) {
      if (map.objects[i].name != "checkBlock") {
        continue;
      }
      if (
        mousePos.x >= map.objects[i].x &&
        mousePos.x <= map.objects[i].x + 40 &&
        mousePos.y >= map.objects[i].y &&
        mousePos.y <= map.objects[i].y + 40
      ) {
        if (currentItem == "class Latex {}") {
          for (let i = 0; i < map.objects.length; ++i) {
            if (
              mousePos.x >= map.objects[i].x &&
              mousePos.x <= map.objects[i].x + 40 &&
              mousePos.y >= map.objects[i].y &&
              mousePos.y <= map.objects[i].y + 40
            ) {
              console.log(map.objects[i]);
              if (map.objects[i].name != "checkBlock") {
                map.deleteObjectFromCoordinate(
                  map.objects[i].x,
                  map.objects[i].y
                );
                draw();
                return;
              }
            }
          }
        }

        map.addObject(new currentItem(map.objects[i].x, map.objects[i].y));
      }
    }

    draw();
  },
  false
);

function getMousePos(canvas, evt) {
  var rect = canvas.getBoundingClientRect();
  return {
    x: evt.clientX - rect.left,
    y: evt.clientY - rect.top
  };
}

function draw() {
  ctx.clearRect(0, 0, canvas.clientWidth, canvas.clientHeight);

  ctx.fillStyle = "black";
  ctx.fillRect(0, 0, 640, 640);
  for (let i = 0; i < 16; ++i) {
    for (let j = 0; j < 16; ++j) {
      ctx.strokeStyle = "white";
      ctx.strokeRect(i * 40, j * 40, 40, 40);
    }
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
function generateMap() {
  var result;
  for (let i = 0; i < map.objects.length; ++i) {
    if (map.objects[i].name != undefined) {
      if (map.objects[i].name == "checkBlock") {
        continue;
      }
    }
    if (Latex.prototype.isPrototypeOf(map.objects[i])) {
      continue;
    }
    result +=
      "map.addObject(new " +
      map.objects[i].constructor.name +
      "(" +
      map.objects[i].x +
      "," +
      map.objects[i].y +
      "));";
  }
  console.log(result);
}
