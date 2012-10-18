/**
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

  var speed2=2; //Velocitat de la bola
  
  var directions = [ [3,-1],[2,-2],[1,-3]]; //partim amb sols 3 direccions possibles; 20, 45, 70 graus. Cada element representa un increment/decrement de pixels en x i y 
  
      
  //Meneja la bola
  this.move= function(){	
	 //posicionem la bola en les noves coordenades X i Y en funcio de la direcció que tinga asignada la bola
  	 self.locate(parseInt(self.imgObj.style.left)+self.dirX*speed2,parseInt(self.imgObj.style.top)+self.dirY*speed2);  
  }; //End move method
  
  
// Get ball position
 this.getPosition = function(){
	return {x:parseInt(self.imgObj.style.left),y:parseInt(self.imgObj.style.top)};
 }

 //Posicionem Bola de manera absoluta en X i Y i comprovem llímits
 
 this.locate = function(x,y){
	
	
	//Ens eixim per dalt
	if (y<=0 )	this.dirY=this.dirY*(-1);
	
	//Ens eixim per baix 
	if (y>=this.context.vpHeight-this.imgObj.height) {
			this.context.takeLive();
			return;
	}	
	//Ens eixim per dreta o esquerre
	if (x<=0 || x>=this.context.vpWidth-this.imgObj.width) this.dirX=this.dirX*(-1);
	
	
	this.imgObj.style.left = (Math.round(x))+ 'px';
	this.imgObj.style.top = (Math.round(y)) + 'px';
	//Avisem als Observers interessats en el nostre estat que estem canviant de posició
	this.Notify(this);
	
 }; //End locate method
 
 this.rebota = function(){
	//Si rebotem canviem el sentit de la bola en el eix Y
 	this.dirY*=(-1);
 }

 //Sortejem direcció i comencem a moure la pola
 this.start = function(){
		
	this.setDirection(this.getRandomDirection());
	animate=setInterval(self.move, 10);
	
 }
 //Parem la bola 
 this.stop = function(){
 	clearTimeout(animate);
 };
 //Associem a la bola una direcció i el seu corresponent component dx i dy 
this.setDirection=function(directionIndex){
 		this.imgObj.meneja=directionIndex;
 		this.dirX=directions[directionIndex][0];
 		this.dirY=directions[directionIndex][1];
 		//alert("Dir ="+directionIndex+" dirX"+this.dirX);
 }
 //Calculem direcció d'eixida de 0 a 180 graus
 this.getRandomDirection=function(){
	
	return Math.floor(Math.random()*(directions.length));	
 };
} //END Class Ball
