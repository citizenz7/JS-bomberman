// Horizontal
const H_GRID = 16;
// vertical
const V_GRID = 16;
// carreau de 40px
const GRID_SIZE = 40;


const WINDOW_WIDTH = H_GRID * GRID_SIZE;
const WINDOW_HEIGHT = V_GRID * GRID_SIZE;

var plateau = document.getElementById('plateau');
plateau.style.width = WINDOW_WIDTH;
plateau.style.height = WINDOW_HEIGHT;

var pion = document.getElementById('pion'),
  stylePion = pion.style,
  x = 0,
  y = 0;

var bombe = document.createElement("div");
bombe.style.width = GRID_SIZE + "px";
bombe.style.height = GRID_SIZE + "px";
bombe.style.position = "absolute";
bombe.style.backgroundImage = "url('img/bomb.png')";
bombe.style.backgroundRepeat = "no-repeat";
bombe.style.backgroundSize = "contain";
bombe.style.zIndex = "100";
bombe.id = "bombe";
bombe.explode = -1;


var blockGrid = [];
for (var i = 0; i < H_GRID; i++) {
  blockGrid.push([]);
  for (var j = 0; j < V_GRID; j++) {
    let block = document.createElement("div");
    block.style.width = "40px";
    block.style.height = "40px";
    block.style.display = "flex";
    block.style.position = "absolute";

    // if + condition pour ne pas faire poper de wallbrick dans les 4 coins de la grille
    if (random100() > 65 && !(i >= 0 && i <= 1 && j >= 0 && j <= 1 || i >= (H_GRID - 2)  && i < H_GRID && j >= 0 && j <= 1 || i >= 0  && i <= 1 && j >= (V_GRID - 2) && j < V_GRID || i >= (H_GRID - 2)  && i < H_GRID && j >= (V_GRID - 2) && j < V_GRID)) {
      block.style.backgroundImage = 'url("img/wallbrick.jpg")';
      block.style.backgroundSize = 'contain';
      block.style.position = 'absolute';
      block.style.zIndex = '90';
      block.traverser = false;
    }

    else if (random100() > 97 && !(i >= 0 && i <= 1 && j >= 0 && j <= 1 || i >= (H_GRID - 2)  && i < H_GRID && j >= 0 && j <= 1 || i >= 0  && i <= 1 && j >= (V_GRID - 2) && j < V_GRID || i >= (H_GRID - 2)  && i < H_GRID && j >= (V_GRID - 2) && j < V_GRID)) {
      block.style.backgroundImage = 'url("img/bsod.png")';
      block.style.backgroundSize = 'contain';
      block.style.position = 'absolute';
      block.style.zIndex = '90';
      block.traverser = false;
    }

    else if (random100() > 97 && !(i >= 0 && i <= 1 && j >= 0 && j <= 1 || i >= (H_GRID - 2)  && i < H_GRID && j >= 0 && j <= 1 || i >= 0  && i <= 1 && j >= (V_GRID - 2) && j < V_GRID || i >= (H_GRID - 2)  && i < H_GRID && j >= (V_GRID - 2) && j < V_GRID)) {
      block.style.backgroundImage = 'url("img/stallman.jpg")';
      block.style.backgroundSize = 'contain';
      block.style.position = 'absolute';
      block.style.zIndex = '90';
      block.traverser = false;
    }

    else {
      block.style.backgroundImage = 'url("img/grass2.png")';
      block.traverser = true;
    }

    block.style.marginLeft = (i * GRID_SIZE).toString() + "px";
    block.style.marginTop = (j * GRID_SIZE).toString() + "px";

    document.getElementById("plateau").appendChild(block);
    blockGrid[i].push(block);
  }
}

// tableau des vilains
var vilainList = []

// on crée 8 vilains, c'est à diren 8 x div vilain
for (var i = 0; i < 8; i++) {
  let vilain = document.createElement('div');
  let x = 0;
  let y = 0;
  while (!blockGrid[x][y].traverser || (x === 0 && y === 0)) {

    x = Math.floor(Math.random() * (H_GRID))
    y = Math.floor(Math.random() * (V_GRID))
  }
  blockGrid[x][y].traverser = false;
  vilain.vilainX = x;
  vilain.vilainY = y;
  vilain.direction = "right";
  vilain.id = "vilain" + String(i);
  vilain.style.width = "40px";
  vilain.style.height = "40px";
  vilain.style.position = "absolute";
  vilain.style.backgroundImage = "url('img/bug2.png')";
  vilain.style.backgroundSize = "contain";
  vilain.style.backgroundRepeat = "no-repeat";
  vilain.style.left = String(vilain.vilainX * GRID_SIZE) + "px";
  vilain.style.top = String(vilain.vilainY * GRID_SIZE) + "px";
  vilain.style.zIndex = "95";
  plateau.appendChild(vilain);

  vilainList.push(vilain)
}

//blockGrid[10][10].style.backgroundColor = "blue";

var frame = 0;

function loop() {
  if (frame === 60) {
    for (var i = 0; i < vilainList.length; i++) {
      let vilain = vilainList[i];
      let vilainX = vilain.vilainX
      let vilainY = vilain.vilainY
      let direction = vilain.direction
      blockGrid[vilainX][vilainY].traverser = true;
      switch (direction) {
        case "left":
          if (vilainY > 0 && blockGrid[vilainX][vilainY - 1].traverser)
            vilainY--;
          break;

        case "right":

          if (vilainX < H_GRID - 1 && blockGrid[vilainX + 1][vilainY].traverser)
            vilainX++;
          break;

        case "up":
          if (vilainY < V_GRID - 1 && blockGrid[vilainX][vilainY + 1].traverser)

            vilainY++;
          break;

        case "down":
          if (vilainX > 0 && blockGrid[vilainX - 1][vilainY].traverser)
            vilainX--;
          break;
      }
      vilain.style.left = String(vilainX * GRID_SIZE) + 'px';
      vilain.style.top = String(vilainY * GRID_SIZE) + 'px';

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

      vilain.vilainX = vilainX;
      vilain.vilainY = vilainY;
      vilain.direction = direction;
      blockGrid[vilainX][vilainY].traverser = false;
    }

    frame = 0;
  }
  frame++;

  // if (bombe.explode > 0 && bombe.explode < 50) {
  //   document.getElementById("bombe").style.backgroundImage = "url('img/explode4.gif')";
  // }
  //
  // else if (bombe.explode === 0) {
  //   blockGrid[bombe.x][bombe.y].traverser = true;
  //   document.getElementById("bombe").remove();
  // }
  //
  // if (bombe.explode > -1) {
  //   bombe.explode--;
  // }

  window.requestAnimationFrame(loop);

}

window.requestAnimationFrame(loop);


document.onkeydown = function(event) {
  var event = event || window.event,
    keyCode = event.keyCode;
  switch (keyCode) {
    // Up
    case 38:
      if (y > 0 && blockGrid[x][y - 1].traverser)
        y--; // ou y-=40;
        startAnimationhaut();
      break;
      // Right
    case 39:
      if (x < H_GRID - 1 && blockGrid[x + 1][y].traverser)
        x++;
        startAnimationdroite();
      break;
      // Down
    case 40:
      if (y < H_GRID - 1 && blockGrid[x][y + 1].traverser)
        y++;
        startAnimationbas();
      break;
      // Left
    case 37:
      if (x > 0 && blockGrid[x - 1][y].traverser)
        x--;
        startAnimationgauche();
      break;
      // Space bar
    case 32:
      createBomb();
      break;
      // default
    default:
      return;

  }
  stylePion.left = String(x * GRID_SIZE) + 'px';
  stylePion.top = String(y * GRID_SIZE) + 'px';
}

// function randomColor() {
//   return "#" + ((1 << 24) * Math.random() | 0).toString(16);
// }

function random100() {
  return Math.floor(Math.random() * 100);
}

/* ----- Creation de la bombe ----- */
var bombeList = [];

function createBomb() {
  if (!document.getElementById("bombe")) {
    bombe = document.createElement("div");
    bombe.style.width = GRID_SIZE + "px";
    bombe.style.height = GRID_SIZE + "px";
    bombe.style.position = "absolute";
    bombe.style.backgroundImage = "url('img/bomb.png')";
    bombe.style.backgroundRepeat = "no-repeat";
    bombe.style.backgroundSize = "contain";
    bombe.style.zIndex = "100";
    bombe.id = "bombe";
    bombe.style.left = String(x * GRID_SIZE) + "px";
    bombe.style.top = String(y * GRID_SIZE) + "px";

    // x, y de la bombe
    // on ne traverse pas la bombe
    blockGrid[x][y].traverser = false;

    bombe.x = x;
    bombe.y = y;

    document.getElementById("plateau").appendChild(bombe);

    bombeList.push(bombe);
    //console.log(bombe.x, bombe.y);

    //setTimeout(disparitionBombe, 1500);
    // la bombe explose après 2 secondes
    // bombe.explode = 120;
    setTimeout(explosionBombe, 2000);
  }
}


function explosionBombe() {
  if (document.getElementById("bombe")) {
    document.getElementById("bombe").style.backgroundImage = "url('img/explode4.gif')";
  }

  setTimeout(disparitionBombe, 1000);
  setTimeout(vilainKill, 1000);

}


// function disparitionBombe() {
//   blockGrid[bombe.x][bombe.y].traverser = false;
//   for (var i = 0; i < bombeList.length; i++) {
//     console.log(bombe.x, bombe.y);
//     if (blockGrid[bombe.x][bombe.y - 1].traverser) {
//       blockGrid[bombe.x][bombe.y - 1].remove();
//       document.getElementById("bombe").remove();
//       blockGrid[bombe.x][bombe.y].traverser = true;
//     }
//   }
// }
function disparitionBombe() {

  let bx = bombe.x, by = bombe.y;
  blockGrid[bx][by].traverser = false;

  // Bombe
  for (var i = 0; i < bombeList.length; i++) {
    if (!(blockGrid[bx][by - 1].traverser)) {
      blockGrid[bx][by - 1].style.backgroundImage = 'url("img/grass2.png")';
      blockGrid[bx][by - 1].traverser = true;
    }
    if (!(blockGrid[bx][by + 1].traverser)) {
      blockGrid[bx][by + 1].style.backgroundImage = 'url("img/grass2.png")';
      blockGrid[bx][by + 1].traverser = true;
    }
    if (!(blockGrid[bx - 1][by].traverser)) {
      blockGrid[bx - 1][by].style.backgroundImage = 'url("img/grass2.png")';
      blockGrid[bx - 1][by].traverser = true;
    }
    if (!(blockGrid[bx + 1][by].traverser)) {
      blockGrid[bx + 1][by].style.backgroundImage = 'url("img/grass2.png")';
      blockGrid[bx + 1][by].traverser = true;
    }
  }

  document.getElementById("bombe").remove();
  blockGrid[bx][by].traverser = true;

  // document.getElementById("vilain" + String(i)).remove();
  // blockGrid[vx][vy].traverser = true;

}


function vilainKill() {

  // Vilain
  for (var i = 0; i < vilainList.length; i++) {

    if (parseInt(bombe.style.left) == vilainList[i].offsetLeft && parseInt(bombe.style.top) + GRID_SIZE == vilainList[i].offsetTop) {
      console.log(bombe.style.left, bombe.style.top, vilainList[i].offsetLeft, vilainList[i].offsetTop);
      vilainList[i].remove();
      vilainList[i].traverser = true;
    }
    // if (!(vilainList[bx][by - 1].traverser)) {
    //   vilainList[bx][by - 1].remove();
    //   vilainList[bx][by - 1].traverser = true;
    // }
    // if (!(vilainList[bx][by + 1].traverser)) {
    //   vilainList[bx][by + 1].remove();
    //   vilainList[bx][by + 1].traverser = true;
    // }
    // if (!(vilainList[bx - 1][by].traverser)) {
    //   vilainList[bx - 1][by].remove();
    //   vilainList[bx - 1][by].traverser = true;
    // }
    // if (!(vilainList[bx + 1][by].traverser)) {
    //   vilainList[bx + 1][by].remove();
    //   vilainList[bx + 1][by].traverser = true;
    // }
  }
}


// /* ----- Destruction mur + vilain ----- */
// function BombeBlast() {
//
//   // si la bombe existe, on récupère sa position et l'ID du vilain
//   if (document.getElementById("bombe")) {
//     //let positionBombe = blockGrid[bombe.x][bombe.y];
//     //var positionVilain = blockGrid[vilainX][vilainY];
//     if(bombe.x == blockGrid[bombe.x] && bombe.y == blockGrid[bombe.y]) {
//           blockGrid[bombe.x][bombe.y].remove();
//           console.log("blast");
//     }
//
//
//     // si le vilain est dans la zone de la bombe, on détruit le carreau de la bombe + 1 carreau tout autour
//     // if (positionBombe == positionVilain) {
//     //   document.getElementById("vilain" + String(i)).remove();
//     // }
//   }


/* ----- SPRITESHEET ----- */
var animationInterval;
var spriteSheet = document.getElementById("pion");
var widthOfSpriteSheet = 160;
var widthOfEachSprite = 40;
var heightOfSpriteSheet = 160;
var heightOfEachSprite = 40;

function stopAnimation() {
  clearInterval(animationInterval);
}

function startAnimationbas() {
  stopAnimation();
  var position = widthOfEachSprite; //start position for the image
  const speed = 110; //in millisecond(ms)
  const diff = widthOfEachSprite; //difference between two sprites

  animationInterval = setInterval(() => {
    spriteSheet.style.backgroundPosition = `-${position}px 0px`;

    if (position < widthOfSpriteSheet) {
      position = position + diff;
    } else {
      //increment the position by the width of each sprite each time
      position = widthOfEachSprite;
    }
    //reset the position to show first sprite after the last one
  }, speed);
}


function startAnimationhaut() {
  stopAnimation();
  var position = widthOfEachSprite; //start position for the image
  const speed = 110; //in millisecond(ms)
  const diff = widthOfEachSprite; //difference between two sprites

  animationInterval = setInterval(() => {
    spriteSheet.style.backgroundPosition = `-${position}px 40px`;

    if (position < widthOfSpriteSheet) {
      position = position + diff;
    } else {
      //increment the position by the width of each sprite each time
      position = widthOfEachSprite;
    }
    //reset the position to show first sprite after the last one
  }, speed);
}


function startAnimationgauche() {
  stopAnimation();
  var position = widthOfEachSprite; //start position for the image
  const speed = 110; //in millisecond(ms)
  const diff = widthOfEachSprite; //difference between two sprites

  animationInterval = setInterval(() => {
    spriteSheet.style.backgroundPosition = `-${position}px 80px`;

    if (position < widthOfSpriteSheet) {
      position = position + diff;
    } else {
      //increment the position by the width of each sprite each time
      position = widthOfEachSprite;
    }
    //reset the position to show first sprite after the last one
  }, speed);
}

function startAnimationdroite() {
  stopAnimation();
  var position = widthOfEachSprite; //start position for the image
  const speed = 110; //in millisecond(ms)
  const diff = widthOfEachSprite; //difference between two sprites

  animationInterval = setInterval(() => {
    spriteSheet.style.backgroundPosition = `-${position}px 120px`;

    if (position < widthOfSpriteSheet) {
      position = position + diff;
    } else {
      //increment the position by the width of each sprite each time
      position = widthOfEachSprite;
    }
    //reset the position to show first sprite after the last one
  }, speed);
}
