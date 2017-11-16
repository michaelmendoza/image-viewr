
const MAIN_ZOOM = 0.2;
const MAX_ZOOM = 4;
const ZOOM_STEP = 0.1;

class CanvasControls { 
	constructor() { 
		this.zoom = 1;
		this.aspectRatio = 1; 
		this.offsetX = 0; 
		this.offsetY = 0; 
		
		this.isPanning = false;
		this.startPanX = null;
		this.startPanY = null;		
	}

	setAspectRatio(dx, dy) { 
		this.aspectRatio = dx / dy;
	} 

	/** Transform point from world coordinates to local coordinates */
	transform(point) { 
		return { 
			x: (point.x - this.offsetX) / this.zoom / this.aspectRatio,
			y: (point.y - this.offsetY) / this.zoom  
		};
	}

	/** Transform point from local coordinates to world coordinates */
	inverseTransform(point) { 
		return { 
			x: (point.x * this.aspectRatio + this.offsetX) * this.zoom,
			y: (point.y + this.offsetY) * this.zoom
		};
	}
	
	panImageFixedAmount(x, y) { 
		this.offsetX += x;
		this.offsetY += y;		
	}

	panImage(event) {
		var x = event.offsetX;
		var y = event.offsetY;

		if(this.isPanning) {
			this.offsetX = (x - this.startPanX);
			this.offsetY = (y - this.startPanY);			
		}
		else {
			this.startPanX = x - this.offsetX;
			this.startPanY = y - this.offsetY;
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

	setRelativeZoom(zoomFactor) {
		this.zoom += zoomFactor * ZOOM_STEP;
	}

	setZoom(zoomValue) {
		this.zoom = zoomValue;
	}

	zoomReset() {
		this.zoom = 1;
		this.offsetX = 0;
		this.offsetY = 0;
	}
}

export default CanvasControls;
