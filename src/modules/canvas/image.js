
import mixin from 'mixin';
import ImageDraw from './image-draw.js';
import ImageControls from './image-controls.js';
import ImageLoad from './image-load.js';
import ImageContrast from './image-contrast.js';

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
		this.panX = 0; // TODO: Rename to offsetX
		this.panY = 0; // TODO: Rename to offsetY

		this.minThreshold = 0;
		this.maxThreshold = 255;

		this.colorPickerPixel = null; 
		this.colorPixelOffset = 40;
		this.colorThreshold = {
			r: { min:0, max:255 },
			g: { min:0, max:255 },
			b: { min:0, max:255 }
		};

		this.imageContrast = new ImageContrast();
		this.editImageContrast = false;
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

	getPixelData(x, y) {
		var pixel = { x:x, y:y, value:'-'};
		if(this.file == null) {
			return pixel;			
		} 

		var pixelData = undefined;
		if(this.file.type == 'dicom')
			pixelData = this.file.pixelData;
		else if(this.file.type == 'dicom-3d')
			pixelData = this.file.getActiveFile().pixelData;
		
		if(pixelData !== undefined) {
			x = Math.round((x - this.panX) / this.zoom);
			y = Math.round((y - this.panY) / this.zoom);
			var width = this.file.img.width;
			pixel = { x:x, y:y, value:pixelData[x + y * width] };
		}
		else {
			var data = this.context.getImageData(x, y, 1, 1).data;
			var greyValue = Math.round((data[0] + data[1] + data[2]) / 3);
			pixel = { x:x, y:y, r:data[0], g:data[1], b:data[2], value:greyValue };
		}

		return pixel;
	}

}

export default _Image;

