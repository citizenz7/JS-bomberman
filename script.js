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

    else if (random100() > 80 && random100() <= 90) {
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
      block.traverser = true;
    }

    else if (random100() > 70) {
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

// coffre au milieu
//blockGrid[10][7].style.backgroundImage = 'url("windows.png")';

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
