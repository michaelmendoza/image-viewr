"use strict";

import Image from './image.js';
import FeatureManager from './feature-manager.js';

// Partial Classes
import ViewerEvents from './viewer-events.js';

/**
 * Canvas based image viewer
 */
class Viewer extends ViewerEvents {

	constructor(width, height) {
		super();

		// Canvas Properties 
		this.canvas = document.createElement('canvas');
		this.context = this.canvas.getContext('2d');
		this.width = width || 800;
		this.height = height || 600;
		this.canvas.width = this.width;
		this.canvas.height = this.height;

		// ImageCanvas Properties
		this.canvasDraw = new Image(this.canvas);

		this.featureManager = new FeatureManager(this.canvas);
		this.pixel = null;

		// Canvas Event Listeners/Handler
		this.defaultAction = () => {};
		this.onMouseMove = () => {};
		this.onCanvasModeChange = () => {};
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

	getPixelData(event) {
		var x = event.offsetX;
		var y = event.offsetY;
		var data = this.context.getImageData(x, y, 1, 1).data;
		var greyValue = Math.round((data[0] + data[1] + data[3]) / 3);
		this.pixel = { x:x, y:y, value:greyValue };
	}

	setCanvasMode(mode) {
		this.canvasMode = mode;
		this.onCanvasModeChange();
	}

	loadImage(imgFile) {
		this.canvasDraw.loadImage(imgFile);
	}

	loadDicomImage(imgFile) {

	}

	drawImage(imgFile) {
		this.canvasDraw.drawImage(imgFile);
	}

	drawDicomImage(imageFile) {
		this.canvasDraw.drawDicomImage(imageFile);
	}

	drawMinThreshold(minThreshold) {
		this.canvasDraw.drawMinThreshold(minThreshold);
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

