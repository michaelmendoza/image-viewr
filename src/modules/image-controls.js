
const MAIN_ZOOM = 0.2;
const MAX_ZOOM = 4;
const ZOOM_STEP = 0.1;

var ImageControls = function() {

	this.removeOffsetAndZoom = (event) => {
		return { offsetX:event.offsetX * this.zoom - this.panX, offsetY:event.offsetY * this.zoom - this.panY };
	}

	this.panImage = (event) => {
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

	this.stopPanImage = () => {
		this.isPanning = false;
	}

	this.zoomIn = () => {
		this.zoom += ZOOM_STEP;
		this.clear();
		this.drawImage();
	}

	this.zoomOut = () => {
		this.zoom -= ZOOM_STEP;
		this.clear();		
		this.drawImage();
	}

	this.zoomReset = () => {
		this.zoom = 1;
		this.panX = 0;
		this.panY = 0;
		this.clear();		
		this.drawImage();
	}

}

export default ImageControls;

