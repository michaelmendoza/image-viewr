
import Canvas from './canvas/canvas.js';
import CanvasModes from './modes/canvas-modes.js';
import Loader from './loader/loader.js';
import ThresholdModes from './modes/threshold-modes.js';
import ViewModes from './modes/view-modes';

class Viewr {

 	constructor() { 		
 		this.Canvas = Canvas;
 		this.Loader = Loader;

 		this.modes = {
 			canvas: CanvasModes.PAN,
 			threshold: ThresholdModes.NONE,
 			view: ViewModes._3D
 		}

 		this.settings = {
 			
 		}

 		this.canvasList = [];
 		this.loadedFiles = [];

 		this.onModeChange = () => {};
 		this.onFeatureUpdate = () => {};
 	}

 	setMode(modeType, mode) {	
 		this.modes[modeType] = mode;
 		this.onModeChange();
 	}
 }

 export default new Viewr();