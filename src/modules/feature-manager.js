
import FeatureTypes from './feature-types.js';
import FeatureCircleROI from './feature-circle-roi.js';
import FeatureRectangleROI from './feature-rectangle-roi.js';
import ThresholdModes from './threshold-modes.js';

class FeatureManager {
	constructor(viewer) {
		this.viewer = viewer;
		this.canvas = viewer.canvas;
		this.context = this.canvas.getContext('2d');	

		this.activeFeature = null;
		this.features = [];
	}

	getActiveFeature() {
		return this.activeFeature;
	}

	setActiveFeature(event) {
		var activeFeatureIndex = null;
		this.features.forEach(function(feature, index) {
			if(feature.isPositionInROI(event))
				activeFeatureIndex = index;
		})

		if(activeFeatureIndex == null)
			this.activeFeature = null;
		else
			this.activeFeature = this.features[activeFeatureIndex];
	}

	createFeature(event, type) {
		// Create Feature and set as active feature
		if(type == FeatureTypes.CIRCLE) {
			var feature = new FeatureCircleROI();
		}
		else if(type == FeatureTypes.RECT) {
			var feature = new FeatureRectangleROI();
		}
		else {
			console.log('Warning: Invalid Feature Type');
			return;
		}

		feature.createROI(event);
		this.features.push(feature);
		this.activeFeature = feature;
	}

	deleteFeature(index) {
		this.features.splice(index, 1);
	}

	clickedOnFeatureHandles() {
		var pixel = this.viewer.pixel;
		if(pixel.r == 77 && pixel.g == 249 && pixel.b == 77) // Green - #4DF94D
			return true;
		else
			return false;
	}

	updateActiveFeature(event) {
		this.activeFeature.updateROI(event);
		this.activeFeature.avgPixel = this.activeFeature.calcAveragePixelValue(this.viewer.canvasDraw);
		if(this.viewer.thresholdMode == ThresholdModes.GREY)
			this.activeFeature.pixelCount = this.activeFeature.getGreyThresdholdPixelCount(this.viewer.canvasDraw);
		else if(this.viewer.thresholdMode = ThresholdModes.COLOR)
			this.activeFeature.pixelCount = this.activeFeature.getColorThresholdPixelCount(this.viewer.canvasDraw);	
		else
			this.activeFeature.pixelCount = 0;
	}	

	updateActiveFeaturePosition(event) {
		this.activeFeature.updateROIPosition(event);
		this.activeFeature.avgPixel = this.activeFeature.calcAveragePixelValue(this.viewer.canvasDraw);	
		if(this.viewer.thresholdMode == ThresholdModes.GREY)
			this.activeFeature.pixelCount = this.activeFeature.getGreyThresdholdPixelCount(this.viewer.canvasDraw);	
		else if(this.viewer.thresholdMode = ThresholdModes.COLOR)
			this.activeFeature.pixelCount = this.activeFeature.getColorThresholdPixelCount(this.viewer.canvasDraw);	
		else 
			this.activeFeature.pixelCount = 0;	
	}

	drawAllFeatures() {
		var context = this.context;
		this.features.forEach(function(feature) {
			this.viewer.canvasDraw.drawCircleROI(feature);
		}.bind(this))
	}

}

export default FeatureManager;