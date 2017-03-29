"use strict";

import Image from './canvas/image.js';
import FeatureManager from './features/feature-manager.js';
import CanvasModes from './modes/canvas-modes.js';
import ThresholdModes from './modes/threshold-modes.js';
import ViewModes from './modes/view-modes';

// Partial Classes
import MouseEvents from './events/mouse-events.js';
import KeyEvents from './events/key-events.js';

/**
 * Canvas based image viewer
 */
class Viewer extends MouseEvents {

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
		this.viewMode = ViewModes._2D;

		// Canvas Event Listeners/Handler
		this.defaultAction = () => {};
		this.onMouseMove = () => {};
		this.onCanvasModeChange = () => {};
		this.onSettingsChange = () => {};
		this.canvas.onmousemove = this.handleMouseMove.bind(this);
		this.canvas.onmousedown = this.handleMouseDown.bind(this);
		this.canvas.onmouseup = this.handleMouseUp.bind(this);
		this.canvas.onmousewheel = this.handleMouseWheel.bind(this);

		this.keyEvents = new KeyEvents(this);
		window.addEventListener('keydown', this.keyEvents.keydown.bind(this));
	}

	setup3DViews(axialView, sagittalView, coronalView) {
		this.axialView = {};
		this.axialView.canvas = document.createElement('canvas');
		this.axialView.context = this.axialView.canvas.getContext('2d');
		this.axialView.canvas.width = axialView.width;
		this.axialView.canvas.height = axialView.height;

		this.sagittalView = {};
		this.sagittalView.canvas = document.createElement('canvas');
		this.sagittalView.context = this.sagittalView.canvas.getContext('2d');
		this.sagittalView.canvas.width = sagittalView.width;
		this.sagittalView.canvas.height = sagittalView.height;

		this.coronalView = {};
		this.coronalView.canvas = document.createElement('canvas');
		this.coronalView.context = this.coronalView.canvas.getContext('2d');
		this.coronalView.context.width = coronalView.width;
		this.coronalView.context.height = coronalView.height;		
	}

	/*** Modes ***/

	setCanvasMode(mode) {
		this.canvasMode = mode;
		this.onCanvasModeChange();
	}

	setThresholdMode(mode) {
		this.thresholdMode = mode;
		this.drawImage();
	}
	
	setViewMode(mode) {
		this.viewMode = mode;
	}

	/*** Resize ***/
	
	setViewportSize(width, height) {
		this.width = width;
		this.height = height;
		this.canvas.width = this.width;
		this.canvas.height = this.height;
	}

	/*** Features ***/

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

	/*** Image ***/

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

	getImageParameters() {
		return this.canvasDraw;
	}

	getPixelData(event) {
		this.pixel = this.canvasDraw.getPixelData(event.offsetX, event.offsetY);
		return this.pixel;
	}

	getColorPixelOffset() {
		return this.canvasDraw.colorPixelOffset;
	}

	loadFile(file) {
		this.canvasDraw.loadFile(file);
	}

	setColorPixelOffset(offset) {
		this.canvasDraw.setColorPixelOffset(offset);
		this.drawImage();
	}

	panImage(event) {
		this.canvasDraw.panImage(event);
	}

	panImageFixedAmount(x, y) {
		this.canvasDraw.panImageFixedAmount(x, y);
	}

	setZoom(zoomValue) {
		this.canvasDraw.setZoom(zoomValue);
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

