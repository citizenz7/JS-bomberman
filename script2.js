let pion = document.getElementById('pion'),
  stylePion = pion.style,
  x = pion.offsetLeft,
  y = pion.offsetTop;

document.onkeydown = function(event){
  var event = event || window.event,
  keyCode = event.keyCode;
  switch(keyCode){
    /* touche LEFT */
    case 37:
      x = x - 40;
      break;
    /* touche UP */
    case 38:
      y = y - 40;
      break;
    /* touche RIGHT */
    case 39:
      x = x + 40;
      break;
    /* touche DOWN */
    case 40:
      y = y + 40;
      break;
  }

  // On vérifie si les valeurs sont supérieures ou égales à 0 et inférieures ou égales à 780
  // 760 ==> 800 - 40 qui est la taille de déplacement)
  if (x < 0) x = 0; // si elles sont inférieures à 0
  if (y < 0) y = 0;
  if (x > 760) x = 760; // si elles sont supérieures à 760
  if (y > 760) y = 760;

  stylePion.left = String(x) + 'px';
  stylePion.top = String(y) + 'px';
}
