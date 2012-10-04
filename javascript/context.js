
//Class Context
function Context(){
    
    this.gameStarted=false;
    this.lives=3; 
    
    this.init= function(){
	//alert("init this");
    	this.ball=new Ball(this);	
    	this.viewporte();
		this.ball.locate((this.vpWidth/2)-32,(this.vpHeight/2)-32);  //Posicionem pilota al mig   		 
   		this.stick=new Stick(this);
   		this.stick.locate((this.vpWidth/2)-32,25);  //Posicionem Stick al mig
   		
   		
	};

    this.start=function(){		
		this.ball.start();
		this.gameStarted=true;
	};

    this.stop=function(){
   		this.ball.stop();
   		this.gameStarted=false;
	}

    this.takeLive=function(){
		this.lives=this.lives-1;
		if (this.lives==0) {
			alert("Game Over");
			this.stop();
			init();
		}else {
			
			this.stop();
			this.init();
			//this.ball.locate(100,100);  //Posicionem pilota al mig
			//this.ball.locate((this.vpWidth/2)-32,(this.vpHeight/2)-32);  //Posicionem pilota al mig
			alert(this.lives+" left ");
		}
    };
	
    this.viewporte= function(){
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
 		
 		this.vpWidth=viewportwidth;
 		this.vpHeight=viewportheight;
 		
		//return { width : viewportwidth , height : viewportheight };
	};	
} //End class context
