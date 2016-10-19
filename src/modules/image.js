
import mixin from 'mixin';
import ImageDraw from './image-draw.js';
import ImageControls from './image-controls.js';
import ImageLoad from './image-load.js';

const MAIN_ZOOM = 0.2;
const MAX_ZOOM = 4;
const ZOOM_STEP = 0.1;

class _Image extends mixin(ImageDraw, mixin(ImageLoad, ImageControls)) {
	constructor(canvas) {
		super();
		this.canvas = canvas;
		this.context = this.canvas.getContext('2d');
		this.img = null;
	
		this.width = null;   // Image Width
		this.height = null;	 // Image Height
		this.zoom = 1;

		this.isPanning = false;
		this.startPanX = null;
		this.startPanY = null;
		this.panX = null;
		this.panY = null;

		this.minThreshold = 0;
		this.maxThreshold = 255;
	}

	setMinThreshold(minThreshold) {
		this.minThreshold = minThreshold;
	}

}

export default _Image;

