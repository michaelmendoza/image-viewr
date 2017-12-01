
import Viewr from '../viewr.js';

class CanvasControls { 
	constructor() { 
		this.ZOOM_STEP = Viewr.settings.ZOOM_STEP;

		this.zoom = 1;
		this.aspectRatio = 1; 
		this.offsetX = 0; 
		this.offsetY = 0; 
		this.offsetCenterX = 0; // X Offset to center layers in global layer
		this.offsetCenterY = 0;	// Y Offset to center layers in global layer

		this.isPanning = false;
		this.startPanX = null;
		this.startPanY = null;		
	}

	setAspectRatio(dx, dy) { 
		this.aspectRatio = dx / dy;
	} 

	getOffsetX() { 
		return this.offsetX + this.offsetCenterX;
	}

	getOffsetY() {
		return this.offsetY + this.offsetCenterY;
	}

	/** Transform point from world coordinates to local coordinates */
	transform(point) { 
		return { 
			x: (point.x - this.getOffsetX() * this.zoom ) / this.zoom / this.aspectRatio,
			y: (point.y - this.getOffsetY() * this.zoom ) / this.zoom  
		};
	}

	/** Transform point from local coordinates to world coordinates */
	inverseTransform(point) { 
		return { 
			x: (point.x * this.aspectRatio + this.getOffsetX()) * this.zoom,
			y: (point.y + this.getOffsetY()) * this.zoom
		};
	}
	
	panImageFixedAmount(x, y) { 
		this.offsetX += x;
		this.offsetY += y;		
	}

	panImage(event) {
		// Event is point in Canvas Domain, x/y is point in Img Domain 
		var x = event.offsetX / this.zoom;
		var y = event.offsetY / this.zoom;

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
		this.zoom += this.ZOOM_STEP;
	}

	zoomOut() {
		this.zoom -= this.ZOOM_STEP;
	}

	setRelativeZoom(zoomFactor) {
		this.zoom += zoomFactor * this.ZOOM_STEP;
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
