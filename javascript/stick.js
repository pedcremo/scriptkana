/**
 * Crea una instància de Stick. 
 * Amb aquest objecte creem la barra que el jugador té que controlar per fer rebotar la bola al sobre i no perdre vides
 *
 * @constructor
 * @this {Stick}
 * @param {context} context. Tots els objectes que formen part del joc mantenen una referència al context
 *
 */

function Stick() {
	
	
  	this.imgObj = insertImage("images/stick.png","myStick");
	this.position="bottom"; //Bottom,top,right,left, 
	this.gap="25";    //From this.position in pixels
	
	this.oldX=0; //X position 10 miliseconds ago
	this.speed=0;
	


	//Heretem de la classe Observer pq nosaltres volem observar l'estat de la Ball
	inherits(new Observer(), this);
	//Ens apuntem com Observadors dels canvis d'estat de la bola
	context.ball.AddObserver(this);

	//Pareix que açò està una mica deprecated
	if (window.Event) {
		document.captureEvents(Event.MOUSEMOVE);
	}
	document.onmousemove = getCursorXY;
	
	
	this.updateSpeed=function(){
		
		this.speed=Math.abs(this.x-this.oldX);
		this.oldX=this.x;	
		context.setBanner("<h1>Punts: "+context.score+"</h1> Stick speed="+this.speed);
	}
	
	//Invocat cada vegada que la bola canvia de posició
	this.Update = function(bola){ //bola is a Ball Object
		var pos=bola.getPosition();
		var limit=context.vpHeight - this.gap - bola.imgObj.height-this.imgObj.height;
		if (pos.y>=limit) {
			//alert("Posy bola->"+pos.y+"limit>"+limit);
			var distance=Math.abs((this.x+this.imgObj.width/2)-(pos.x+bola.imgObj.width/2));
			var minDist=(this.imgObj.width/2+bola.imgObj.width/2);
			if (distance<minDist) {
				//alert((minDist-distance));
				if ((minDist-distance)<23) bola.rebota("Stick","punta");
				else if ((minDist-distance)<23 && speed>5) bola.rebota("Stick","punteta");
				else bola.rebota("Stick","mig");
			}
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
    context.stick.locate(x,25);	
    if (context.gameStarted==false && context.gameStopped==false) {
    	//Si no hem començat el joc podem menejar la bola i stick junts a qualsevol punt inicial
    	posball=context.ball.getPosition();
		context.ball.locate(x,posball.y);
    }
	
	//document.getElementById('cursorX').value = (window.Event) ? e.pageX : event.clientX + (document.documentElement.scrollLeft ? document.documentElement.scrollLeft : document.body.scrollLeft);
	//document.getElementById('cursorY').value = (window.Event) ? e.pageY : event.clientY + (document.documentElement.scrollTop ? document.documentElement.scrollTop : document.body.scrollTop);
}
