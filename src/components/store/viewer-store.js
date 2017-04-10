import Viewr from '../../modules/viewr.js';
import CanvasModes from '../../modules/modes/canvas-modes.js';
import FeatureTypes from '../../modules/modes/feature-types.js';
import ThresholdModes from '../../modules/modes/threshold-modes.js';
import EventEmitter from 'events';

class ViewerStore extends EventEmitter {

	constructor() {
		super();

		this.getCanvas = this.getCanvas.bind(this);
		this.getCanvasModes = this.getCanvasModes.bind(this);
		this.loadFile = this.loadFile.bind(this);
	}

	setupViewer(width, height) {
		Viewr.onModeChange = () => { this.emit('canvasmode'); };

		this.viewer = new Viewr.Canvas(width, height);
		this.viewer.onMouseMove = () => { this.emit('mousemove'); }; 
		this.viewer.onSettingsChange = () => { this.emit('settings_update'); };
	}

	setViewportSize(width, height) { 
		this.viewer.setViewportSize(width, height);
	}

	getCanvas() { 
		return this.viewer;
	}

	getCanvasMousePixel() {
		return this.viewer.pixel.data;
	}

	getCanvasMode() {
		return Viewr.modes.canvas;
	}

	getCanvasModes() {
		return CanvasModes;
	}

	getFeatureTypes() {
		return FeatureTypes;
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

	drawImage() {
		this.viewer.drawImage();
	}

	drawColorThreshold(colorThreshold) {
		this.viewer.setColorThreshold(colorThreshold);
	}

	drawMinThreshold(minThreshold) {
		this.viewer.setMinThreshold(minThreshold);
	}

	setCanvasMode(mode) {
		Viewr.setMode('canvas', mode);
	}

	setColorPixelOffset(offset) {
		this.viewer.setColorPixelOffset(offset);
	}

	getColorPixelOffset() {
		return this.viewer.getColorPixelOffset();
	}

	getColorThreshold() {
		return this.viewer.threshold.colorThreshold;
	}

	getMinThreshold() {
		return this.viewer.threshold.minThreshold;
	}

	getThresholdMode() {
		return Viewr.modes.threshold;
	}

	setThresholdMode(thresholdMode) {
		Viewr.setMode('threshold', thresholdMode);
	}

	getViewMode(viewMode) {
		Viewr.setMode('view', viewMode);
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

	setZoom(zoomValue) {
		this.viewer.setZoom(zoomValue);
	}

	zoomReset() {
		this.viewer.zoomReset();
	}

}

export default new ViewerStore();
