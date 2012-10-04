//Class stick

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

	if (window.Event) {
		document.captureEvents(Event.MOUSEMOVE);
	}
	document.onmousemove = getCursorXY;
	
	/*this.move= function(){	
		x= (window.Event) ? e.pageX : event.clientX + (document.documentElement.scrollLeft ? document.documentElement.scrollLeft : document.body.scrollLeft);
	}*/
	
	this.Update = function(value){ //Value is a Ball Object
		var pos=value.getPosition();
		var limit=this.context.vpHeight-this.gap-value.imgObj.height;
		if (pos.y>=limit) alert("Sóc el Observer stick "+pos.y);
	}

	this.locate = function(x,y){
		
		this.imgObj.style.left = (Math.round(x))+ 'px';
		this.imgObj.style.bottom = (Math.round(y)) + 'px';
	}
}

function getCursorXY(e) {
    x= (window.Event) ? e.pageX : event.clientX + (document.documentElement.scrollLeft ? document.documentElement.scrollLeft : document.body.scrollLeft);
    if (context.gameStarted) {
	context.stick.locate(x,25);
	
    }
	
	document.getElementById('cursorX').value = (window.Event) ? e.pageX : event.clientX + (document.documentElement.scrollLeft ? document.documentElement.scrollLeft : document.body.scrollLeft);
	document.getElementById('cursorY').value = (window.Event) ? e.pageY : event.clientY + (document.documentElement.scrollTop ? document.documentElement.scrollTop : document.body.scrollTop);
}
