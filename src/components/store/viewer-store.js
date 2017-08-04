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

		this.Viewr = Viewr;
		
		this.getCanvas = this.getCanvas.bind(this);
		this.getCanvasModes = this.getCanvasModes.bind(this);
		this.loadFile = this.loadFile.bind(this);
	}

	setupViewer(info) { 
		Viewr.onFeatureUpdate = () => { this.emit('feature-update')};

		this.viewer = new Viewr.Canvas(info[0].ref);
		this.viewer2 = new Viewr.Canvas(info[1].ref);
		this.viewer3 = new Viewr.Canvas(info[2].ref);

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

	isLayersLoaded() { 
		if(this.viewer)
			return this.viewer.layers.isLoaded();
		else
			return false;
	}

	setupVolumeRenderer(elementID) { 
		//var img = this.viewer.drawTile3DImage();
		var img = null;
		this.viewer.volumeRender.render(elementID, img);
	}

	setViewportSize() { 
		/*
		this.viewer.setViewportSize();
		this.viewer2.setViewportSize();
		this.viewer3.setViewportSize();

		this.viewer.drawImage();
		this.viewer2.drawImage();
		this.viewer3.drawImage();		
		*/
	}

	autoZoomResize() {
		/*
		this.viewer.autoZoomResize();
		this.viewer2.autoZoomResize();	
		this.viewer3.autoZoomResize();	
		*/		
	}	

	getCanvas() { 
		return this.viewer;
	}

	getLayers() {
		return this.viewer.getLayers();
	}

	getFileType() { 
		return this.viewer.getFileType();
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
		//this.viewer2.loadFile(file);
		//this.viewer3.loadFile(file);
	}

	clear() {
		this.viewer.clear();
		this.viewer2.clear();
		this.viewer3.clear();
	}

	drawImage() { 
		this.viewer.drawImage();
		this.viewer2.drawImage();
		this.viewer3.drawImage();
	}

	drawColorThreshold(colorThreshold) {
		this.viewer.setColorThreshold(colorThreshold);
	}

	drawMinThreshold(minThreshold) {
		this.viewer.setMinThreshold(minThreshold);
		this.viewer2.setMinThreshold(minThreshold);
		this.viewer3.setMinThreshold(minThreshold);
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

	getZoom() {
		return this.viewer.getZoom();
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

	is2DView() {
		return Viewr.modes.view == ViewModes._2D;
	}

	is3DView() {
		return Viewr.modes.view == ViewModes._3D;
	}

}

export default new ViewerStore();
