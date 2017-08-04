
import CanvasLayer from './canvas-layer.js';
import Draw2D from './draw-2d.js';
import DrawDicom from './draw-dicom.js';
import Viewr from '../viewr.js';
import ViewModes from '../modes/view-modes.js';

class CanvasLayers { 

	constructor(parent) { 
		this.parent = parent;
		this.roiLayer = null;
		this.layers = [];
	}

	drawLayers() {
		Draw2D.clear(this.parent);
		this.layers.forEach((layer) => { 
			layer.drawLayer();
			Draw2D.drawImage(this.parent, layer.canvas);
		})
		this.parent.drawAllFeatures();
	}

	updateLayers() {
		Draw2D.clear(this.parent);
		this.layers.forEach((layer) => { 
			layer.updateLayer();

			this.parent.img = layer.img; 
			this.parent.file = layer.file; // Need to fix file dependance			
			Draw2D.drawImage(this.parent);
		})
		this.parent.drawAllFeatures();
	} 
	
	loadFile(file) {
		Viewr.emit('file-loaded');
		this.layers.push(new CanvasLayer(file));
		this.updateLayers();

		Viewr.setMode('view', ViewModes._2D);
	}

}

export default CanvasLayers;
