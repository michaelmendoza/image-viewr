
// Canvas Modules
import CanvasControls from './canvas-controls.js';
import CanvasDraw from './canvas-draw.js';
import CanvasPixel from './canvas-pixel.js';
import CanvasShapes from './canvas-shapes.js';
import CanvasThreshold from './canvas-threshold.js';
import FeatureManager from '../features/feature-manager.js';
import ImageContrast from './image-contrast.js';
import ImageLoad from './image-load.js';
import SliceSelect from './slice-select.js';

// Canvas Events
import KeyEvents from '../events/key-events.js';
import MouseEvents from '../events/mouse-events.js';

class Canvas { 

	constructor(width, height) {

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

		// 3D Data Options
		this.dimIndex = 0;
		this.sliceIndex = 0;

		// Canvas Modules 
		this.draw = new CanvasDraw();
		this.contrast = new ImageContrast();
		this.controls = new CanvasControls();
		this.features = new FeatureManager(this);
		this.load = new ImageLoad(this);
		this.pixel = new CanvasPixel();
		this.shapes = new CanvasShapes();
		this.sliceSelect = null;
		this.threshold = new CanvasThreshold();

		// Event Listeners
		var keyEvents = new KeyEvents();
		var mouseEvents = new MouseEvents();
		this.fixCanvasMode = mouseEvents.fixCanvasMode.bind(this);
		this.canvas.onmousemove = mouseEvents.handleMouseMove.bind(this);
		this.canvas.onmousedown = mouseEvents.handleMouseDown.bind(this);
		this.canvas.onmouseup = mouseEvents.handleMouseUp.bind(this);
		this.canvas.onmousewheel = mouseEvents.handleMouseWheel.bind(this);
		this.canvas.onkeydown = keyEvents.keydown.bind(this);

		// OnChange EventHandlers
		this.defaultAction = () => {};
		this.onMouseMove = () => {};
		this.onSettingsChange = () => {};
	}

	addCanvasToElement(elementId) {
	 	var element = document.getElementById(elementId);
		element.appendChild(this.canvas);
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

	/*** Features ***/

	getActiveFeature() {
		return this.features.activeFeature;
	}

	getFeatures() {
		return this.features.features;
	}

	deleteFeature(index) {
		this.features.deleteFeature(index);
		this.drawImage();
	}

	/*** Load ***/

	loadFile(file) {
		this.load.loadFile(file);
	}

	loadFile3D(indexMove) {
		this.load.loadFileInFileSet(indexMove);
	}

	/*** Pixel ***/

	getPixelData(x, y) {
		return this.pixel.getPixelData(this, x, y);
	}

	/*** Resize ***/
	
	setViewportSize(width, height) {
		this.width = width;
		this.height = height;
		this.canvas.width = this.width;
		this.canvas.height = this.height;
		this.drawImage();
	}

	/*** Shapes ***/

	drawCircle(roi) {
		this.shapes.drawCircle(this, roi);
	}

	drawCustomShape(roi) {
		this.shapes.drawCustomShape(this, roi);
	}

	/*** Slice Selector ***/

	setSliceSelect(canvasX, canvasY) {
		this.sliceSelect = new SliceSelect(canvasX, canvasY);
	}

	/*** Threshold ***/

	drawColorThreshold() {
		this.threshold.drawColorThreshold(this);
	}

	drawMinThreshold() {
		this.threshold.drawMinThreshold(this);
	}

	getColorPixelOffset() {
		return this.threshold.colorPixelOffset;
	}

	setColorThreshold(colorThreshold) {
		this.threshold.setColorThreshold(colorThreshold);
		this.draw.drawImage(this);		
	}

	setColorThresholdWithPixel(colorPixel) {
		this.threshold.setColorThresholdWithPixel(colorPixel);
		this.draw.drawImage(this);		
	}

	setMinThreshold(minThreshold) {
		this.threshold.setMinThreshold(minThreshold);
		this.draw.drawImage(this);
	}

	setColorPixelOffset(offset) {
		this.threshold.setColorPixelOffset(offset);
		this.draw.drawImage(this);
	} 
}

export default Canvas;
