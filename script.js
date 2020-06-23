const H_GRID = 20;
const V_GRID = 16;
const GRID_SIZE = 40;

const WINDOW_WIDTH = H_GRID * GRID_SIZE;
const WINDOW_HEIGHT = V_GRID * GRID_SIZE;

var plateau = document.getElementById('plateau');
plateau.style.width = WINDOW_WIDTH;
plateau.style.height = WINDOW_HEIGHT;

var pion = document.getElementById('pion'),
  stylePion = pion.style,
  x = pion.offsetLeft,
  y = pion.offsetTop;

var vilain = document.getElementById('vilain'),
  styleVilain = vilain.style,
  vilainX = vilain.offsetLeft,
  vilainY = vilain.offsetTop,
  direction = "right";

let bombe = document.createElement("div");
  bombe.style.width = GRID_SIZE + "px";
  bombe.style.height = GRID_SIZE + "px";
  bombe.style.position = "absolute";
  bombe.style.backgroundImage = "bomb.png";
  bombe.style.backgroundRepeat = "no-repeat";
  bombe.style.backgroundSize = "contain";
  //bombe.style.backgroundPosition = "center";
  bombe.style.zIndex = "100";
  bombe.id = "bombe";

// tableau
var blockGrid = [];
// le x c'est le i, et le j c'est le y
// le j n'apparait pas car c'est juste pour créer des tableaux
for (var i = 0; i < H_GRID; i++) {
  blockGrid.push([]);
  for (var j = 0; j < V_GRID; j++) {
    let block = document.createElement("div");
    block.style.width = "40px";
    block.style.height = "40px";
    block.style.display = "flex";
    block.style.position = "absolute";

    if (random100() > 80) {
      block.style.backgroundImage = 'url("ground2.jpg")';
      block.style.backgroundSize = 'contain';
      block.style.position = 'absolute';
      block.style.zIndex = '90';
      block.traverser = true;
    }

    else if (random100() > 88) {
      block.style.backgroundImage = 'url("bois.jpg")';
      block.style.backgroundSize = 'contain';
      block.style.position = 'absolute';
      block.style.zIndex = '90';
      block.traverser = false;
    }

    else if (random100() > 95) {
      block.style.backgroundImage = 'url("stallman.jpg")';
      block.style.backgroundSize = 'contain';
      block.style.position = 'absolute';
      block.style.zIndex = '90';
      block.traverser = false;
    }

    else if (random100() > 80) {
      //block.style.backgroundColor = "red";
      block.style.backgroundImage = 'url("wallbrick.jpg")';
      block.style.backgroundSize = 'contain';
      block.style.position = 'absolute';
      block.style.zIndex = '90';
      block.traverser = false;
    }

    else if (random100() > 97) {
      block.style.backgroundImage = 'url("windows.png")';
      block.style.backgroundSize = 'contain';
      block.style.position = 'absolute';
      block.style.zIndex = '90';
      block.traverser = false;

      // move div randomly
      /*
      window.onload = function() {
        var max_width = window.innerWidth;
        var max_height = window.innerHeight;

        var directions = {
          left: 1,
          up: 2,
          right: 3,
          down: 4
        }
        var direction = getRandomDirection();
        var distance = getRandomDistance();

        var target = document.getElementById("vilain");
        var target_pos = {
          top: 0,
          left: 0
        }

        var i = 0;

        var render_rate = 40;
        var move_step = 2;

        setInterval(function() {
          i++;
          if (i > distance) {
            distance = getRandomDistance();
            direction = getRandomDirection();
            i = 0;
          }
          move(target, direction, move_step)
        }, render_rate)

        function getRandomDistance() {
          return Math.floor((Math.random() * 40) + 1) + 5;
        }

        function getRandomDirection() {
          return Math.floor((Math.random() * 4) + 1);
        }

        function move(el, direction, step) {
          switch (direction) {
            case directions.left: {
              if (target_pos.left < max_width) {
                target_pos.left += step;
                target.style.left = target_pos.left + "px";
              }
              break;
            }

            case directions.up: {
              if (target_pos.top < max_height) {
                target_pos.top += step;
                target.style.top = target_pos.top + "px";
              }
              break;
            }

            case directions.right: {
              if (target_pos.left > 0) {
                target_pos.left -= step;
                target.style.left = target_pos.left + "px";
              }
              break;
            }

            case directions.down: {
              if (target_pos.top > 0) {
                target_pos.top -= step;
                target.style.top = target_pos.top + "px";
              }
              break;
            }
          }
        }
      }
      */
    }

    else {
      /*block.style.backgroundColor = "green";*/
      block.style.backgroundImage = 'url("grass2.png")';
      block.traverser = true;
    }

    block.style.marginLeft = (i * GRID_SIZE).toString() + "px";
    block.style.marginTop = (j * GRID_SIZE).toString() + "px";

    document.getElementById("plateau").appendChild(block);
    blockGrid[i].push(block);
  }
}

// on met rien en position 0,1
blockGrid[0][0].style.backgroundImage = 'url("grass2.png")';
blockGrid[0][0].traverser = true;
blockGrid[1][0].style.backgroundImage = 'url("grass2.png")';
blockGrid[1][0].traverser = true;
blockGrid[0][1].style.backgroundImage = 'url("grass2.png")';
blockGrid[0][1].traverser = true;
blockGrid[H_GRID - 1][1].style.backgroundImage = 'url("grass2.png")';
blockGrid[H_GRID - 1][1].traverser = true;

var frame = 0;

function loop() {
  if (frame === 60) {
    switch (direction) {
      // Up
      case "left":
        if (vilainY > 0 && blockGrid[vilainX][vilainY - 1].traverser)
          vilainY--; // ou y-=40;
        break;
        // Right
      case "right":
        if (vilainX < H_GRID - 1 && blockGrid[vilainX + 1][vilainY].traverser)
          vilainX++;
        break;
        // Down
      case "up":
        if (vilainY < H_GRID - 1 && blockGrid[vilainX][vilainY + 1].traverser)
          vilainY++;
        break;
        // Left
      case "down":
        if (vilainX > 0 && blockGrid[vilainX - 1][vilainY].traverser)
          vilainX--;
        break;
    }
    styleVilain.left = String(vilainX * GRID_SIZE) + 'px';
    styleVilain.top = String(vilainY * GRID_SIZE) + 'px';

    let random = random100();

    if (random < 25) {
      direction = "left";
    }

    if (random >= 25 && random < 50) {
      direction = "right";
    }

    if (random >= 50 && random < 75) {
      direction = "up";
    }

    if (random > 75) {
      direction = "down";
    }

    frame = 0;
  }

  frame++;
  window.requestAnimationFrame(loop);
}
// 60 x / seconde
window.requestAnimationFrame(loop);


// coffre au milieu
// blockGrid[10][7].style.backgroundImage = 'url("windows.png")';

document.onkeydown = function(event) {
  var event = event || window.event,
    keyCode = event.keyCode;
  switch (keyCode) {
    // Up
    case 38:
      if (y > 0 && blockGrid[x][y - 1].traverser)
        y--; // ou y-=40;
      break;
      // Right
    case 39:
      if (x < H_GRID - 1 && blockGrid[x + 1][y].traverser)
        x++;
      break;
      // Down
    case 40:
      if (y < H_GRID - 1 && blockGrid[x][y + 1].traverser)
        y++;
      break;
      // Left
    case 37:
      if (x > 0 && blockGrid[x - 1][y].traverser)
        x--;
      break;
      // Space
    case 32:
      createBomb();
      break;

    default: return;
  }

  stylePion.left = String(x * GRID_SIZE) + 'px';
  stylePion.top = String(y * GRID_SIZE) + 'px';
}


function randomColor() {
  return "#" + ((1 << 24) * Math.random() | 0).toString(16);
}

function random100() {
  return Math.floor(Math.random() * 100);
}

function createBomb() {

    bombe.style.left = String(0) + "px";
    bombe.style.top = String(0) + "px";

    document.getElementById("plateau").appendChild(bombe);

    console.log(bombe);

    //setTimeout(disparitionBombe, 1000);

}

function disparitionBombe() {
  if (document.getElementById("bombe")) {
    document.getElementById("bombe").remove();
  }
}
