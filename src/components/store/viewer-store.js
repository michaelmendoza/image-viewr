import ImageCanvas from '../../modules/image-canvas.js';
import EventEmitter from 'events';

class ViewerStore extends EventEmitter {

	constructor() {
		super();
		this.canvas = new ImageCanvas();
		this.canvas.onCanvasModeChange = () => { this.emit('canvasmode'); };
		this.canvas.onMouseMove = () => { this.emit('mousemove'); }; 

		this.getCanvas = this.getCanvas.bind(this);
		this.loadImage = this.loadImage.bind(this);
	}

	getCanvas() {
		return this.canvas;
	}

	getCanvasMousePixel() {
		return this.canvas.pixel;
	}

	getCanvasMode() {
		return this.canvas.canvasMode;
	}

	setCanvasMode(mode) {
		this.canvas.setCanvasMode(mode);
	}

	loadImage(imageFile) {
		this.canvas.drawImage(imageFile);
	}

	drawMinThreshold(minThreshold) {
		this.canvas.drawMinThreshold(minThreshold);
	}

}

export default new ViewerStore();
