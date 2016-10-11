import Viewer from '../../modules/viewer.js';
import EventEmitter from 'events';

class ViewerStore extends EventEmitter {

	constructor() {
		super();

		this.getCanvas = this.getCanvas.bind(this);
		this.loadImage = this.loadImage.bind(this);
		this.loadDicomImage = this.loadDicomImage.bind(this);
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

	getFeatures() {
		return this.viewer.getFeatures();
	}

	setCanvasMode(mode) {
		this.viewer.setCanvasMode(mode);
	}

	loadImage(imageFile) {
		this.viewer.loadImage(imageFile);
	}

	loadDicomImage(imageFile) {
		this.viewer.drawDicomImage(imageFile);
	}

	drawMinThreshold(minThreshold) {
		this.viewer.drawMinThreshold(minThreshold);
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
