
class Canvas {

	constructor(width, height) {
		super();

		// Canvas Properties
		this.canvas = document.createElement('canvas');
		this.context = this.canvas.getContext('2d');
		this.width = width;
		this.height = height;
		this.canvas.width = width;
		this.canvas.height = height;
		
		// Image/File 
		this.file = null;
		this.img = null;

		// Canvas Modules 
		this.contrast = null;
		this.controls = null;
		this.load = null;
		this.thresholds = null;
	}
}