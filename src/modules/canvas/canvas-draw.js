
import ThresholdModes from '../modes/threshold-modes.js';
import ImageHistogram from './image-histogram.js';
import Viewr from '../viewr.js';

class CanvasDraw {

	clear(canvas) {
		var context = canvas.context;
		context.clearRect(0, 0, canvas.canvas.width, canvas.canvas.height);
	}	

	createImg(canvas) { 
		var file = canvas.file;

		if(file.type == 'dicom') {
			return this.createImgDICOM(canvas, file);
		}
		else if(file.type == 'dicom-3d') {
			//return this.createImgDICOM(canvas, file.getActiveFile());
			return this.createDicom3DImg(canvas);
		}
		else // Not a DICOM file, and the img should already exist
			return canvas.img;
	} 

	createImgDICOM(_canvas, file) { 
		var contrast = _canvas.contrast;

		var canvas = document.createElement('canvas');
		canvas.width = file.width;
		canvas.height = file.height;

    var context = canvas.getContext('2d');
    var pixelData = file.pixelData;
    var numPixels = file.width * file.height;
		var resolution = contrast.resolution;
		var imageData = context.getImageData(0, 0, file.width, file.height);

		var histogram = new ImageHistogram(pixelData, numPixels, 4096);

		for(var i = 0; i < numPixels; i++) {
			var value = contrast.map(pixelData[i]) * 255 / resolution;
			imageData.data[4*i] = value;
			imageData.data[4*i+1] = value;
			imageData.data[4*i+2] = value;
			imageData.data[4*i+3] = 255;
		}
		context.putImageData(imageData, 0, 0);
		var dataURL = canvas.toDataURL();     

		var img = document.createElement('img');
		img.src = dataURL;
		return img;
	}

	createDicom3DImg(_canvas) {
		var file = _canvas.file;
		var contrast = _canvas.contrast;
		var dimIndex = _canvas.dimIndex;
		var index = _canvas.sliceIndex;

		var bounds = [
			{ width: file.width, height: file.height }, // x, y
			{ width: file.depth, height: file.width  }, // z, x
			{ width: file.depth, height: file.height }  // z, y
		];
		var width = bounds[dimIndex].width;
		var height = bounds[dimIndex].height;

		var canvas = document.createElement('canvas');
		canvas.width = width;
		canvas.height = height;
		var context = canvas.getContext('2d');
		var imageData = context.getImageData(0, 0, width, height);
		var resolution = contrast.resolution;
		var pixelData = file.pixelData;

		if(dimIndex == 0) {	
			var z = index;
			var numPixels = width * height;
			for(var i = 0; i < numPixels; i++) {
				var value = contrast.map(pixelData[z][i]) * 255 / resolution;
				imageData.data[4*i] = value;
				imageData.data[4*i+1] = value;
				imageData.data[4*i+2] = value;
				imageData.data[4*i+3] = 255;
			}
		}
		else if(dimIndex == 1) {
			var i = 0;
			var y = index;
			for(var x = 0; x < file.width; x++)
					for(var z = 0; z < file.depth; z++, i++)  {
					var value = contrast.map(pixelData[z][y * file.width + x]) * 255 / resolution;
					imageData.data[4*i] = value;
					imageData.data[4*i+1] = value;
					imageData.data[4*i+2] = value;
					imageData.data[4*i+3] = 255;
				}	
		}
		else if(dimIndex == 2) {
			var i = 0;
			var x = index;
				for(var y = 0; y < file.height; y++) 
				for(var z = 0; z < file.depth; z++, i++) {
				var value = contrast.map(pixelData[z][y * file.width + x]) * 255 / resolution;
					imageData.data[4*i] = value;
					imageData.data[4*i+1] = value;
					imageData.data[4*i+2] = value;
					imageData.data[4*i+3] = 255;
				}
		}

		context.putImageData(imageData, 0, 0);
		var dataURL = canvas.toDataURL();     

		var img = document.createElement('img');
		img.src = dataURL;
		return img;
	}

	drawImage(canvas) {
		var context = canvas.context;
		var controls = canvas.controls;
		var threshold = canvas.threshold;
		var aspectRatio = canvas.draw.getBounds(canvas).aspectRatio;

		// Check there is an image to draw
		if(canvas.img == null)
			return;

		// Clear Image on Canvas
		this.clear(canvas);

		// Create new Img for DICOMs
		canvas.img = this.createImg(canvas); 

		// Draw scaled/translated Image
		var sx = -controls.panX;
		var sy = -controls.panY;
		var sWidth = Math.round(canvas.width / controls.zoom / aspectRatio);
		var sHeight = Math.round(canvas.height / controls.zoom);
		var dx = 0;
		var dy = 0;
		var dWidth = Math.round(canvas.width);
		var dHeight = Math.round(canvas.height);
		context.drawImage(canvas.img, sx, sy, sWidth, sHeight, dx, dy, dWidth, dHeight);

		// Thresholding
		if(Viewr.modes.threshold == ThresholdModes.GREY)
			canvas.drawMinThreshold();
		else if(Viewr.modes.threshold == ThresholdModes.COLOR)
			canvas.drawColorThreshold();
		
		// Feature - ROIs
		canvas.features.drawAllFeatures();

		// Feature - SliceLocations
		this.drawSliceLocations(canvas);
	}

	getBounds(canvas) {
		var file = canvas.file;
		var dimIndex = canvas.dimIndex;
		var bounds = [
			{ width: file.width, height: file.height, aspectRatio: file.pixelSpacing.x / file.pixelSpacing.y }, // x, y
			{ width: file.depth, height: file.width, aspectRatio: file.sliceThickness / file.pixelSpacing.x  }, // z, x
			{ width: file.depth, height: file.height, aspectRatio: file.sliceThickness / file.pixelSpacing.y }  // z, y
		];

		var width = bounds[dimIndex].width;
		var height = bounds[dimIndex].height;
		var aspectRatio = bounds[dimIndex].aspectRatio;
		return { width:width, height:height, aspectRatio:aspectRatio };
	}

	drawSliceLocations(canvas) {
		if(canvas.sliceSelect == null)
			return;

		var handles = canvas.sliceSelect.getSliceHandles();
		canvas.shapes.drawLine(canvas, handles.line);
		canvas.shapes.drawLine(canvas, handles.line2);
	}

	drawInvertedImage(canvas) {
		var context = canvas.context;

		var imageData = context.getImageData(0, 0, canvas.width, canvas.height);
		var data = imageData.data;
		for (var i = 0; i < data.length; i += 4) {
			data[i]     = 255 - data[i];     // red
			data[i + 1] = 255 - data[i + 1]; // green
			data[i + 2] = 255 - data[i + 2]; // blue
		}
		context.putImageData(imageData, 0, 0);
	}

	drawGreyScaleImage(canvas) {
		var context = canvas.context;

		var imageData = context.getImageData(0, 0, canvas.width, canvas.height);
		var data = imageData.data;
		for (var i = 0; i < data.length; i += 4) {
			var avg = (data[i] + data[i +1] + data[i +2]) / 3;
			data[i]     = avg; // red
			data[i + 1] = avg; // green
			data[i + 2] = avg; // blue
			}
		context.putImageData(imageData, 0, 0);		
	}

	drawGreyConstrastImage(canvas) {
		var context = canvas.context;
		var contrast = canvas.contrast;

		var imageData = context.getImageData(0, 0, canvas.width, canvas.height);
		var data = imageData.data;
		for (var i = 0; i < data.length; i += 4) {
			var avg = (data[i] + data[i +1] + data[i +2]) / 3;
			avg = contrast.map(avg); 
			data[i]     = avg; // red
			data[i + 1] = avg; // green
			data[i + 2] = avg; // blue
			}
		context.putImageData(imageData, 0, 0);		
	}

}

export default CanvasDraw;

