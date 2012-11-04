/**
 * Crea una instància de Context. 
 * Amb aquest objecte (Singleton) per cert. Mantenim el context del joc: vides, on/off posicionament dels
 * objectes en pantalla etc. Serveix com a pont a la resta d'objectes que composen el joc
 *
 * @constructor
 * @this {Context}
 */
function Context(){
	
    this.ball=null;
    this.stick=null;
    this.gameStarted=false; //True el joc està en marxa. False el joc està parat
    this.gameStopped=false;  //Quan el joc es para a propòsit o surt una pregunta
    this.lives=3; 
    this.blocks=new Array();
    this.vpWidth=null; //ViewportX
    this.vpHeight=null;//ViewportY
    this.score=0;
    
    //Inicialitzem els objectes del joc
    this.init= function(){
		clearDom();
    		
    	this.viewporte();
		
		this.ball=new Ball(this);   		
   		this.ball.locate((this.vpWidth/2)-32,this.vpHeight-100);  //Posicionem pilota al mig 
   		  		 
   		this.stick=new Stick(this);   		
   		this.stick.locate((this.vpWidth/2)-this.stick.imgObj.width,this.stick.gap);  //Posicionem Stick al mig
   		
   		
   		this.setBanner("<h2>Polsa la barra espaiadora per començar i/o parar el joc quan estigues preparat</h2>");
   		this.createBlocks(24);		
   	};
   	
   	/**
   	*Inicialitzem el joc amb un número de blocks
   	* @param {number} Número de blocks*/
   	this.createBlocks= function(number){
   		var fila=0;
   		var col=0;
   		for (var i=0;i<number;i++){
   			this.blocks[i]=new Rajola(this.vpWidth*0.30+(col*48),this.vpHeight*0.20+(fila*48));
   			if (i % 8 == 0){
   				col=0;fila++;
   			}else {col++;}
   			
   		}
   	}
   	
   	this.addScore = function(points){
   		this.score+=points;
   		this.setBanner("<h1>Punts: "+this.score+"<h1>");
   	};
   	
	//Comença el joc. La bola comença a moures
    this.start=function(){		
		this.ball.start();
		this.gameStarted=true;
		this.gameStopped=false;
		this.setBanner("<h1>Punts: "+this.score+"<h1>");
	};

	//Para el joc
    this.stop=function(){
   		this.ball.stop();
   		this.gameStarted=false;
   		this.gameStopped=true;
   		this.setBanner("<h2>Polsa la barra espaiadora per començar i/o parar el joc quan estigues preparat</h2>");
	}
	this.setBanner=function(message){
		document.getElementById('banner').innerHTML =message;
	}
	
	this.youWin=function(){
		alert("HAS GUANYAT. Congratulations !!! ");
		this.stop();
		init();
	}

	//Manté el número de vides del joc o si és GAME OVER
    this.takeLive=function(){
		this.lives=this.lives-1;
		if (this.lives==0) {
			alert("GAME OVER");
			this.stop();
			init();
		}else {
			
			this.stop();
			this.ball.locate((this.vpWidth/2)-32,this.vpHeight-100);  //Posicionem pilota al mig   		 
   			this.stick.locate((this.vpWidth/2)-32,25);  //Posicionem Stick al mig
   			this.setBanner("<h2>Polsa la barra espaiadora per començar i/o parar el joc quan estigues preparat</h2>");
			
			alert(this.lives+" VIDES RESTANTS ");
		}
    };
	
	/* 
	*	Usada per calcular la resolució de la finesta en la que el joc començara. Imprescindible
	*   per calcular rebots i límits
	*/
    this.viewporte= function(){
		/*var viewportwidth;
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
 		
 		this.vpWidth=viewportwidth;
 		this.vpHeight=viewportheight;*/
 		this.vpWidth=window.innerWidth
		|| document.documentElement.clientWidth
		|| document.body.clientWidth;

		this.vpHeight=window.innerHeight
		|| document.documentElement.clientHeight
		|| document.body.clientHeight;
 		
		//return { width : viewportwidth , height : viewportheight };
	};	
} //End class context
