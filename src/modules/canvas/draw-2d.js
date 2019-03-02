import DrawDicom from './draw-dicom.js';
import DrawImage from './draw-image.js';

class Draw2D { 
	
	/** Clears HTML5 Canvas */
	clear(layer) {
		layer.context.clearRect(0, 0, layer.canvas.width, layer.canvas.height);
	}	
	
	/** Draws an image on HTML5 Canvas */
	drawImage(layer, image, opacity) { 
		image = image || layer.img;
		opacity = opacity || layer.opacity || 1.0;
		if(!image) return;
		
		var context = layer.context;
		var controls = layer.controls;
		var threshold = layer.threshold;
		var aspectRatio = layer.controls.aspectRatio;
		var width = layer.canvas.width; //layer.width || image.width;
		var height = layer.canvas.height; //layer.height || image.height;
		
		// Don't draw for (0,0) canvas
		if(width <= 0 || height <= 0)
			return;
		
		// Draw scaled/translated Image 
		var sx = - controls.getOffsetX(); //controls.offsetX;
		var sy = - controls.getOffsetY(); //controls.offsetY;
		var sWidth = Math.round(width / controls.zoom / aspectRatio);
		var sHeight = Math.round(height / controls.zoom);
		var dx = 0;
		var dy = 0;
		var dWidth = Math.round(width);
		var dHeight = Math.round(height);

		context.globalAlpha = opacity;
		if(layer.interpolate !== undefined) this.setSmoothing(context, layer.interpolate);
		context.drawImage(image, sx, sy, sWidth, sHeight, dx, dy, dWidth, dHeight);

		this.drawColormap(layer, dWidth, dHeight);
		//canvas.drawThreshold(args); // For PNG images
	}

	drawColormap(layer, width, height) {
		if(!layer.colorMap || !layer.colorMap.isValid()) return;

		var imageData = layer.context.getImageData(0, 0, width, height);
		DrawImage.toColormap(imageData, layer.colorMap);
		layer.context.putImageData(imageData, 0, 0);
	}

	setSmoothing(context, isSmooth) {
    context.imageSmoothingEnabled = isSmooth;
    context.mozImageSmoothingEnabled = isSmooth;
    context.webkitImageSmoothingEnabled = isSmooth;
    context.msImageSmoothingEnabled = isSmooth;		
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
