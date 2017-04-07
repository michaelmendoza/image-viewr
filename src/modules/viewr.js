
import Canvas from './canvas/canvas.js';
import CanvasModes from './modes/canvas-modes.js';
import ThresholdModes from './modes/threshold-modes.js';
import ViewModes from './modes/view-modes';

class Viewr {

 	constructor() {
 		super();
 		
 		this.Canvas = Canvas;
 		this.Loader = Loader;
 		
 		this.modes = {
 			canvas: CanvasModes.PAN;
 			threshold: ThresholdModes.NONE;
 			view: ViewModes._2D;
 		}

 		this.settings = {
 			
 		}

 		this.canvasList = [];
 		this.loadedFiles = [];
 	}

 	setMode(modeType, mode) {		
 		this.modes[modeType] = mode;
 	}
 	
 }

 export default new Viewr();