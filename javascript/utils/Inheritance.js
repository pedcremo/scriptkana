function inherits(base, extension)
{
   for ( var property in base )
   {
      try
      {
         extension[property] = base[property];
      }
      catch( warning ){}
   }
}

// Replantejar codi en una superclasse o intentar crear
// un patro MVC per als objectes jugables i representables en pantalla
function insertImage(imgPath,idImg){
	var body = document.getElementsByTagName('body')[0];
	
	img = document.createElement('img');
	img.src = imgPath;
	
	img.id = idImg;
	img.style.position= 'absolute';
	
	body.appendChild(img)
	return img;
}

function removeImage(idImg){
	
  var element = document.getElementById(idImg);
  element.parentNode.removeChild(element);

}

function clearDom(){
	var imgs= document.getElementsByTagName('img');
	//alert("ClearDom "+imgs.length);
	var mida=imgs.length;
	for (var i=(mida-1);i>=0;i=i-1){
		//alert(imgs[i].id);
		imgs[i].parentNode.removeChild(imgs[i]);
	}
}

