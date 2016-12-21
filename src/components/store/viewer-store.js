import Viewer from '../../modules/viewer.js';
import CanvasModes from '../../modules/canvas-modes.js';
import ThresholdModes from '../../modules/threshold-modes.js';
import EventEmitter from 'events';

class ViewerStore extends EventEmitter {

	constructor() {
		super();

		this.getCanvas = this.getCanvas.bind(this);
		this.getCanvasModes = this.getCanvasModes.bind(this);
		this.loadFile = this.loadFile.bind(this);
	}

	setupViewer(width, height) {
		this.viewer = new Viewer(width, height);
		this.viewer.onCanvasModeChange = () => { this.emit('canvasmode'); };
		this.viewer.onMouseMove = () => { this.emit('mousemove'); }; 
		this.viewer.onSettingsChange = () => { this.emit('settings_update'); };
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

	getThresholdModes() {
		return ThresholdModes;
	}

	getFeatures() {
		return this.viewer.getFeatures();
	}

	deleteFeature(index) {
		return this.viewer.deleteFeature(index);
	}

	loadFile(file) {
		this.viewer.loadFile(file);
	}

	drawColorThreshold(colorThreshold) {
		this.viewer.drawColorThreshold(colorThreshold);
	}

	drawMinThreshold(minThreshold) {
		this.viewer.drawMinThreshold(minThreshold);
	}

	setCanvasMode(mode) {
		this.viewer.setCanvasMode(mode);
	}

	setColorPixelOffset(offset) {
		this.viewer.setColorPixelOffset(offset);
	}

	getColorPixelOffset() {
		return this.viewer.getColorPixelOffset();
	}

	getColorThreshold() {
		return this.viewer.getImageParameters().colorThreshold;
	}

	getMinThreshold() {
		return this.viewer.getImageParameters().minThreshold;
	}

	getThresholdMode() {
		return this.viewer.thresholdMode;
	}

	setThresholdMode(thresholdMode) {
		this.viewer.setThresholdMode(thresholdMode);
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
