var imgObj = null;
var animate;
var viewportX;
var viewportY;
var speed=10; //1 fastest, 10 slowest

function init(){
   imgObj = document.getElementById('myImage');
   imgObj.style.position= 'absolute';       
}

function start(){
	//llebeig 0 ,Mestral 1,gregal 2, xaloc 3   
	imgObj.meneja=getRandomDirection();
	locateCenter();	
	move();	
}

function move(){
	
	switch (imgObj.meneja){
	case 0:
		locate(parseInt(imgObj.style.left)-1,parseInt(imgObj.style.top)+1);  	 	
  		break;
	case 1:
		locate(parseInt(imgObj.style.left)-1,parseInt(imgObj.style.top)-1);
		break;
	case 2:
		locate(parseInt(imgObj.style.left)+1,parseInt(imgObj.style.top)-1);	
		break;
	case 3:
		locate(parseInt(imgObj.style.left)+1,parseInt(imgObj.style.top)+1);
		break;
	}
	animate = setTimeout(move,speed);
}

function stop(){
   clearTimeout(animate);
}

function moveRight(){
   imgObj.style.left = parseInt(imgObj.style.left) + 10 + 'px';
}


function viewporte(){
	var viewportwidth;
 	var viewportheight;
  
 	// the more standards compliant browsers (mozilla/netscape/opera/IE7) use window.innerWidth and window.innerHeight
  
 	if (typeof window.innerWidth != 'undefined')
 	{
      		viewportwidth = window.innerWidth,
      		viewportheight = window.innerHeight
 	}
  
	// IE6 in standards compliant mode (i.e. with a valid doctype as the first line in the document)
 
 	else if (typeof document.documentElement != 'undefined'&& typeof document.documentElement.clientWidth !='undefined' && document.documentElement.clientWidth != 0)
	{
       		viewportwidth = document.documentElement.clientWidth,
	        viewportheight = document.documentElement.clientHeight
	}
  
	 // older versions of IE
  
	 else
	{
       		viewportwidth = document.getElementsByTagName('body')[0].clientWidth,
	        viewportheight = document.getElementsByTagName('body')[0].clientHeight
 	}
	return { width : viewportwidth , height : viewportheight };
}

function locateCenter(){   
	init();	
	viewp=viewporte();
	viewportX=viewp.width;
	viewportY=viewp.height;	
        locate((viewportX/2)-32,(viewportY/2)-32); 
}

//Gets an initial random direction for the image that is going to be animated
function getRandomDirection(){
	//llebeig 0 ,Mestral 1,gregal 2, xaloc 3
	return Math.floor(Math.random()*4);	
}


//Positionate imgObj absolutetly
function locate(x,y){
	if (x<=0 || x>=viewportX-60 || y<=0 || y>=viewportY-60){ //Trespassed boundaries		
		//Canvis 0->1,1->2,2->3,3->0
		if (imgObj.meneja==0) imgObj.meneja=1;
		else if (imgObj.meneja==1) imgObj.meneja=2;
		else if (imgObj.meneja==2) imgObj.meneja=3;
		else if (imgObj.meneja==3) imgObj.meneja=0;
	} 
	document.getElementById('banner').innerHTML = x+"("+viewportX+"),"+y+"("+viewportY+")";	
	imgObj.style.left = (Math.round(x))+ 'px';
	imgObj.style.top = (Math.round(y)) + 'px';
}
window.onresize = function() {
	//Start again
	locateCenter();

}

window.onload =init;
