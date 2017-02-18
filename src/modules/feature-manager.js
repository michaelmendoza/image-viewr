
import CanvasModes from './canvas-modes.js';
import FeatureTypes from './feature-types.js';
import FeatureCircleROI from './feature-circle-roi.js';
import FeatureRectangleROI from './feature-rectangle-roi.js';
import FeatureCustomROI from './feature-custom-roi.js';
import ThresholdModes from './threshold-modes.js';

class FeatureManager { 
	constructor(viewer) {
		this.viewer = viewer;
		this.canvas = viewer.canvas;
		this.context = this.canvas.getContext('2d');	

		this.activeFeature = null;
		this.activeFeatureHandle = null;
		this.features = [];
	}

	createFeature(event, type) {
		// Create Feature and set as active feature
		if(type == FeatureTypes.CIRCLE) {
			var feature = new FeatureCircleROI();
		}
		else if(type == FeatureTypes.RECT) {
			var feature = new FeatureRectangleROI();
		}
		else if(type == FeatureTypes.CUSTOM) {
			var feature = new FeatureCustomROI();
		}
		else {
			console.log('Warning: Invalid Feature Type');
			return;
		}

		feature.create(event);
		this.features.push(feature);
		this.activeFeature = feature;
	}

	deleteFeature(index) {
		this.features.splice(index, 1);
	}

	drawAllFeatures() {
		var context = this.context;
		this.features.forEach(function(feature) {
			if(feature.type == FeatureTypes.CIRCLE)
				this.viewer.canvasDraw.drawCircleROI(feature);
			else if(feature.type == FeatureTypes.CUSTOM)
				this.viewer.canvasDraw.drawCustomROI(feature);
		}.bind(this))
	} 

	getActiveFeature() {
		return this.activeFeature;
	}

	isOnActiveFeatureHandles(event) {
		return this.activeFeature.isOnHandle(event);
	}

	hoverOnFeature(event) {
		var hoverFeature = null;
		this.features.forEach(function(feature) {
			feature.isHover = false;
			if(feature.isOnROI(event)) {
				hoverFeature = feature;
				hoverFeature.isHover = true;
			}
		})

		return hoverFeature;
	}

	setActiveFeature(event) {
		var activeFeatureIndex = null;
		this.features.forEach(function(feature, index) {
			if(feature.isOnROI(event))
				activeFeatureIndex = index;
		})

		if(activeFeatureIndex == null)
			this.activeFeature = null;
		else
			this.activeFeature = this.features[activeFeatureIndex];
	}

	clickOnActiveFeature(event) {
		if(this.activeFeature.type == FeatureTypes.CIRCLE) {
			var onHandles = this.isOnActiveFeatureHandles(event);
			if(onHandles)
				return CanvasModes.ROI_UPDATE_RADIUS;
			else
				return CanvasModes.ROI_UPDATE_POSITION;
		}
		else if(this.activeFeature.type == FeatureTypes.CUSTOM) {
			var onFeature = this.hoverOnFeature(event);
			if(onFeature.activePoint != null)
				return CanvasModes.CUSTOM_ROI_UPDATE_POINT;
			else
				return CanvasModes.CUSTOM_ROI_UPDATE_POSITION;		
		}
	}

	updateActiveFeature(event) {
		this.activeFeature.update(event);
		this.updateActiveFeatureData();
	}	

	updateActiveFeatureData() {
		this.activeFeature.avgPixel = this.activeFeature.getAveragePixelValue(this.viewer.canvasDraw);
		if(this.viewer.thresholdMode == ThresholdModes.GREY)
			this.activeFeature.pixelCount = this.activeFeature.getGreyThresdholdPixelCount(this.viewer.canvasDraw);
		else if(this.viewer.thresholdMode = ThresholdModes.COLOR)
			this.activeFeature.pixelCount = this.activeFeature.getColorThresholdPixelCount(this.viewer.canvasDraw);	
		else
			this.activeFeature.pixelCount = 0;
	}

	/**
	 * Updates active feature position
	 */
	updatePosition(event) {
		this.activeFeature.updatePosition(event);
		this.updateActiveFeatureData();
	}

}

export default FeatureManager;