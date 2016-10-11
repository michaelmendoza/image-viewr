
// Partial Classes
import ImageDraw from './image-draw.js';

const MAIN_ZOOM = 0.2;
const MAX_ZOOM = 4;
const ZOOM_STEP = 0.1;

class _Image extends ImageDraw {
	constructor(canvas) {
		super();
		this.canvas = canvas;
		this.context = this.canvas.getContext('2d');
		this.img = null;
	
		this.width = null;
		this.height = null;
		this.zoom = 1;

		this.isPanning = false;
		this.startPanX = null;
		this.startPanY = null;
		this.panX = null;
		this.panY = null;
	}

	clear() {
		this.context.clearRect(0,0,this.canvas.width, this.canvas.height);
	}	

	loadImage(imgFile) {
		this.img = new Image();

		this.img.onload = function() {
			var context = this.context;
			this.width = this.img.width;
			this.height = this.img.height;
			this.img.crossOrigin = "Anonymous";
			context.drawImage(this.img, 0, 0);
			
		}.bind(this)

		this.img.src = imgFile;	
	}

	drawImage() {
		var sx = 0;
		var sy = 0;
		var sWidth = Math.round(this.width);
		var sHeight = Math.round(this.height);
		var dx = this.panX;
		var dy = this.panY;
		var dWidth = Math.round(this.width * this.zoom);
		var dHeight = Math.round(this.height * this.zoom);
		this.context.drawImage(this.img, sx, sy, sWidth, sHeight, dx, dy, dWidth, dHeight);
	}

	drawDicomImage(imgFile) {
		this.width = imgFile.width;
		this.height = imgFile.height;
		this.clear();
		this.drawPixelData(imgFile.pixelData, this.width * this.height);
	}	

	drawPixelData(pixelData, numPixels) {
		var imageData = this.context.getImageData(0, 0, this.width, this.height);
		for(var i = 0; i < numPixels; i++) {
		    imageData.data[4*i] = (pixelData[i]*255)/4095;
		    imageData.data[4*i+1] = (pixelData[i]*255)/4095;
		    imageData.data[4*i+2] = (pixelData[i]*255)/4095;
		    imageData.data[4*i+3] = 255;
		}
		this.context.putImageData(imageData, 0, 0);
	}

	panImage(event) {
		var x = event.offsetX;
		var y = event.offsetY;

		if(this.isPanning) {
			this.panX = (x - this.startPanX);
			this.panY = (y - this.startPanY);
			this.clear();
			this.drawImage();			
		}
		else {
			this.startPanX = x - this.panX;
			this.startPanY = y - this.panY;
			this.isPanning = true;
		}

	}

	stopPanImage() {
		this.isPanning = false;
	}

	zoomIn() {
		this.zoom += ZOOM_STEP;
		this.clear();
		this.drawImage();
	}

	zoomOut() {
		this.zoom -= ZOOM_STEP;
		this.clear();		
		this.drawImage();
	}

	zoomReset() {
		this.zoom = 1;
		this.panX = 0;
		this.panY = 0;
		this.clear();		
		this.drawImage();
	}

}

export default _Image;

