import Viewr from '../../modules/viewr.js';
import CanvasModes from '../../modules/modes/canvas-modes.js';
import FeatureTypes from '../../modules/modes/feature-types.js';
import ThresholdModes from '../../modules/modes/threshold-modes.js';
import ViewModes from '../../modules/modes/view-modes.js';
import EventEmitter from 'events';

import KeyEvents from '../../modules/events/key-events.js'; 

class ViewerStore extends EventEmitter {

	constructor() {
		super();

		this.getCanvas = this.getCanvas.bind(this);
		this.getCanvasModes = this.getCanvasModes.bind(this);
		this.loadFile = this.loadFile.bind(this);
	}

	setupViewer(info) {
		Viewr.onModeChange = () => { this.emit('canvasmode'); };
		Viewr.onFeatureUpdate = () => { this.emit('feature-update')};

		this.viewer = new Viewr.Canvas(info[0].width, info[0].height);
		this.viewer2 = new Viewr.Canvas(info[1].width, info[1].height);
		this.viewer3 = new Viewr.Canvas(info[2].width, info[2].height);

		this.viewer.dimIndex = 0;  // z
		this.viewer2.dimIndex = 1; // y
		this.viewer3.dimIndex = 2; // x

		this.viewer.addCanvasToElement(info[0].id);
		this.viewer2.addCanvasToElement(info[1].id);
		this.viewer3.addCanvasToElement(info[2].id);

		this.viewer.setSliceSelect(this.viewer2, this.viewer3); // y, x 
		this.viewer2.setSliceSelect(this.viewer3, this.viewer); // x, z
		this.viewer3.setSliceSelect(this.viewer2, this.viewer); // y, z

		this.viewer.onMouseMove = () => { this.emit('mousemove'); }; 
		this.viewer.onSettingsChange = () => { this.emit('settings_update'); };		

		var keyEvents = new KeyEvents();
		window.onkeydown = keyEvents.keydownSliceSelect.bind(this.viewer);
	}

	setupVolumeRenderer(elementID) { 
		var img = this.viewer.drawTile3DImage();
		this.viewer.volumeRender.render(elementID, img);
	}

	setViewportSize(info) { 
		this.viewer.setViewportSize(info[0].width, info[0].height);
		this.viewer2.setViewportSize(info[1].width, info[1].height);
		this.viewer3.setViewportSize(info[2].width, info[2].height);
	}

	getCanvas() { 
		return this.viewer;
	}

	getCanvasMousePixel() {
		return this.viewer.pixel.data;
	}

	getSliceIndex() {
		return this.viewer.sliceIndex;
	}

	updateAlphaFactor(alphaFactor) {
		this.viewer.volumeRender.updateAlphaFactor(alphaFactor);
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
		this.viewer2.loadFile(file);
		this.viewer3.loadFile(file);

		this.viewer.autoZoomResize();
		this.viewer2.autoZoomResize();
		this.viewer3.autoZoomResize();

		this.viewer.drawImage();
		this.viewer2.drawImage();
		this.viewer3.drawImage();
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

	getViewMode() {
		return Viewr.modes.view;
	}

	getViewModes() {
		return ViewModes;
	}

	setViewMode(viewMode) {
		Viewr.setMode('view', viewMode);
	}
	
	selectPanMode() {
		this.viewer.selectPanMode();
	}

	zoomIn() {
		this.viewer.zoomIn();
		this.viewer2.zoomIn();
		this.viewer3.zoomIn();
	}

	zoomOut() {
		this.viewer.zoomOut();
		this.viewer2.zoomOut();
		this.viewer3.zoomOut();				
	}

	setZoom(zoomValue) {
		this.viewer.setZoom(zoomValue);
		this.viewer2.setZoom(zoomValue);
		this.viewer3.setZoom(zoomValue);
	}

	zoomReset() {
		this.viewer.zoomReset();
		this.viewer2.zoomReset();
		this.viewer3.zoomReset();
	}

}

export default new ViewerStore();
