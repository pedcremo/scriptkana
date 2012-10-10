//Punt d'entrada al joc


/**
 * Mecanisme per permetre includes en javascript.
 * Així podem tindre un únic punt d'entrada a l'aplicació (game.js) a pesar d'organitzar el projecte
 * amb múltiples arxius .js diferents
 * 
 * @param {path_filename} PATH relatiu a index.html on s'ubica l'arxiu
 */
function include(filename)
{
	var head = document.getElementsByTagName('head')[0];
	
	script = document.createElement('script');
	script.src = filename;
	script.type = 'text/javascript';
	
	head.appendChild(script)
}


//Arxius que composen el projecte
include("javascript/utils/ArrayList.js");
include("javascript/utils/Observer.js");
include("javascript/utils/Subject.js");
include("javascript/utils/Inheritance.js");

include("javascript/ball.js");
include("javascript/context.js");
include("javascript/stick.js");

//Global Variables
var context=null; //Manté el context del joc: vides, objectes que el composen etc.


/**
 * Inicialitzem el context del joc amb aquesta funció. Però no el comencem encara.
 */
function init(){
    
	context=new Context();
	context.init();
}

/**
 * Engeguem el joc. La bola comença a correr en un angle aleatori de 0 a 180 graus
 */
function start(){
  context.start();
  
}

/**
 * Parem el joc, però el context és manté igual
 */
function stop(){
	context.stop();
}

/**
* Cada vegada que hi ha un event de redimensionament de la finestra
* inicialitzem el joc des de zero
*/
window.onresize = function() {
	//Start again
	init();
}


/**
* Amb succesives polsacions de la barra espaiadora
* parem o reprenem el joc segons estiga o no en marxa
*/
window.onkeypress = function (evt)
{
    var k = evt ? evt.which : window.event.keyCode;
    //Si polsem la barra espaiadora
    if (k == 32)
    	if (context.gameStarted){
    		stop();
        }else{
        	start();
        }
}