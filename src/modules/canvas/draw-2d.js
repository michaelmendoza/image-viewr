import DrawDicom from './draw-dicom.js';

class Draw2D { 
	
	/** Clears HTML5 Canvas */
	clear(layer) {
		layer.context.clearRect(0, 0, layer.canvas.width, layer.canvas.height);
	}	

	/** Draws an image on HTML5 Canvas */ 
	drawImage(layer) {
		var image = layer.img;
		if(!image) return;	// Check there is an Image to draw
		this.draw(layer); // Draw Image
	} 

	/** Updates image on canvas. Creates new image if needed, and draws image on canvas. */
	updateImage(layer) { 
		layer.img = DrawDicom.createImage(layer);
		this.drawImage(layer);
	}

	/** Draws an image on HTML5 Canvas */
	draw(layer) { 
		var context = layer.context;
		var controls = layer.controls;
		var threshold = layer.threshold;
		var aspectRatio = layer.controls.aspectRatio;
		var image = layer.img;
		var width = layer.width || image.width;
		var height = layer.height || image.height;

		// Draw scaled/translated Image
		var sx = -controls.panX;
		var sy = -controls.panY;
		var sWidth = Math.round(width / controls.zoom / aspectRatio);
		var sHeight = Math.round(height / controls.zoom);
		var dx = 0;
		var dy = 0;
		var dWidth = Math.round(width);
		var dHeight = Math.round(height);
		context.drawImage(image, sx, sy, sWidth, sHeight, dx, dy, dWidth, dHeight);
	}

	drawSliceLocations(canvas) {
		if(canvas.file.type != 'dicom-3d')
			return;

		if(canvas.sliceSelect == null)
			return;

		var handles = canvas.sliceSelect.getSliceHandles();
		canvas.shapes.drawLine(canvas, handles.line);
		canvas.shapes.drawLine(canvas, handles.line2);
	}

}

export default new Draw2D();