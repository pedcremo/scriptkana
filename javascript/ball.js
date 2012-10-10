﻿/**
 * Crea una instància de Ball. 
 * Amb aquest objecte creem la bola que anira rebotant per tot arreu
 *
 * @constructor
 * @this {Ball}
 * @param {context} context tots els objectes que formen part del joc mantenen una referència al context
 *
 */

function Ball(context) {

  this.imgObj= document.getElementById("myBall"); 
  this.imgObj.style.position= 'absolute';
  this.context=context;
  var self=this; //Artifici per fer funcionar setInterval
  
  /* Fem que Ball herete de Subject per tant 
  * serà un objecte observable a altres objectes interessats
  * en el seu estat (Stick, blocks etc.)
  */
  inherits(new Subject(),this);

  var speed2=2;
  //var directions = [ [2,-2],[-2,-2],[-2,2],[2,2]]; //4 directions
  var directions = [ [3,-1],[2,-2],[1,-3],[-1,-3],[-2,-2],[-3,-1],[-3,1],[-2,2],[-1,3],[1,3],[2,2],[3,1]]; //12 directions
  //var directions = [ [5,-1],[3,-1],[2,-2],[1,-3],[1,-5],[-1,-5],[-1,-3],[-2,-2],[-3,-1],[-5,-1],[-5,1],[-3,1],[-2,2],[-1,3],[-1,5],[1,5],[1,3],[2,2],[3,1],[5,1]]; //20 directions	  
  
      
  //Move ball
  this.move= function(){	

  	self.locate(parseInt(self.imgObj.style.left)+directions[self.imgObj.meneja][0]*speed2,parseInt(self.imgObj.style.top)+directions[self.imgObj.meneja][1]*speed2);  
  }; //End move method
  
  
// Get ball position
 this.getPosition = function(){
	return {x:parseInt(self.imgObj.style.left),y:parseInt(self.imgObj.style.top)};
 }

 //Positionate Ball absolutetly
 //Cal Simplificar més
 this.locate = function(x,y){
	
	
	//Ens eixim per dalt o per baix
	modul_dalt_baix=directions.length-1;

	//if (y>=(this.context.vpHeight-this.imgObj.height-28)) alert("PARA");

	if (y<=0 || y>=this.context.vpHeight-this.imgObj.height){		
		//Ens eixim per baix
		if (y>=this.context.vpHeight-this.imgObj.height) {
			this.context.takeLive();
			return;
		}
		//Ens eixim per dalt
		else this.imgObj.meneja = Math.abs(this.imgObj.meneja-modul_dalt_baix);
	}
	
	//Ens eixim dreta o esquerre		
	if (x<=0 || x>=this.context.vpWidth-this.imgObj.width){
		modul_primera=(directions.length/2)-1;
		modul_segon=(directions.length-1)+(directions.length/2);
		//alert("modul_primera->"+modul_primera+" modul_segon->"+modul_segon);
		//Segona meitat de direccions
		if (this.imgObj.meneja>((directions.length/2)-1)) this.imgObj.meneja = Math.abs(this.imgObj.meneja-modul_segon);
		//Primera meitat de direccions
		else this.imgObj.meneja = Math.abs(this.imgObj.meneja-modul_primera);
	}
	
	

	//document.getElementById('banner').innerHTML = x+"("+this.context.vpWidth+"),"+y+"("+this.context.vpHeight+") Direccio="+this.imgObj.meneja;	
	this.imgObj.style.left = (Math.round(x))+ 'px';
	this.imgObj.style.top = (Math.round(y)) + 'px';
	//Avisem als Observers interessats en el nostre estat que estem canviant de posició
	this.Notify(this);
	
 }; //End locate method
 
 this.rebota = function(){
<<<<<<< HEAD
=======
 	//alert("rebota de "+this.imgObj.meneja+" a "+Math.abs(this.imgObj.meneja-directions.length-1));
>>>>>>> Versió una mica documentada
 	this.imgObj.meneja = Math.abs(this.imgObj.meneja-(directions.length-1));
 }

 //Sortejem direcció i comencem a moure la pola
 this.start = function(){
	//llebeig 0 ,Mestral 1,gregal 2, xaloc 3
	
	this.imgObj.meneja=this.getRandomDirection();
	animate=setInterval(self.move, 10);
	//alert("direction = "+this.meneja);
	
 }
 //Parem la bola 
 this.stop = function(){
 	clearTimeout(animate);
 };

 //Calculem direcció d'eixida de 0 a 180 graus
 this.getRandomDirection=function(){
	
	return Math.floor(Math.random()*(directions.length/2));	
 };
} //END Class Ball
