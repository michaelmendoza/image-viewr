
// Canvas Modules
import CanvasControls import './canvas-controls.js';
import CanvasDraw import './canvas-draw.js';
import CanvasPixel import './canvas-pixel.js';
import CanvasShapes import './canvas-shapes.js';
import CanvasThreshold import './canvas-threshold.js';
import ImageContrast import './image-contrast.js';
import ImageLoad import './image-load.js';

// Canvas Events
import KeyEvents from './events/key-events.js';
import MouseEvents from './events/mouse-events.js';

class Canvas { 

	constructor(width, height) {
		super();

		// Canvas Properties 
		this.canvas = document.createElement('canvas');
		this.context = this.canvas.getContext('2d');
		this.width = width;
		this.height = height;
		this.canvas.width = width;
		this.canvas.height = height;
		
		// Image/File 
		this.file = null;
		this.img = null;

		// Canvas Modules 
		this.draw = new CanvasDraw();
		this.contrast = new ImageContrast();
		this.controls = new CanvasControls();
		this.load = new ImageLoad();
		this.pixel = new CanvasPixel();
		this.shapes = new CanvasShapes();
		this.threshold = new CanvasThreshold();

		// Event Listeners
		var keyEvents = new KeyEvents();
		var mouseEvents = new MouseEvents();
		this.canvas.onmousemove = mouseEvents.handleMouseMove.bind(this);
		this.canvas.onmousedown = mouseEvents.handleMouseDown.bind(this);
		this.canvas.onmouseup = mouseEvents.handleMouseUp.bind(this);
		this.canvas.onmousewheel = mouseEvents.handleMouseWheel.bind(this);
		this.canvas.onkeydown = keyEvents.keydown.bind(this);

		// OnChange EventHandlers
		this.defaultAction = () => {};
		this.onMouseMove = () => {};
		this.onCanvasModeChange = () => {};
		this.onSettingsChange = () => {};
	}

	/*** Draw ***/

	drawImage() {
		this.draw.drawImage(this);
	}

	/*** Controls ***/

	panImage(event) {
		this.controls.panImage(event);
		this.draw.clear(this);
		this.draw.drawImage(this);		
	}

	panImageFixedAmount(x, y) {
		this.controls.panImageFixedAmount(x, y);
		this.draw.clear(this);
		this.draw.drawImage(this);
	}

	setZoom(zoomValue) {
		this.controls.setZoom(zoomValue);
		this.draw.clear(this);
		this.draw.drawImage(this);
	}

	stopPanImage() {
		this.controls.stopPanImage();
	}

	zoomIn() {
		this.controls.zoomIn();
		this.draw.clear(this);
		this.draw.drawImage(this);
	}
	
	zoomOut() {
		this.controls.zoomOut();
		this.draw.clear(this);
		this.draw.drawImage(this);
	}
	
	zoomReset() {
		this.controls.zoomReset();
		this.draw.clear(this);
		this.draw.drawImage(this);
	}

	/*** Load ***/

	loadFile(file) {
		this.load.loadFile(file);
	}

	/*** Pixel ***/

	getPixelData(x, y) {
		this.pixel.getPixelData(this, x, y);
	}

	/*** Resize ***/
	
	setViewportSize(width, height) {
		this.width = width;
		this.height = height;
		this.canvas.width = this.width;
		this.canvas.height = this.height;
	}

	/*** Threshold ***/

	drawColorThreshold(colorThreshold) {
		this.threshold.setColorThreshold(colorThreshold);
		this.draw.drawImage(this);
	}

	drawColorThresholdWithPixel(colorPixel) {
		this.threshold.setColorThresholdWithPixel(colorPixel);
		this.draw.drawImage(this);
	}

	drawMinThreshold(minThreshold) {
		this.threshold.setMinThreshold(minThreshold);
		this.draw.drawImage(this);
	}

	getColorPixelOffset() {
		return this.threshold.colorPixelOffset;
	}

	setColorPixelOffset(offset) {
		this.threshold.setColorPixelOffset(offset);
		this.draw.drawImage(this);
	} 
}

export default Canvas;
