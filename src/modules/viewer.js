"use strict";

import Image from './image.js';
import FeatureManager from './feature-manager.js';
import CanvasModes from './canvas-modes.js';
import ThresholdModes from './threshold-modes.js';

// Partial Classes
import ViewerEvents from './viewer-events.js';

/**
 * Canvas based image viewer
 */
class Viewer extends ViewerEvents {

	constructor(width, height) {
		super();

		// Canvas Properties 
		this.canvas = document.createElement('canvas');	// Canvas DOM
		this.context = this.canvas.getContext('2d');		// Context reference
		this.width = width || 800;											// Viewer DOM Width
		this.height = height || 600;										// Viewer DOM Height
		this.canvas.width = this.width;
		this.canvas.height = this.height;

		// ImageCanvas Properties
		this.canvasDraw = new Image(this);
		this.featureManager = new FeatureManager(this);
		this.pixel = null;

		// Modes/Settings
		this.canvasMode = CanvasModes.PAN;
		this.thresholdMode = ThresholdModes.NONE;

		// Canvas Event Listeners/Handler
		this.defaultAction = () => {};
		this.onMouseMove = () => {};
		this.onCanvasModeChange = () => {};
		this.onSettingsChange = () => {};
		this.canvas.onmousemove = this.handleMouseMove.bind(this);
		this.canvas.onmousedown = this.handleMouseDown.bind(this);
		this.canvas.onmouseup = this.handleMouseUp.bind(this);
	}

	getActiveFeature() {
		return this.featureManager.activeFeature;
	}

	getFeatures() {
		return this.featureManager.features;
	}

	deleteFeature(index) {
		this.featureManager.deleteFeature(index);
		this.drawImage();
	}

	getImageParameters() {
		return this.canvasDraw;
	}

	getPixelData(event) {
		var x = event.offsetX;
		var y = event.offsetY;
		var data = this.context.getImageData(x, y, 1, 1).data;
		var greyValue = Math.round((data[0] + data[1] + data[2]) / 3);
		this.pixel = { x:x, y:y, r:data[0], g:data[1], b:data[2], value:greyValue };
		return this.pixel;
	}

	setCanvasMode(mode) {
		this.canvasMode = mode;
		this.onCanvasModeChange();
	}

	getColorPixelOffset() {
		return this.canvasDraw.colorPixelOffset;
	}

	setColorPixelOffset(offset) {
		this.canvasDraw.setColorPixelOffset(offset);
	}

	setThresholdMode(mode) {
		this.thresholdMode = mode;
		this.drawImage();
	}

	loadImage(imgFile) {
		this.canvasDraw.loadImage(imgFile);
	}

	drawImage() {
		this.canvasDraw.drawImage();
	}

	drawColorThreshold(colorThreshold) {
		this.canvasDraw.setColorThreshold(colorThreshold);
		this.drawImage();
	}

	drawColorThresholdWithPixel(colorPixel) {
		this.canvasDraw.setColorThresholdWithPixel(colorPixel);
		this.drawImage();
	}

	drawMinThreshold(minThreshold) {
		this.canvasDraw.setMinThreshold(minThreshold);
		this.drawImage();
	}

	panImage(event) {
		this.canvasDraw.panImage(event);
	}

	stopPanImage() {
		this.canvasDraw.stopPanImage();
	}

	zoomIn() {
		this.canvasDraw.zoomIn();
	}
	
	zoomOut() {
		this.canvasDraw.zoomOut();
	}
	
	zoomReset() {
		this.canvasDraw.zoomReset();
	}
}

export default Viewer;

