
class CanvasROI {

	constructor(canvas) {
		this.canvas = canvas;
		this.context = this.canvas.getContext('2d');

		this.x = null;
		this.y = null;
		this.radius = null
		this.isUpdatingRadius = false; 
		this.isUpdatingPosition = false;
	}

	createROI(event) {
		this.x = event.offsetX;
		this.y = event.offsetY;
	}

	completeROI() {
		this.isUpdatingRadius = false;	
		this.isUpdatingPosition = false;
	}

	updateROIRadius(event) {
		var x = event.offsetX;
		var y = event.offsetY;
		var dx = Math.abs(this.x - x);
		var dy = Math.abs(this.y - y);
		this.radius = Math.sqrt(dx*dx + dy*dy);
	}

	updateROIPosition(event) {
		this.x = event.offsetX;
		this.y = event.offsetY;
	}

	isPositionInROI(event) {
		if(this.radius == null)
			return false;

		var x = event.offsetX;
		var y = event.offsetY;		
		var xCheck = (this.x - this.radius) <= x && x <= (this.x + this.radius);
		var yCheck = (this.y - this.radius) <= y && y <= (this.y + this.radius);
		return xCheck && yCheck;
	}

}

export default CanvasROI;

