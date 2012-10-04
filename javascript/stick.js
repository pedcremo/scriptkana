//Class stick

function Stick(context) {
	
	this.imgObj= document.getElementById("myStick"); 
  	this.imgObj.style.position= 'absolute';
	this.position="bottom"; //Bottom,top,right,left, 
	this.gap="25";    //From position in pixels

	if (window.Event) {
		document.captureEvents(Event.MOUSEMOVE);
	}
	document.onmousemove = getCursorXY;
	
	/*this.move= function(){	
		x= (window.Event) ? e.pageX : event.clientX + (document.documentElement.scrollLeft ? document.documentElement.scrollLeft : document.body.scrollLeft);
	}*/
	
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
