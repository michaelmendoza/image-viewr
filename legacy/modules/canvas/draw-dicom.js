class DrawDicom {
	
	/** Creates an image from DICOM data */
	createImage(layer) { 
		var file = layer.file;
		if(file.type == 'dicom')				 return this.createDicom2D(layer); // Returns canvas
		else if(file.type == 'dicom-3d') return this.createDicom3D(layer); // Returns canvas
		else return file.img;						 // Returns img
	}
	
	/** Creates a canvas with dicom data using specified image constrast */
	createDicom2D(layer) { 
		var file = layer.file;
		var canvas = document.createElement('canvas');
		var context = canvas.getContext('2d');		
		canvas.width = file.width;
		canvas.height = file.height;
		
		var pixelData = file.pixelData;
		var numPixels = file.width * file.height;
		var resolution = layer.contrast.resolution;
		var imageData = context.getImageData(0, 0, file.width, file.height);

		for(var i = 0; i < numPixels; i++) {
			var value = layer.contrast.map(pixelData[i]) * 255 / resolution;
			var opacity = layer.threshold.opacityMap(pixelData[i]) * 255;
			imageData.data[4*i] = value;
			imageData.data[4*i+1] = value;
			imageData.data[4*i+2] = value;
			imageData.data[4*i+3] = opacity;
		} 
		context.putImageData(imageData, 0, 0);
		return canvas; 
	} 
	
	/** Creates a canvas with a slice of 3D dicom data using specified image constrast */
	createDicom3D(layer) { 
		var contrast = layer.contrast;
		var file = layer.file;		
		var dimIndex = layer.parent.parent.dimIndex;		
		var sliceIndex = layer.parent.parent.sliceIndex;

		var bounds = [
			{ width: file.width, height: file.height }, // x, y
			{ width: file.depth, height: file.width  }, // z, x
			{ width: file.depth, height: file.height }  // z, y
		];
		var width = bounds[dimIndex].width;
		var height = bounds[dimIndex].height;

		var canvas = document.createElement('canvas');
    var context = canvas.getContext('2d');	
		canvas.width = width;
		canvas.height = height;

		var pixelData = file.pixelData;
		var resolution = contrast.resolution;
		var imageData = context.getImageData(0, 0, width, height);

		if(dimIndex == 0) {	
			var z = sliceIndex;
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
			var y = sliceIndex;
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
			var x = sliceIndex;
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
		return canvas;
	}
	
}

export default new DrawDicom();
