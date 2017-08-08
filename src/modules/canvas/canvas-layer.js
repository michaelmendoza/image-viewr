
import ImageContrast from './image-contrast.js';
import CanvasControls from './canvas-controls.js';
import CanvasLoader from './canvas-loader.js';
import CanvasThreshold from './canvas-threshold.js';
import Draw2D from './draw-2d.js';
import DrawDicom from './draw-dicom.js';

class CanvasLayer {

	/** Initializes canvas layer */
	constructor(file) { 
		this.canvas = document.createElement('canvas');
		this.context = this.canvas.getContext('2d');

		this.colorMap = null;
		this.contrast = ImageContrast;
		this.controls = new CanvasControls();
		this.file = null;
		this.load = new CanvasLoader();
		this.opacity = 1.0;		
		this.threshold = new CanvasThreshold();
	}
	
	loadFile(file) {
		this.file = file;
		this.canvas.width = file.width;
		this.canvas.height = file.height;		
		this.autoContrast();
	}

	// TODO: Should be done on file level
	/** AutoConstrast for maximum linear contrast */
	autoContrast() {
		var file = this.file;
		if(file.type == 'dicom')
			this.contrast.autoContrast(file.pixelData, file.numPixels); 
		else if(file.type == 'dicom-3d')
			this.contrast.autoContrast3D(file.fileset);
	}

	/** Creates new canvas with iamge data, Clears canvas, and draws image */
	updateLayer() {
		this.img = DrawDicom.createImage(this);
		Draw2D.clear(this);
		Draw2D.drawImage(this, this.img, 1.0);
	}
}

export default CanvasLayer;
