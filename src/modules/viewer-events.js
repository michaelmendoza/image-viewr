
import CanvasModes from './canvas-modes.js';
import FeatureTypes from './feature-types.js';
import ThresholdModes from './threshold-modes.js';

/**
 * Canvas based image viewer
 */
class ViewerEvents {

	handleMouseMove(event) {
		this.getPixelData(event);

		var actions = {

			[CanvasModes.PAN_UPDATE]: () => {
				this.panImage(event);
			},

			[CanvasModes.ROI]: () => {
				event = this.canvasDraw.removeOffsetAndZoom(event);
				var hoverFeature = this.featureManager.hoverOnFeature(event);
				this.canvasDraw.drawImage();
			},

			[CanvasModes.ROI_UPDATE_RADIUS]: () => { 
				event = this.canvasDraw.removeOffsetAndZoom(event);
				this.featureManager.updateActiveFeature(event);
				this.canvasDraw.drawImage();
			},

			[CanvasModes.ROI_UPDATE_POSITION]: () => {
				event = this.canvasDraw.removeOffsetAndZoom(event);
				this.featureManager.updateActiveFeaturePosition(event);
				this.canvasDraw.drawImage();
			},

			[CanvasModes.CUSTOM_ROI]: () => {
				event = this.canvasDraw.removeOffsetAndZoom(event);
				var hoverFeature = this.featureManager.hoverOnFeature(event);
				this.canvasDraw.drawImage();
			},

			[CanvasModes.CUSTOM_ROI_UPDATE_POINT]: () => {
				event = this.canvasDraw.removeOffsetAndZoom(event);
				this.featureManager.updateActiveFeature(event);
				this.canvasDraw.drawImage();
			},

			[CanvasModes.CUSTOM_ROI_UPDATE_POSITION]: () => { 
				event = this.canvasDraw.removeOffsetAndZoom(event);
				this.featureManager.updateActiveFeaturePosition(event);
				this.canvasDraw.drawImage();
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
				event = this.canvasDraw.removeOffsetAndZoom(event);
				this.featureManager.setActiveFeature(event);

				if(this.featureManager.activeFeature == null) {
					this.canvasMode = CanvasModes.ROI_UPDATE_RADIUS;
					this.featureManager.createFeature(event, FeatureTypes.CIRCLE);					
				}
				else if(this.featureManager.activeFeature.type == FeatureTypes.CIRCLE){
					var onHandles = this.featureManager.isOnActiveFeatureHandles(event);
					if(onHandles)
						this.canvasMode = CanvasModes.ROI_UPDATE_RADIUS;
					else
						this.canvasMode = CanvasModes.ROI_UPDATE_POSITION;
				}
				else if(this.featureManager.activeFeature.type == FeatureTypes.CUSTOM) {
					var onFeature = this.featureManager.hoverOnFeature(event);
					if(onFeature.activePoint != null)
						this.canvasMode = CanvasModes.CUSTOM_ROI_UPDATE_POINT;
					else
						this.canvasMode = CanvasModes.CUSTOM_ROI_UPDATE_POSITION;		
				}
			},

			[CanvasModes.CUSTOM_ROI]: () => {
				event = this.canvasDraw.removeOffsetAndZoom(event);
				this.featureManager.setActiveFeature(event);

				if(this.featureManager.activeFeature == null) {
					this.featureManager.createFeature(event, FeatureTypes.CUSTOM);
					this.featureManager.activeFeature.addPoint(event);
					this.canvasMode = CanvasModes.CUSTOM_ROI_ADD_POINT;
				}
				else if(this.featureManager.activeFeature.type == FeatureTypes.CIRCLE ) {
					var onHandles = this.featureManager.isOnActiveFeatureHandles(event);
					if(onHandles)
						this.canvasMode = CanvasModes.ROI_UPDATE_RADIUS;
					else
						this.canvasMode = CanvasModes.ROI_UPDATE_POSITION;
				}	
				else if(this.featureManager.activeFeature.type == FeatureTypes.CUSTOM) {
					var onFeature = this.featureManager.hoverOnFeature(event);
					if(onFeature.activePoint != null)
						this.canvasMode = CanvasModes.CUSTOM_ROI_UPDATE_POINT;
					else
						this.canvasMode = CanvasModes.CUSTOM_ROI_UPDATE_POSITION;					
				}

				this.canvasDraw.drawImage();
			},

			[CanvasModes.CUSTOM_ROI_ADD_POINT]: () => { 
				event = this.canvasDraw.removeOffsetAndZoom(event);
				this.featureManager.activeFeature.addPoint(event);
				if(this.featureManager.activeFeature.isClosedShape) 
					this.canvasMode = CanvasModes.CUSTOM_ROI;
				this.featureManager.updateActiveFeature(event);
				this.canvasDraw.drawImage();
			},

			[CanvasModes.THRESHOLD_EYEDROPPER]: () => {
				if(this.thresholdMode == ThresholdModes.COLOR) {
					var colorPixel = this.getPixelData(event);
					this.drawColorThresholdWithPixel(colorPixel);
					this.onSettingsChange();
					this.canvasMode = CanvasModes.THRESHOLD
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
				event = this.canvasDraw.removeOffsetAndZoom(event);
				this.featureManager.updateActiveFeature(event);
				this.canvasDraw.drawImage();
				this.canvasMode = CanvasModes.ROI;
			},
			
			[CanvasModes.ROI_UPDATE_POSITION]: () => {
				this.canvasDraw.drawImage();
				this.canvasMode = CanvasModes.ROI
			},

			[CanvasModes.CUSTOM_ROI_UPDATE_POINT]: () => {
				this.canvasDraw.drawImage();
				this.canvasMode = CanvasModes.CUSTOM_ROI;
			},

			[CanvasModes.CUSTOM_ROI_UPDATE_POSITION]: () => {
				this.featureManager.updateActiveFeaturePosition(null);
				this.canvasDraw.drawImage();
				this.canvasMode = CanvasModes.CUSTOM_ROI;
			}
		};

		(actions[this.canvasMode] || this.defaultAction)();
	}

}

export default ViewerEvents;

