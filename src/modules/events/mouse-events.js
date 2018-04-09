
import CanvasModes from '../modes/canvas-modes.js';
import FeatureTypes from '../modes/feature-types.js';
import ThresholdModes from '../modes/threshold-modes.js';
import Viewr from '../viewr.js';

/**
 * Canvas based image viewer
 */
class MouseEvents { 

	contructor() {
		this.point = null;
	}

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
			[CanvasModes.PAN_UPDATE]: () => { 
				var layer = this.getActiveLayer();
				layer.controls.panImage(event); 
				this.updateImage();
				//this.panImage(event); 
			},
			[CanvasModes.CONTRAST]: () => { 
				if(this.getContrastEdit()) { 
					var sensitivity = 4;
					var x = event.movementX * sensitivity;
					var y = event.movementY * sensitivity;
					var layer = this.getActiveLayer();
					layer.contrast.setContrastWithMouse({ x:x, y:y });

					this.updateImage();
					Viewr.emit('layer-update');
					
					if(this.sliceSelect != null)
						this.sliceSelect.update();
				}
			},
			[CanvasModes.ZOOM_UPDATE]: () => {
					var sensitivity = 0.1;
					var zoomFactor = event.movementY * sensitivity;
					var layer = this.getActiveLayer();
					layer.controls.setRelativeZoom(zoomFactor)
					this.updateImage();
					Viewr.emit('layer-update');
			}			
		}; 

		var roi_actions = {
			[CanvasModes.PAN]: () => { this.isOnSliceHandle(event); },
			[CanvasModes.PAN_SLICE_UPDATE]: () => { this.selectSlice(event); },
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
			this.drawImage(); // TODO: Should I be drawing constantly 
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

		//console.log('Mouse Down - Mode: ' + Viewr.modes.canvas);

		var actions = { 
			[CanvasModes.PAN]: () => {
				var point = this.controls.transform({ x:event.offsetX, y:event.offsetY });
				if(this.isOnSliceHandle(point)) {
					Viewr.modes.canvas = CanvasModes.PAN_SLICE_UPDATE;
					this.selectSlice(point);
				}
				else {
					Viewr.modes.canvas = CanvasModes.PAN_UPDATE;
					var layer = this.getActiveLayer();
					layer.controls.panImage(event); 
					//this.panImage(event);
				}
			},

			[CanvasModes.CONTRAST]: () => {
				this.setContrastEdit(true);
			},

			[CanvasModes.ZOOM]: () => {
				Viewr.modes.canvas = CanvasModes.ZOOM_UPDATE;
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
		Viewr.emit('canvas-update');
	}
	
	handleMouseUp() {
		var canvas_actions = {
			[CanvasModes.PAN_UPDATE]: () => { 
				Viewr.modes.canvas = CanvasModes.PAN; 
				var layer = this.getActiveLayer();
				layer.controls.stopPanImage(event); },
			[CanvasModes.CONTRAST]: () => { this.setContrastEdit(false); },
			[CanvasModes.ZOOM_UPDATE]: () => { Viewr.modes.canvas = CanvasModes.ZOOM; }			
		};

		var roi_actions = {
			[CanvasModes.PAN_SLICE_UPDATE]: () => { Viewr.modes.canvas = CanvasModes.PAN; },
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

		//if(this.file == null) return;

		var indexMove = Math.round(event.wheelDelta / 20.0);
		//if(this.file.type == 'dicom-3d') 
		if(this.layers.is3D())
			this.loadFile3D(indexMove);
	}

}

export default MouseEvents;

