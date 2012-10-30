/**
 * Crea una instància de Rajola 
 * Amb aquest objecte creem els blocs contra els quals la bola rebota i els fa desapareixer
 *
 * @constructor
 * @this {Rajola}
  *
 */
function Rajola(posx,posy) {
	this.x =(Math.round(posx));
	this.y =(Math.round(posy));
	this.id="myBrick"+this.x+"-"+this.y;
	
	switch(Math.floor(Math.random()*5)){
		case 0:
			this.imgObj = insertImage("images/block_groc.jpg",this.id);this.tipus="normal";
			break;
		case 1:
			this.imgObj = insertImage("images/block_lila.jpg",this.id);this.tipus="normal";
			break;
		case 2:
			this.imgObj = insertImage("images/block_orange.jpg",this.id);this.tipus="normal";
			break;
		case 3:
			this.imgObj = insertImage("images/block_roig.jpg",this.id);this.tipus="normal";
			break;		
		default:
			this.imgObj = insertImage("images/block_question.jpg",this.id);this.tipus="question";
	}
	
	
	 //alert(this.x+" , "+this.y);
	this.imgObj.style.left = this.x+ 'px';
	this.imgObj.style.top = this.y + 'px';
	
	//Heretem de la classe Observer pq nosaltres volem observar l'estat de la Ball
	inherits(new Observer(), this);	
	context.ball.AddObserver(this);

	// Get block position. Respecte al seu centre  
 	this.getCenteredPosition = function(){
		return {x:this.x+(this.imgObj.width/2),y:this.y+(this.imgObj.height/2)};
 	}
 
	this.Update = function(Objectbola){ //Value is a Ball Object
		
		var pos_bola=Objectbola.getCenteredPosition();
		var pos_bloc=this.getCenteredPosition();
		var min_x_y=(Objectbola.imgObj.width/2)+this.imgObj.width/2;
		
		var separacio_bola_bloc_x= Math.abs(pos_bola.x-pos_bloc.x);
		var separacio_bola_bloc_y= Math.abs(pos_bola.y-pos_bloc.y);
		
		if ((separacio_bola_bloc_x < min_x_y) && (separacio_bola_bloc_y < min_x_y) ){
			context.addScore(10);
			if (separacio_bola_bloc_x >= separacio_bola_bloc_y){
				//alert("DRETA_ESQUERRE separacio_bola_bloc_x="+separacio_bola_bloc_x+" separacio_bola_bloc_y="+separacio_bola_bloc_y);
				Objectbola.rebota("block","dreta_esquerre");
			}else{
				//alert("DALT_BAIX separacio_bola_bloc_x="+separacio_bola_bloc_x+" separacio_bola_bloc_y="+separacio_bola_bloc_y);
				Objectbola.rebota("block","dalt_baix");
			}
			
			if (this.tipus=="question") alert("atenció pregunta !!!!");
			
			Objectbola.RemoveObserver(this);
			
			removeImage(this.id);
			
			if (Objectbola.getCountRajoles()==0) context.youWin();
			
		}
	}
	
}//End class Rajola


