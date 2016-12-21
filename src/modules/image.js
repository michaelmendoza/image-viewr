
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

		this.file = null;
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

		this.colorPickerPixel = null; 
		this.colorPixelOffset = 40;
		this.colorThreshold = {
			r: { min:0, max:255 },
			g: { min:0, max:255 },
			b: { min:0, max:255 }
		};
	}
	
	setColorPixelOffset(offset) {
		this.colorPixelOffset = offset;

		if(this.colorPickerPixel != null)
			this.setColorThresholdWithPixel(this.colorPickerPixel);
	}

	setColorThreshold(colorThreshold) {
		this.colorThreshold = colorThreshold;
	}

	setColorThresholdWithPixel(colorPixel) {
		var r = colorPixel.r;
		var g = colorPixel.g;
		var b = colorPixel.b;
		var offset = this.colorPixelOffset;

		this.colorPickerPixel = colorPixel;
		this.colorThreshold.r.min = Math.max(r - offset, 0);
		this.colorThreshold.r.max = Math.min(r + offset, 255);
		this.colorThreshold.g.min = Math.max(g - offset, 0);
		this.colorThreshold.g.max = Math.min(g + offset, 255);
		this.colorThreshold.b.min = Math.max(b - offset, 0);
		this.colorThreshold.b.max = Math.min(b + offset, 255);
	}

	setMinThreshold(minThreshold) {
		this.minThreshold = minThreshold;
	}

	setMaxThreshold(maxThreshold) {
		this.maxThreshold = minThreshold;
	}

}

export default _Image;

