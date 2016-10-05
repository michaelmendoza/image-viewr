
import FeatureTypes from './feature-types.js';
import FeatureCircleROI from './feature-circle-roi.js';
import FeatureRectangleROI from './feature-rectangle-roi.js';

class FeatureManager {
	constructor(canvas) {
		this.canvas = canvas;
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

	updateActiveFeature(event) {
		this.activeFeature.updateROI(event);
		this.activeFeature.avgPixel = this.activeFeature.calcAveragePixelValue(this.context);
	}	

	updateActiveFeaturePosition(event) {
		this.activeFeature.updateROIPosition(event);
		this.activeFeature.avgPixel = this.activeFeature.calcAveragePixelValue(this.context);		
	}

	drawAllFeatures() {
		var context = this.context;
		this.features.forEach(function(feature) {
			feature.drawROI(context);
		})
	}
}

export default FeatureManager;