/**
 * Crea una instància de Ball. 
 * Amb aquest objecte creem la bola que anira rebotant per tot arreu
 *
 * @constructor
 * @this {Ball}
  *
 */

function Ball() {

  
  this.imgObj = insertImage("images/ball5.gif","myBall");
  var self=this; //Artifici per fer funcionar setInterval
  
  /* Fem que Ball herete de Subject per tant 
  * serà un objecte observable a altres objectes interessats
  * en el seu estat (Stick, blocks etc.)
  */
  inherits(new Subject(),this);


  var speed2=2;
  //var directions = [ [2,-2],[-2,-2],[-2,2],[2,2]]; //4 directions
  //var directions = [ [3,-1],[2,-2],[1,-3],[-1,-3],[-2,-2],[-3,-1],[-3,1],[-2,2],[-1,3],[1,3],[2,2],[3,1]]; //12 directions
  //var directions = [ [5,-1],[3,-1],[2,-2],[1,-3],[1,-5],[-1,-5],[-1,-3],[-2,-2],[-3,-1],[-5,-1],[-5,1],[-3,1],[-2,2],[-1,3],[-1,5],[1,5],[1,3],[2,2],[3,1],[5,1]]; //20 directions	  
  var directions = [ [3,-1],[2,-2],[1,-3]];
      
  //Meneja la bola
  this.move= function(){	

	 context.stick.updateSpeed();
  	 self.locate(parseInt(self.imgObj.style.left)+self.dirX*speed2,parseInt(self.imgObj.style.top)+self.dirY*speed2);  
  
  }; //End move method
  
  
  
 // Get ball position. Respecte al seu centre  
 this.getCenteredPosition = function(){
	return {x:parseInt(self.imgObj.style.left)+(self.imgObj.width/2),y:parseInt(self.imgObj.style.top)+(self.imgObj.height/2)};
 }
 
 // Get ball position. Respecte extrem superior esquerre
 this.getPosition = function(){
	return {x:parseInt(self.imgObj.style.left),y:parseInt(self.imgObj.style.top)};
 }

 //Posicionem Bola de manera absoluta en X i Y i comprovem llímits
 this.locate = function(x,y){
	
	
	//Ens eixim per dalt
	if (y<=0 )	this.dirY=this.dirY*(-1);
	
	
	//Ens eixim per baix
	if (y>=context.vpHeight-this.imgObj.height) {
			context.takeLive();
			return;
	}	
	//Ens eixim per dreta o esquerre
	if (x<=0 || x>=context.vpWidth-this.imgObj.width) this.dirX=this.dirX*(-1);
	
	this.imgObj.style.left = (Math.round(x))+ 'px';
	this.imgObj.style.top = (Math.round(y)) + 'px';
	//Avisem als Observers interessats en el nostre estat que estem canviant de posició
	this.Notify(this);
	
 }; //End locate method
 
 this.rebota = function(typeObject,pos){
 	if (typeObject=="Stick" && pos=="punta"){
 		//alert("punta");
 		this.dirY*=(-1);this.dirX*=(-1);
 	}else if (typeObject=="Stick" && pos=="punteta"){
 		//this.imgObj.meneja=2;
 		//if (this.dirX>0)
 		alert("punteta");
 		this.dirY*=(-1);this.dirX*=(-1);
 	}else if (typeObject=="block" && pos=="dalt_baix"){
 		this.dirY*=(-1);
 	}else if (typeObject=="block" && pos=="dreta_esquerre"){
 	    
 		this.dirX*=(-1);
 		
 	}else{
		this.dirY*=(-1);
 	}
 	//this.imgObj.meneja = Math.abs(this.imgObj.meneja-(directions.length-1));
 }
 
 this.setDirection=function(directionIndex){
 		this.imgObj.meneja=directionIndex;
 		this.dirX=directions[directionIndex][0];
 		this.dirY=directions[directionIndex][1];
 		//alert("Dir ="+directionIndex+" dirX"+this.dirX);
}

 //Sortejem direcció i comencem a moure la pola
 this.start = function(){
	
	this.setDirection(1); //Eixim 45º dreta
	animate=setInterval(self.move, 5);
	
 }
 //Parem la bola 
 this.stop = function(){
 	clearTimeout(animate);
 };

} //END Class Ball
