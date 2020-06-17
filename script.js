/*
arrowLeft = 37; arrowRight = 39; arrowtop = 38; arrowDown = 40;
*/
let cadre = document.querySelector('#cadre'); 	// variables objet
let pion = document.querySelector('#pion');
let x; let y;

	// programmation des touches de direction
	document.onkeydown = function(event)
	{
		if (event.keyCode == 37) gauche();
		if (event.keyCode == 39) droite() ;
		if (event.keyCode == 38) haut();
		if (event.keyCode == 40) bas() ;
	} // fin fonction

	// quatre fonctions de déplacement
	function gauche()
	{
		x = getComputedStyle(pion).left;
		x = parseInt(x); x= x-20;
		x = x + "px";
		pion.style.left = x ;
	}

	function droite() {
		x = getComputedStyle(pion).left;
		x = parseInt(x);
		x= x+20;
		x = x+"px";
		pion.style.left = x ;
	}

	function haut() {
		y = getComputedStyle(pion).top;
		y = parseInt(y);
		y= y-20;
		y = y+"px";
		pion.style.top = y ;
	}
	
	function bas()  {
		y = getComputedStyle(pion).top;
		y = parseInt(y);
		y= y+20;
		y = y+"px";
		pion.style.top = y ;
	}
