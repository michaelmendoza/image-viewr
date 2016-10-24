import Viewer from '../../modules/viewer.js';
import CanvasModes from '../../modules/canvas-modes.js';
import EventEmitter from 'events';

class ViewerStore extends EventEmitter {

	constructor() {
		super();

		this.getCanvas = this.getCanvas.bind(this);
		this.getCanvasModes = this.getCanvasModes.bind(this);
		this.loadImage = this.loadImage.bind(this);
	}

	setupViewer(width, height) {
		this.viewer = new Viewer(width, height);
		this.viewer.onCanvasModeChange = () => { this.emit('canvasmode'); };
		this.viewer.onMouseMove = () => { this.emit('mousemove'); }; 
	}

	getCanvas() {
		return this.viewer;
	}

	getCanvasMousePixel() {
		return this.viewer.pixel;
	}

	getCanvasMode() {
		if(this.viewer === undefined)
			return null;
		return this.viewer.canvasMode;
	}

	getCanvasModes() {
		return CanvasModes;
	}

	getFeatures() {
		return this.viewer.getFeatures();
	}

	loadImage(imageFile) {
		this.viewer.loadImage(imageFile);
	}

	drawMinThreshold(minThreshold) {
		this.viewer.drawMinThreshold(minThreshold);
	}

	setCanvasMode(mode) {
		this.viewer.setCanvasMode(mode);
	}

	getMinThreshold() {
		return this.viewer.getImageParameters().minThreshold;
	}

	selectPanMode() {
		this.viewer.selectPanMode();
	}

	zoomIn() {
		this.viewer.zoomIn();
	}

	zoomOut() {
		this.viewer.zoomOut();
	}

	zoomReset() {
		this.viewer.zoomReset();
	}

}

export default new ViewerStore();
