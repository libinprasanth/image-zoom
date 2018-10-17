window.onload = function(){
  var zoom = document.querySelectorAll('[data-zoom="enabled"]');    
  Array.prototype.forEach.call(zoom, function(event){
	uiZoom(event);
  });
  function uiZoom(e){ 
	/*
	* Default zoom options
	*/
	var options = {
	  zoomWidth: (e.getAttribute('lens-width') != null)?parseInt(e.getAttribute('lens-width')):100,
	  borderRadius: (e.getAttribute('border-radius') != null)?parseInt(e.getAttribute('border-radius')):100,
	  zoomImage: (e.getAttribute('data-image') != null)?e.getAttribute('data-image'):e.src,
	  initalScale: 1,
	  borderColor: (e.getAttribute('border-color') != null)?e.getAttribute('border-color'):'#000',
	  borderWidth:(e.getAttribute('border-width') != null)?parseInt(e.getAttribute('border-width')):2,
	}; 
	/*
	* Create Wrapper div and insert around the target image
	*/
	var wrapper = document.createElement('div');  
	wrapper.setAttribute('class', 'ui-zoom');
	wrapper.style.position = 'relative'; 
	wrapper.style.overflow = 'hidden';
	e.parentNode.appendChild(wrapper, e);
	wrapper.append(e);
	/*
	* Create zoom div
	*/
	var ZoomLens = document.createElement('div');
	ZoomLens.setAttribute('clas', 'ui-zoom-handler');
	ZoomLens.style.width = options.zoomWidth+'px';
	ZoomLens.style.height = options.zoomWidth+'px';
	ZoomLens.style.backgroundColor = '#fff';
	ZoomLens.style.borderRadius = options.borderRadius+'%';
	ZoomLens.style.overflow = 'hidden';
	ZoomLens.style.position = 'absolute';
	ZoomLens.style.borderStyle = 'solid';
	ZoomLens.style.borderWidth = options.borderWidth+'px';
	ZoomLens.style.borderColor = options.borderColor;
	ZoomLens.style.top = '0';
	ZoomLens.style.left = '0'; 
	ZoomLens.style.cursor = 'crosshair';
	ZoomLens.style.marginTop = -((options.zoomWidth+options.borderWidth*2)/2)+'px';
	ZoomLens.style.display = 'none';	
	wrapper.append(ZoomLens);
	
	/*
	* Creating zoom image and append inside zoom div 
	*/
	var zoomImage = document.createElement('img');
	zoomImage.src = options.zoomImage;
	zoomImage.style.maxWidth = 'inherit';
	zoomImage.style.position = 'absolute';
	zoomImage.style.width = e.width * options.initalScale + 'px';
	zoomImage.style.height = e.height * options.initalScale + 'px';  
	ZoomLens.append(zoomImage);
	var eX = 0;
	var eY = 0;
	wrapper.addEventListener('mousemove', function(event){
	  // console.log(event);
	  eX = event.x; 
	  eY = event.y;
	  var l = eX - (e.x / 2 * 3);
	  var t = eY - (e.y / 2 * 3);
	  ZoomLens.style.left = l+'px';
	  ZoomLens.style.top = t+'px';  
	  setZoom();
	  
	});
	
	function setZoom(){ 
	  var lp = ((eX - e.x - ((options.zoomWidth+options.borderWidth*2)/2)) * options.initalScale);
	  var tp = ((eY - e.y - ((options.zoomWidth+options.borderWidth*2)/2))* options.initalScale);  
	  zoomImage.style.left = -lp+'px';
	  zoomImage.style.top = -tp+'px';
	}
	
	// Mouse Wheel event
	wrapper.addEventListener('mousewheel', (event) => changeZoom(event));
	wrapper.addEventListener('DOMMouseScroll', (event) => changeZoom(event));
	wrapper.addEventListener('onmousewheel', (event) => changeZoom(event));
	function changeZoom(event){
	  if(event.deltaY >= 100){
		var s = options.initalScale - .02;
	    options.initalScale = (s <= 1)?1:s;
	  }
	  if(event.deltaY <= -100){
		var s = options.initalScale + .02;
	    options.initalScale = (s >= 2)?2:s;
	  }
	  zoomImage.style.width = e.width * options.initalScale + 'px';
	  zoomImage.style.height = e.height * options.initalScale + 'px';
	  setZoom();
	}
	
	// Mosue enter 
	wrapper.addEventListener('mouseenter', function(event){ 
	  ZoomLens.style.display = 'block';
	});
	// Mosue leave 
	wrapper.addEventListener('mouseleave', function(event){
	  ZoomLens.style.display = 'none';	
	});
  }
}