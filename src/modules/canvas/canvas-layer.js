
import ImageContrast from './image-contrast.js';
import ImageHistogram from './image-histogram.js';
import CanvasControls from './canvas-controls.js';
import CanvasLoader from './canvas-loader.js';
import CanvasThreshold from './canvas-threshold.js';
import ColorMap from './color-map.js';
import Draw2D from './draw-2d.js';
import DrawDicom from './draw-dicom.js';

class CanvasLayer {

	/** Initializes canvas layer */
	constructor(parent, file) { 
		this.canvas = document.createElement('canvas');
		this.context = this.canvas.getContext('2d');

		this.colorMap = new ColorMap();
		this.contrast = new ImageContrast(); // Test
		this.controls = new CanvasControls();
		this.file = null;
		this.interpolate = true;
		this.imageHistogram = null;
		this.load = new CanvasLoader();
		this.opacity = 1.0;		
		this.parent = parent;
		this.threshold = new CanvasThreshold();
		this.visible = true;
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
			this.contrast.autoContrast3D(file);
		this.threshold.setDefault(this.contrast.minValue, this.contrast.maxValue);
	}

	// TODO: Fix for 3D Image - Should like at a slice?
	createHistogram(element, width, height) {
		if(!this.file) return;
		if(this.file.type == 'dicom-3d') return;

		var min = this.contrast.getMin();
		var max = this.contrast.getMax();
		this.imageHistogram = new ImageHistogram(this.file.pixelData, min, max, 100);
		this.imageHistogram.createHistogramSVG(element, width, height);
	}

	updateHistogram() {
		if(this.file.type == 'dicom-3d') return;
		this.imageHistogram.updateHistogram(this.contrast.getMin(), this.contrast.getMax());
	} 

	/** Clears canvas, and draws image data */
	drawLayer() {
		Draw2D.clear(this);
		if(this.visible) Draw2D.drawImage(this, this.img, 1.0);
	}

	/** Creates new canvas with image data, Clears canvas, and draws image */
	updateLayer() {
		Draw2D.clear(this);

		if(this.visible) {
			this.img = DrawDicom.createImage(this);
			Draw2D.drawImage(this, this.img, 1.0);
		}
	}

	/** 
		* Sets colormap based on name, and renders a colorscale if a canvas is supplied, also
		* updates current layer's image using new colormap 
	 */
	setColorMap(colormap_name, canvas) {
		this.colorMap.setColorMap(colormap_name, canvas);
		this.updateLayer();       // Update current layer
		this.parent.drawLayers(); // Ask for parent to be updated
	}

	/** Renders a colorscale for current colormap */
	renderColorscale(canvas) {
		this.colorMap.renderColorscale(canvas);
	}

	toggleLayer() { 
		this.visible = !this.visible;
		this.drawLayer();
		this.parent.drawLayers();		
	}

	setOpacity(value) { 
		this.opacity = value;
		this.updateLayer();
		this.parent.drawLayers();
	}

	setMinThreshold(value) {
		this.threshold.min = value;
		this.updateLayer();
		this.parent.drawLayers();
	}

	setMaxThreshold(value) {
		this.threshold.max = value;
		this.updateLayer();
		this.parent.drawLayers();		
	}

	setOffsetX(value) {
		this.controls.offsetX = value;
		this.drawLayer();
		this.parent.drawLayers();			
	}

	setOffsetY(value) {
		this.controls.offsetY = value;
		this.drawLayer();
		this.parent.drawLayers();	
	}

	setContrastLevel(value) {
		this.contrast.setContrastLevel(value);
		this.updateLayer();
		this.parent.drawLayers();			
	} 

	setContrastWidth(value) {
		this.contrast.setContrastWidth(value);
		this.updateLayer();
		this.parent.drawLayers();			
	}

	setInterpolate(value) {
		this.interpolate = value;
		this.updateLayer();
		this.parent.drawLayers();		
	}

}

export default CanvasLayer;
