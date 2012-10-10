/**
 * Crea una instància de Stick. 
 * Amb aquest objecte creem la barra que el jugador té que controlar per fer rebotar la bola al sobre i no perdre vides
 *
 * @constructor
 * @this {Stick}
 * @param {context} context. Tots els objectes que formen part del joc mantenen una referència al context
 *
 */

function Stick(context) {
	
	this.imgObj= document.getElementById("myStick"); 
  	this.imgObj.style.position= 'absolute';
	this.position="bottom"; //Bottom,top,right,left, 
	this.gap="25";    //From position in pixels
	this.context=context;

	//Heretem de la classe Observer pq nosaltres volem observar l'estat de la Ball
	inherits(new Observer(), this);
	//Ens apuntem com Observadors dels canvis d'estat de la bola
	this.context.ball.AddObserver(this);

	//Pareix que açò està una mica deprecated
	if (window.Event) {
		document.captureEvents(Event.MOUSEMOVE);
	}
	document.onmousemove = getCursorXY;
	
		
	//Invocat cada vegada que la bola canvia de posició
	this.Update = function(value){ //Value is a Ball Object
		var pos=value.getPosition();
		var limit=this.context.vpHeight-this.gap-value.imgObj.height;
		if (pos.y>=limit) {
			var distance=Math.abs((this.x+this.imgObj.width/2)-(pos.x+value.imgObj.width/2));
			if (distance<(this.imgObj.width/2+value.imgObj.width/2)) {value.rebota();}
		}
	}
	//Posicionem la bola a les coordenades x,y
	this.locate = function(x,y){
		this.x=x;this.y=y;
		this.imgObj.style.left = (Math.round(x))+ 'px';
		this.imgObj.style.bottom = (Math.round(y)) + 'px';
	}
}// End Stick class

function getCursorXY(e) {
    x= (window.Event) ? e.pageX : event.clientX + (document.documentElement.scrollLeft ? document.documentElement.scrollLeft : document.body.scrollLeft);
    if (context.gameStarted) {
	context.stick.locate(x,25);
	
    }
	
	document.getElementById('cursorX').value = (window.Event) ? e.pageX : event.clientX + (document.documentElement.scrollLeft ? document.documentElement.scrollLeft : document.body.scrollLeft);
	document.getElementById('cursorY').value = (window.Event) ? e.pageY : event.clientY + (document.documentElement.scrollTop ? document.documentElement.scrollTop : document.body.scrollTop);
}
