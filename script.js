const H_GRID = 24;
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


var blockGrid = [];
for (var i = 0; i < H_GRID; i++) {
  blockGrid.push([]);
  for (var j = 0; j < V_GRID; j++) {
    let block = document.createElement("div");
    block.style.width = "40px";
    block.style.height = "40px";
    block.style.display = "flex";
    block.style.position = "absolute";

    if (random100() > 80) {
      /*block.style.backgroundColor = "black";*/
      block.style.backgroundImage = 'url("pillar2.png")';
      block.traverser = false;

    } else if (random100() > 70) {
      /*block.style.backgroundColor = "black";*/
      block.style.backgroundImage = 'url("bois.jpg")';
      block.traverser = false;
    }

    else if (random100() > 97){
      //block.style.backgroundColor = "black";
      //block.style.backgroundImage = 'url("win2.png")';
      //block.traverser = true;
      const getRandom = (min, max) => Math.floor(Math.random()*(max-min+1)+min);
      const vilain= document.querySelector('#vilain');
      setInterval(() => {
          vilain.style.left= getRandom(0, 300 - 200)+'px'; // Horizontally
          vilain.style.top = getRandom(0, 300 - 200)+'px'; // Vertically
      }, 900); // every 1/2 second

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

//blockGrid[10][10].style.backgroundColor = "blue";

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
