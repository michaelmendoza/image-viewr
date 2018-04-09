
import CanvasModes from '../modes/canvas-modes.js';
import FeatureTypes from '../modes/feature-types.js';
import FeatureCircleROI from './feature-circle-roi.js';
import FeatureRectangleROI from './feature-rectangle-roi.js';
import FeatureCustomROI from './feature-custom-roi.js';
import ThresholdModes from '../modes/threshold-modes.js';
import Viewr from '../viewr.js';

class FeatureManager { 
	constructor(canvas) {
		this.canvas = canvas;
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
		feature.sliceIndex = this.canvas.sliceIndex;
		this.features.push(feature);
		this.activeFeature = feature;
	}

	deleteFeature(index) {
		if(this.features[index] == this.activeFeature) {
			this.activeFeature = null;
		}
		
		this.features.splice(index, 1);
	}

	drawAllFeatures() {
		var canvas = this.canvas;

		this.features.forEach(function(feature) {
			if(feature.sliceIndex != canvas.sliceIndex)
				return;

			if(feature.type == FeatureTypes.CIRCLE)
				canvas.drawCircle(feature);
			else if(feature.type == FeatureTypes.CUSTOM)
				canvas.drawCustomShape(feature);
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
		var sliceIndex = this.canvas.sliceIndex;
		var activeFeatureIndex = null;
		this.features.forEach(function(feature, index) {
			if(feature.sliceIndex != sliceIndex)
				return;

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
		var canvas = this.canvas;
		var minmax = this.activeFeature.getMinMax(canvas)
		this.activeFeature.min = minmax.min;
		this.activeFeature.max = minmax.max;
		this.activeFeature.mean = this.activeFeature.getMean(canvas);
		this.activeFeature.stdDev = this.activeFeature.getStdDev(canvas);
		this.activeFeature.area = this.activeFeature.getArea(canvas);
		this.activeFeature.pixelCount = this.activeFeature.getPixelCount(canvas);

		/*
		if(Viewr.modes.threshold == ThresholdModes.GREY)
			this.activeFeature.pixelCount = this.activeFeature.getGreyThresdholdPixelCount(canvas);
		else if(Viewr.modes.threshold = ThresholdModes.COLOR)
			this.activeFeature.pixelCount = this.activeFeature.getColorThresholdPixelCount(canvas);	
		else
			this.activeFeature.pixelCount = 0;
		*/
	}

	updateFeatureData() { 
		var canvas = this.canvas;
		this.features.forEach((feature) => {
			var minmax = feature.getMinMax(canvas)
			feature.min = minmax.min;
			feature.max = minmax.max;
			feature.mean = feature.getMean(canvas);
			feature.stdDev = feature.getStdDev(canvas);
			feature.area = feature.getArea(canvas);
			feature.pixelCount = feature.getPixelCount(canvas);	
		})
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