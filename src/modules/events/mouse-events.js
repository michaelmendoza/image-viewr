
import CanvasModes from '../modes/canvas-modes.js';
import FeatureTypes from '../modes/feature-types.js';
import ThresholdModes from '../modes/threshold-modes.js';
import Viewr from '../viewr.js';

/**
 * Canvas based image viewer
 */
class MouseEvents {

	fixCanvasMode() {
		// Fix Canvas Movde if not active feature
		if(this.features.activeFeature == null) {
			var roi_actions = {
				[CanvasModes.ROI_UPDATE_RADIUS]: () => { Viewr.modes.canvas = CanvasModes.ROI; },
				[CanvasModes.ROI_UPDATE_POSITION]: () => { Viewr.modes.canvas = CanvasModes.ROI; },
				[CanvasModes.CUSTOM_ROI_ADD_POINT]: () => { Viewr.modes.canvas = CanvasModes.CUSTOM_ROI; },
				[CanvasModes.CUSTOM_ROI_UPDATE_POINT]: () => { Viewr.modes.canvas = CanvasModes.CUSTOM_ROI; },
				[CanvasModes.CUSTOM_ROI_UPDATE_POSITION]: () => { Viewr.modes.canvas = CanvasModes.CUSTOM_ROI; }
			};		

			(roi_actions[Viewr.modes.canvas] || this.defaultAction)();
		}
	}
	
	handleMouseMove(event) { 

		var canvas_actions = {
			[CanvasModes.PAN_UPDATE]: () => { this.panImage(event); },
			[CanvasModes.CONTRAST]: () => { 
				if(this.contrast.inEdit) {
					var sensitivity = 4;
					var x = event.movementX * sensitivity;
					var y = event.movementY * sensitivity;
					this.contrast.setContrastWithMouse({ x:x, y:y });
					this.drawImage();
				}
			}			
		}; 

		var roi_actions = {
			[CanvasModes.ROI]: () => { this.features.hoverOnFeature(event); },
			[CanvasModes.ROI_UPDATE_RADIUS]: () => { this.features.updateActiveFeature(event); },
			[CanvasModes.ROI_UPDATE_POSITION]: () => { this.features.updatePosition(event); },
			[CanvasModes.CUSTOM_ROI]: () => { this.features.hoverOnFeature(event); },
			[CanvasModes.CUSTOM_ROI_UPDATE_POINT]: () => { this.features.updateActiveFeature(event); },
			[CanvasModes.CUSTOM_ROI_UPDATE_POSITION]: () => { this.features.updatePosition(event); },
			[CanvasModes.THRESHOLD]: () => { this.features.hoverOnFeature(event); }
		};

		var roi_action = () => {
			event = this.controls.transform({ x:event.offsetX, y:event.offsetY });
			roi_actions[Viewr.modes.canvas]();
			this.drawImage();
		}

		this.getPixelData(event.offsetX, event.offsetY);
		this.fixCanvasMode();
		var a = canvas_actions[Viewr.modes.canvas];
		var b = roi_actions[Viewr.modes.canvas] ? roi_action : null;
		var c = this.defaultAction;
		(a || b || c)();
		this.onMouseMove();
	}

	handleMouseDown(event) {

		var actions = {
			[CanvasModes.PAN]: () => {
				Viewr.modes.canvas = CanvasModes.PAN_UPDATE;
				this.panImage(event);
			},

			[CanvasModes.CONTRAST]: () => {
				this.contrast.inEdit = true;
			},

			[CanvasModes.ROI]: () => { 
				event = this.controls.transform({ x:event.offsetX, y:event.offsetY });
				this.features.setActiveFeature(event);

				if(this.features.activeFeature == null) {
					Viewr.modes.canvas = CanvasModes.ROI_UPDATE_RADIUS;
					this.features.createFeature(event, FeatureTypes.CIRCLE);
					this.drawImage();			
				}
				else 
					Viewr.modes.canvas = this.features.clickOnActiveFeature(event);
			},

			[CanvasModes.CUSTOM_ROI]: () => {
				event = this.controls.transform({ x:event.offsetX, y:event.offsetY });
				this.features.setActiveFeature(event);

				if(this.features.activeFeature == null) {
					this.features.createFeature(event, FeatureTypes.CUSTOM);
					this.features.activeFeature.addPoint(event);
					Viewr.modes.canvas = CanvasModes.CUSTOM_ROI_ADD_POINT;
					this.drawImage();
				}
				else 
					Viewr.modes.canvas = this.features.clickOnActiveFeature(event);
			},

			[CanvasModes.CUSTOM_ROI_ADD_POINT]: () => { 
				event = this.controls.transform({ x:event.offsetX, y:event.offsetY });
				this.features.activeFeature.addPoint(event);
				if(this.features.activeFeature.isClosedShape) 
					Viewr.modes.canvas = CanvasModes.CUSTOM_ROI;
				this.features.updateActiveFeature(event);
				this.drawImage();
			},

			[CanvasModes.THRESHOLD]: () => {
				event = this.controls.transform({ x:event.offsetX, y:event.offsetY });
				this.features.setActiveFeature(event);

				if(this.features.activeFeature != null)
					Viewr.modes.canvas = this.features.clickOnActiveFeature(event);
			},

			[CanvasModes.THRESHOLD_EYEDROPPER]: () => {
				if(this.thresholdMode == ThresholdModes.COLOR) {
					var colorPixel = this.getPixelData(event);
					this.drawColorThresholdWithPixel(colorPixel);
					this.onSettingsChange();
					Viewr.modes.canvas = CanvasModes.THRESHOLD
				}
			}

		};

		this.fixCanvasMode();
		(actions[Viewr.modes.canvas] || this.defaultAction)();
		Viewr.onModeChange();
	}

	handleMouseUp() {
		var canvas_actions = {
			[CanvasModes.PAN_UPDATE]: () => { Viewr.modes.canvas = CanvasModes.PAN; this.stopPanImage(event); },
			[CanvasModes.CONTRAST]: () => { this.contrast.inEdit = false; }
		};

		var roi_actions = {
			[CanvasModes.ROI_UPDATE_RADIUS]: () => { Viewr.modes.canvas = CanvasModes.ROI; },
			[CanvasModes.ROI_UPDATE_POSITION]: () => { Viewr.modes.canvas = CanvasModes.ROI },
			[CanvasModes.CUSTOM_ROI_UPDATE_POINT]: () => { Viewr.modes.canvas = CanvasModes.CUSTOM_ROI; },
			[CanvasModes.CUSTOM_ROI_UPDATE_POSITION]: () => { 
				this.features.updatePosition(null); 
				Viewr.modes.canvas = CanvasModes.CUSTOM_ROI;
			}
		};

		this.fixCanvasMode();
		(canvas_actions[Viewr.modes.canvas] || roi_actions[Viewr.modes.canvas] || this.defaultAction)();
	}

	handleMouseWheel(event) {
		event.stopPropagation();
		event.preventDefault();

		if(this.file == null) return;

		var indexMove = Math.round(event.wheelDelta / 20.0);
		if(this.file.type == 'dicom-3d') 
			this.loadFile3D(indexMove);
	}

}

export default MouseEvents;

