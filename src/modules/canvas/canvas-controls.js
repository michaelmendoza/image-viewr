
const MAIN_ZOOM = 0.2;
const MAX_ZOOM = 4;
const ZOOM_STEP = 0.1;

class CanvasControls { 
	constructor() { 
		this.zoom = 1;
		this.aspectRatio = 1; 
		this.panX = 0; // TODO: Rename to offsetX
		this.panY = 0; // TODO: Rename to offsetY

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
			x: (point.x - this.panX) / this.zoom / this.aspectRatio,
			y: (point.y - this.panY) / this.zoom  
		};
	}

	/** Transform point from local coordinates to world coordinates */
	inverseTransform(point) { 
		return { 
			x: (point.x * this.zoom * this.aspectRatio) + this.panX,
			y: (point.y * this.zoom) + this.panY 
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
