//Here We include all components We need for the game

var animate=null; //setInterval to mantain ball moving
var context=null;


function include(filename)
{
	var head = document.getElementsByTagName('head')[0];
	
	script = document.createElement('script');
	script.src = filename;
	script.type = 'text/javascript';
	
	head.appendChild(script)
}

include("javascript/ball.js");
include("javascript/context.js");
include("javascript/stick.js");


function init(){
    
	context=new Context();
	context.init();
}

function start(){
  context.start();
  
}

function stop(){
	context.stop();
}

window.onresize = function() {
	//Start again
	init();
}

