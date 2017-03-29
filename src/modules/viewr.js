
import Canvas from './canvas/canvas.js';
import CanvasModes from './modes/canvas-modes.js';
import ThresholdModes from './modes/threshold-modes.js';
import ViewModes from './modes/view-modes';

class Viewr {

 	constructor() {
 		super();
 		
 		this.modes = {
 			canvas: CanvasModes.PAN;
 			threshold: ThresholdModes.NONE;
 			view: ViewModes._2D;
 		}

 		this.settings = {
 			
 		}

 		this.Canvas = Canvas;
 		this.Loader = Loader;
 	}

 }

 export default new Viewr();