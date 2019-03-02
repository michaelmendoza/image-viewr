
import Canvas from './canvas/canvas.js';
import CanvasModes from './modes/canvas-modes.js';
import Loader from './loader/loader.js';
import ThresholdModes from './modes/threshold-modes.js';
import ViewModes from './modes/view-modes';
import EventEmitter from 'events';

class Viewr extends EventEmitter{

 	constructor() { 
 		super();
 		this.Canvas = Canvas;
 		this.Loader = Loader;

 		this.events = [
	 		'canvas-update', 
	 		'threshold-update', 
	 		'view-update', 
	 		'file-loaded',
	 		'layer-update'  // viewer-layer-detail.jsx 
	 		];

 		this.modes = {
 			canvas: CanvasModes.PAN,
 			threshold: ThresholdModes.NONE,
 			view: ViewModes._3D
 		}

 		this.settings = {
 			ZOOM_STEP : 0.1
 		}

 		this.canvasList = [];
 		this.loadedFiles = [];

 		this.onFeatureUpdate = () => {};
 	}

 	setMode(modeType, mode) {	
 		this.modes[modeType] = mode;

 		if(modeType == 'canvas')
 			this.emit('canvas-update')
 		else if(modeType == 'threshold')
 			this.emit('threshold-update')
 		else if(modeType == 'view')
 			this.emit('view-update')
 	}
 }

var viewr = new Viewr();
window.viewr = viewr;
export default new Viewr();
