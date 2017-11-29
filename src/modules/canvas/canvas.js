
// Viewr
import Viewr from '../viewr.js';

// Canvas Modules
import CanvasControls from './canvas-controls.js';
import CanvasLayers from './canvas-layers.js';
import CanvasPixel from './canvas-pixel.js';
import CanvasShapes from './canvas-shapes.js';
import CanvasThreshold from './canvas-threshold.js';
import FeatureManager from '../features/feature-manager.js';
import SliceSelect from './slice-select.js';
import VolumeRender from './volume-render.js';

// Canvas Events
import KeyEvents from '../events/key-events.js';
import MouseEvents from '../events/mouse-events.js';

class Canvas { 

	constructor(ref) {

		// Parent Reference
		this.ref = ref;
		var width = ref.offsetWidth;
		var height = ref.offsetHeight;

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
		this.opacity = 1.0;

		// 3D Data Options
		this.dimIndex = 0;
		this.sliceIndex = 0;
		this.layerIndex = 0;

		// Views
		this.views = [];

		// Canvas Modules 
		this.controls = new CanvasControls();
		this.features = new FeatureManager(this);
		this.layers = new CanvasLayers(this);
		this.pixel = new CanvasPixel();
		this.shapes = new CanvasShapes();
		this.sliceSelect = null;
		this.threshold = new CanvasThreshold();
		this.volumeRender = new VolumeRender();

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
		this.layers.drawLayers();
	}

	drawTile3DImage() { 
		//return Draw3D.drawTile3DImage(this);
	}

	updateImage() {
		this.layers.updateLayers();
	}

	/*** Controls ***/

	getZoom() { 
		return this.controls.zoom;
	}

	panImage(event) {
		this.controls.panImage(event);
		this.layers.drawLayers();		
	}

	panImageFixedAmount(x, y) {
		this.controls.panImageFixedAmount(x, y);
		this.layers.drawLayers();
	}

	setZoom(zoomValue) {
		this.controls.setZoom(zoomValue);
		this.layers.drawLayers();
	}

	stopPanImage() {
		this.controls.stopPanImage();
	}

	zoomIn() {
		this.controls.zoomIn();
		this.layers.drawLayers();
	}
	
	zoomOut() {
		this.controls.zoomOut();
		this.layers.drawLayers();
	}
	
	zoomReset() {
		this.controls.zoomReset();
		this.layers.drawLayers();
	}

	/*** Features ***/
	
	updateFeatureData() {
		return this.features.updateFeatureData();
	}	

	getActiveFeature() {
		return this.features.activeFeature;
	}

	getFeatures() {
		return this.features.features;
	}
	
	drawAllFeatures() {
		this.features.drawAllFeatures();
	}

	deleteFeature(index) {
		this.features.deleteFeature(index);
		this.drawImage();
	} 

	/*** Layers ***/

	addLayer() {
		this.layers.addLayer();
	}

	removeLayer(index) {
		this.layers.removeLayer(index);
	}

	toggleLayer(index) { 
		this.layers.toggleLayer(index);
	}

	getLayers() {
		return this.layers.layers;
	}

	getActiveLayer() { 
		return this.layers.layers[this.layerIndex];
	}

	setActiveLayer(index) {
		this.layerIndex = index;
		this.layers.setActiveLayer(index);
	} 
	
	/* 
	 * Sets contrast edit status for active layer
	 */
	setContrastEdit(_bool) {
		var layer = this.getActiveLayer();
		layer.contrast.inEdit = _bool;
	} 

	/* 
	 * Gets contrast edit status for active layer
	 */
	getContrastEdit() {
		var layer = this.getActiveLayer();
		return layer.contrast.inEdit
	}

	/*** Load ***/

	getFileType() {
		return this.file.type;
	} 

	loadFile(file) {
		this.layers.loadFile(file);
	}

	loadFile3D(indexMove) {
		this.layers.loadFile3D(indexMove);
	}

	/*** Pixel ***/

	getPixelData(x, y) {
		return this.pixel.getPixelData(this, x, y);
	}

	/*** Resize ***/
	
	autoZoomResize() {
		this.layers.autoZoom();
	}

	setViewportSize() { 
		var width = this.ref.offsetWidth;
		var height = this.ref.offsetHeight;		
		this.width = width;
		this.height = height;
		this.canvas.width = this.width;
		this.canvas.height = this.height;
	}

	/*** Shapes ***/

	drawCircle(roi) {
		this.shapes.drawCircle(this, roi);
	}

	drawCustomShape(roi) {
		this.shapes.drawCustomShape(this, roi);
	}

	/*** Slice Selector ***/

	isOnSliceHandle(point) { 
		if(this.sliceSelect != null)
			return this.sliceSelect.isOnSliceHandle(point);
		else
			return false;
	}

	selectSlice(point) {
		this.sliceSelect.selectSlice(point);
	}

	setSliceSelect(canvasX, canvasY) {
		this.sliceSelect = new SliceSelect(this, canvasX, canvasY);
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
		this.layers.drawLayers();		
	}

	setColorThresholdWithPixel(colorPixel) {
		this.threshold.setColorThresholdWithPixel(colorPixel);
		this.layers.drawLayers();		
	}

	setMinThreshold(minThreshold) {
		this.threshold.setMinThreshold(minThreshold);
		this.layers.drawLayers();
	}

	setColorPixelOffset(offset) {
		this.threshold.setColorPixelOffset(offset);
		this.layers.drawLayers();
	} 
}

export default Canvas;
