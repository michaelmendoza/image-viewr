"use strict";

import CanvasDraw from './canvas-draw.js';
import CanvasModes from './canvas-modes.js';
import CanvasROI from './canvas-roi.js';

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
		this.roi = new CanvasROI(this.canvas);
		this.pixel = null;

		// Canvas Event Listeners/Handler
		this.defaultAction = () => {};
		this.onMouseMove = () => {};
		this.onCanvasModeChange = () => {};
		this.canvas.onmousemove = this.handleMouseMove.bind(this);
		this.canvas.onmousedown = this.handleMouseDown.bind(this);
		this.canvas.onmouseup = this.handleMouseUp.bind(this);
	}

	getROI() {
		return this.roi;
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

	drawROI() {
		this.canvasDraw.drawROI(this.roi);
	}

	handleMouseMove(event) {
		var actions = {
			[CanvasModes.PIXEL]: () => { 
				this.getPixelData(event); 
			},
			[CanvasModes.ROI_UPDATE_RADIUS]: () => { 
				this.roi.updateROIRadius(event);
				this.drawROI(); 
			},
			[CanvasModes.ROI_UPDATE_POSITION]: () => {
				this.roi.updateROIPosition(event);
				this.drawROI();	
			} 
		}

		(actions[this.canvasMode] || this.defaultAction)();
		this.onMouseMove();
	}

	handleMouseDown(event) {
		var actions = {
			[CanvasModes.ROI]: () => {
				if(this.roi.isPositionInROI(event))
					this.canvasMode = CanvasModes.ROI_UPDATE_POSITION;
				else
					this.canvasMode = CanvasModes.ROI_UPDATE_RADIUS;	
				
				this.roi.createROI(event);
			}
		}

		(actions[this.canvasMode] || this.defaultAction)();
	}

	handleMouseUp() {
		var actions = {
			[CanvasModes.ROI_UPDATE_RADIUS]: () => {
				this.roi.updateROIRadius(event);
				this.drawROI();
				this.canvasMode = CanvasModes.ROI;
			},
			[CanvasModes.ROI_UPDATE_POSITION]: () => {
				this.drawROI();
				this.canvasMode = CanvasModes.ROI
			}
		}

		(actions[this.canvasMode] || this.defaultAction)();
	}

}

export default ImagerCanvas;

