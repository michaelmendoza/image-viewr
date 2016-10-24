
import mixin from 'mixin';
import ImageDraw from './image-draw.js';
import ImageControls from './image-controls.js';
import ImageLoad from './image-load.js';

class _Image extends mixin(ImageDraw, mixin(ImageLoad, ImageControls)) {
	constructor(viewer) {
		super();
		this.viewer = viewer;
		this.canvas = viewer.canvas;
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
		this.colorThreshold = {
			r: { min:0, max:255 },
			g: { min:0, max:255 },
			b: { min:0, max:255 }
		};
	}
	
	setColorThreshold(colorThreshold) {
		this.colorThreshold = colorThreshold;
	}

	setMinThreshold(minThreshold) {
		this.minThreshold = minThreshold;
	}

	setMaxThreshold(maxThreshold) {
		this.maxThreshold = minThreshold;
	}

}

export default _Image;

