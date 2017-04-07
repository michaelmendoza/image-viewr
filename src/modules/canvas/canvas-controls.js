
class CanvasControls {
	constructor() { 
		this.zoom = 1;
		this.panX = 0; // TODO: Rename to offsetX
		this.panY = 0; // TODO: Rename to offsetY

		this.isPanning = false;
		this.startPanX = null;
		this.startPanY = null;		
	}

	/** Transform point from world coordinates to local coordinates */
	transform(point) { 
		return { 
			x: (point.x - this.panX) / this.zoom,
			y: (point.y - this.panY) / this.zoom  
		};
	}

	/** Transform point from local coordinates to world coordinates */
	inverseTransform(point) { 
		return { 
			x: (point.x * this.zoom) + this.panX,
			y: (point.y * this.zoom) + this.panY 
		};
	}
	
	removeOffsetAndZoom(event) {
		return { 
			offsetX: (event.offsetX - this.panX) / this.zoom,
		 	offsetY: (event.offsetY - this.panY) / this.zoom  
		 };
	}

	panImageFixedAmount(x, y) { 
		this.panX += x;
		this.panY += y;		
	}

	panImage(event) {
		var x = event.offsetX;
		var y = event.offsetY;

		if(this.isPanning) {
			this.panX = (x - this.startPanX);
			this.panY = (y - this.startPanY);			
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
	}

	zoomOut() {
		this.zoom -= ZOOM_STEP;
	}

	setZoom(zoomValue) {
		this.zoom = zoomValue;
	}

	zoomReset() {
		this.zoom = 1;
		this.panX = 0;
		this.panY = 0;
	}

}

export default CanvasControls;
