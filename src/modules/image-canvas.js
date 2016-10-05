"use strict";

import CanvasDraw from './canvas-draw.js';
import CanvasModes from './canvas-modes.js';
import FeatureTypes from './feature-types.js';
import FeatureManager from './feature-manager.js';

/**
 * Canvas based image viewer
 */
class ImagerCanvas {

	constructor() {

		// Canvas Properties 
		this.canvas = document.createElement('canvas');
		this.context = this.canvas.getContext('2d');

		// ImageCanvas Properties
		this.canvasMode = CanvasModes.PIXEL;
		this.canvasDraw = new CanvasDraw(this.canvas);
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

	drawImage(imgFile) {
		this.canvasDraw.drawImage(imgFile);
	}

	drawMinThreshold(minThreshold) {
		this.canvasDraw.drawMinThreshold(minThreshold);
	}

	handleMouseMove(event) {
		var actions = {
			[CanvasModes.PIXEL]: () => { 
				this.getPixelData(event);
			},
			[CanvasModes.ROI_UPDATE_RADIUS]: () => { 
				this.featureManager.updateActiveFeature(event);
				this.canvasDraw.drawLoadedImage();
				this.featureManager.drawAllFeatures(); 
			},
			[CanvasModes.ROI_UPDATE_POSITION]: () => {
				this.featureManager.updateActiveFeaturePosition(event);
				this.canvasDraw.drawLoadedImage();
				this.featureManager.drawAllFeatures(); 
			}
		};

		(actions[this.canvasMode] || this.defaultAction)();
		this.onMouseMove();
	}

	handleMouseDown(event) {
		var actions = {
			[CanvasModes.ROI]: () => {

				this.featureManager.setActiveFeature(event);

				if(this.featureManager.activeFeature == null) {
					this.canvasMode = CanvasModes.ROI_UPDATE_RADIUS;
					this.featureManager.createFeature(event, FeatureTypes.CIRCLE);					
				}
				else {
					this.canvasMode = CanvasModes.ROI_UPDATE_POSITION;

				}
			}
		};

		(actions[this.canvasMode] || this.defaultAction)();
	}

	handleMouseUp() {
		var actions = {

			[CanvasModes.ROI_UPDATE_RADIUS]: () => {
				this.featureManager.updateActiveFeature(event);
				this.canvasDraw.drawLoadedImage();
				this.featureManager.drawAllFeatures(); 
				this.canvasMode = CanvasModes.ROI;
			},
			[CanvasModes.ROI_UPDATE_POSITION]: () => {
				this.canvasDraw.drawLoadedImage();
				this.featureManager.drawAllFeatures(); 
				this.canvasMode = CanvasModes.ROI
			}
		};

		(actions[this.canvasMode] || this.defaultAction)();
	}

}

export default ImagerCanvas;

