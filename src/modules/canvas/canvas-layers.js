
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
	}

	/** Updates layers and draws all layers and features in order */
	updateLayers() {
		Draw2D.clear(this.parent);
		this.layers.forEach((layer) => { 
			layer.updateLayer();
			Draw2D.drawImage(this.parent, layer.canvas, layer.opacity);
		})
		this.parent.drawAllFeatures();
	} 
	
	loadFile(file) {
		Viewr.emit('file-loaded');
		var layer = new CanvasLayer(file);
		layer.opacity = 0.5;
		this.layers.push(layer);
		this.updateLayers();

		Viewr.setMode('view', ViewModes._2D);
	}

	isLoaded() { 
		return this.layers.length > 0;
	}

}

export default CanvasLayers;
