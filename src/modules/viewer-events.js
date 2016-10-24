
import CanvasModes from './canvas-modes.js';
import FeatureTypes from './feature-types.js';

/**
 * Canvas based image viewer
 */
class ViewerEvents {

	constructor() {
		this.canvasMode = CanvasModes.PIXEL;
	}

	handleMouseMove(event) {
		var actions = {

			[CanvasModes.PAN_UPDATE]: () => {
				this.panImage(event);
			},

			[CanvasModes.PIXEL]: () => { 
				this.getPixelData(event);
			},

			[CanvasModes.ROI_UPDATE_RADIUS]: () => { 
				//event = this.canvasDraw.removeOffsetAndZoom(event);
				this.featureManager.updateActiveFeature(event);
				this.canvasDraw.drawImage();
				//this.featureManager.drawAllFeatures(); 
			},

			[CanvasModes.ROI_UPDATE_POSITION]: () => {
				//event = this.canvasDraw.removeOffsetAndZoom(event);
				this.featureManager.updateActiveFeaturePosition(event);
				this.canvasDraw.drawImage();
				//this.featureManager.drawAllFeatures(); 
			}
		};

		(actions[this.canvasMode] || this.defaultAction)();
		this.onMouseMove();
	}

	handleMouseDown(event) {
		var actions = {
			[CanvasModes.PAN]: () => {
				this.canvasMode = CanvasModes.PAN_UPDATE;
				this.panImage(event);
			},

			[CanvasModes.ROI]: () => {
				//event = this.canvasDraw.removeOffsetAndZoom(event);
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

			[CanvasModes.PAN_UPDATE]: () => {
				this.canvasMode = CanvasModes.PAN;
				this.stopPanImage(event);
			},

			[CanvasModes.ROI_UPDATE_RADIUS]: () => {
				//event = this.canvasDraw.removeOffsetAndZoom(event);
				this.featureManager.updateActiveFeature(event);
				this.canvasDraw.drawImage();
				//this.featureManager.drawAllFeatures(); 
				this.canvasMode = CanvasModes.ROI;
			},
			[CanvasModes.ROI_UPDATE_POSITION]: () => {
				this.canvasDraw.drawImage();
				//this.featureManager.drawAllFeatures(); 
				this.canvasMode = CanvasModes.ROI
			}
		};

		(actions[this.canvasMode] || this.defaultAction)();
	}

}

export default ViewerEvents;
