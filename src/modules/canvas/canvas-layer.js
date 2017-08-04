
import ImageContrast from './image-contrast.js';
import CanvasControls from './canvas-controls.js';
import CanvasLoader from './canvas-loader.js';
import CanvasThreshold from './canvas-threshold.js';
import Draw2D from './draw-2d.js';

class CanvasLayer {

	constructor(file) { 
		this.canvas = document.createElement('canvas');
		this.context = this.canvas.getContext('2d');
		this.canvas.width = file.width;
		this.canvas.height = file.height;

		this.colorMap = null;
		this.contrast = ImageContrast;
		this.controls = new CanvasControls();
		this.file = file;
		this.load = new CanvasLoader();
		this.opacity = 1.0;		
		this.threshold = new CanvasThreshold();

		this.autoContrast();
	}
	
	// TODO: Should be done on file level
	autoContrast() {
		var file = this.file;
		if(file.type == 'dicom')
			this.contrast.autoContrast(file.pixelData, file.numPixels); 
		else if(file.type == 'dicom-3d')
			this.contrast.autoContrast3D(file.fileset);
	}
	
	drawLayer() {
		Draw2D.drawImage(this);
	}

	updateLayer() {
		Draw2D.updateImage(this);
	}
}

export default CanvasLayer;
