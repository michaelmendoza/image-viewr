
import CanvasLayer from './canvas-layer.js';
import Draw2D from './draw-2d.js';
import Viewr from '../viewr.js';
import ViewModes from '../modes/view-modes.js';

class CanvasLayers { 

	constructor(parent) { 
		this.parent = parent;
		this.roiLayer = null;
		this.layers = [];
	}

	/** Takes layers and draws all layers and features in order */
	drawLayers() { 
		Draw2D.clear(this.parent);
		this.layers.forEach((layer) => { 			
			Draw2D.drawImage(this.parent, layer.canvas, layer.opacity);
		})
		this.parent.drawAllFeatures();
		//this.drawSliceLocations(canvas); 
	}

	/** Updates layers and draws all layers and features in order */
	updateLayers() {
		Draw2D.clear(this.parent);
		this.layers.forEach((layer) => { 
			layer.updateLayer();
			Draw2D.drawImage(this.parent, layer.canvas, layer.opacity);
		})
		this.parent.drawAllFeatures();
		//this.drawSliceLocations(canvas); 
	} 
	
	loadFile(file) { 
		Viewr.emit('file-loaded');
		var layer = new CanvasLayer(this, file);
		this.layers.length == 0 ? layer.isActive = true : null;
		layer.loadFile(file);
		this.layers.push(layer);
		this.autoZoom(); 
		this.updateLayers();

		Viewr.setMode('view', ViewModes._2D);
	}

	is3D() {
		var is3D = false;
		this.layers.forEach((layer) => {
			is3D = layer.file.type == 'dicom-3d' ? true : is3D;
		})
		return is3D;
	}

	loadFile3D(indexMove) { 
		if(indexMove == 0)
			return;

		var dim = this.parent.dimIndex;
		var maxIndex = (dim == 0) ? this.layers[0].file.depth : (dim == 1) ? this.layers[0].file.height : this.layers[0].file.width;
		
		var index = this.parent.sliceIndex + indexMove;
		index = index < 0 ? 0 : index;
		index = index >= maxIndex ? maxIndex - 1 : index;
		this.parent.sliceIndex = index;

		this.updateLayers();
	}

	setActiveLayer(index) {
		this.layers.forEach((layer) => {
			layer.isActive = false;
		})
		this.layers[index].isActive = true;
	}

	addLayer() {
		var layer = new CanvasLayer(this);
		this.layers.push(layer);
	}

	removeLayer(index) { 
		this.layers.splice(index, 1); 
	}
	
	toggleLayer(index) {
		this.layers[index].toggleLayer();
	}
	
	isLoaded() { 
		return this.layers.length > 0;
	}

	/** Get layer max height/width - based off size * zoom **/
	getLayerSize() {
		var width = 0;
		var height = 0;
		this.layers.forEach((layer) => { 
			var layerWidth = layer.file.width * layer.controls.zoom
			var layerHeight = layer.file.height * layer.controls.zoom
			width = width < layerWidth ? layerWidth : width;
			height = height < layerHeight ? layerHeight : height;
		})
		return { width:width, height:height }
	}

	/** Fix for 3d data */
	autoZoom() { 
		var viewportSize = { width: this.parent.width, height: this.parent.height }
		var layerSize = this.getLayerSize();

		var controls = this.parent.controls;
		var dx = (viewportSize.width / layerSize.width) / controls.aspectRatio;
		var dy = (viewportSize.height / layerSize.height);

		var dz = dx < dy ? dx : dy;
		controls.zoom = dz;
		controls.offsetX = 0;
		controls.offsetY = 0;

		// Have autozoom set offsetCenterX/Y 
		var inv_zoom = 1 / controls.zoom; 
		controls.offsetCenterX = inv_zoom * (viewportSize.width / 2) - layerSize.width / 2;
		controls.offsetCenterY = inv_zoom * (viewportSize.height / 2) - layerSize.height / 2;
		console.log(viewportSize, layerSize, controls.zoom);

		Viewr.emit('zoom-update');		
	}

	getViewport() {
		return { width: this.parent.width, height: this.parent.height };
	}

}

export default CanvasLayers;
