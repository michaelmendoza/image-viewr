
class CanvasDraw {
	constructor(canvas) {
		this.canvas = canvas;
		this.context = this.canvas.getContext('2d');

		this.canvas.width = this.width;
		this.canvas.height = this.height;
		this.img = null;		
	}

	clear() {
		this.context.clearRect(0,0,this.width, this.height) 
	}

	drawImage(imgFile) {
		this.img = new Image();

		this.img.onload = function() {
			var context = this.context;
			this.width = this.img.width;
			this.height = this.img.height;
			this.canvas.width = this.width;
			this.canvas.height = this.height;

			this.img.crossOrigin = "Anonymous";
			context.drawImage(this.img, 0, 0);
			
		}.bind(this)

		this.img.src = imgFile;	
	}

	drawROI(roi) {
		this.context.drawImage(this.img, 0, 0);

		this.context.beginPath();
		this.context.strokeStyle = '#4DF94D';
		this.context.arc(roi.x, roi.y, roi.radius, 0, 2*Math.PI);
		this.context.stroke();
	}

}

export default CanvasDraw;

