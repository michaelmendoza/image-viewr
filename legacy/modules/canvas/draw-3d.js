
class Draw3D {
	
	drawTile3DImage(_canvas) { 
		// Use Mask if there are ROI features
		var useMask = _canvas.features.features.length > 0;

		// Setup
		var contrast = _canvas.contrast;
		var file = _canvas.file;
		var width = file.width;
		var height = file.height;
		var depth = file.depth;

		// Image Canvas
		var img = document.createElement('img');
		var canvas = document.createElement('canvas');
		canvas.width = width;
		canvas.height = height;
		var context = canvas.getContext('2d');
		var imageData = context.getImageData(0, 0, width, height);
		var resolution = contrast.resolution;
		var pixelData = file.pixelData;

		// Tile Canvas
		var tileCanvas = document.createElement('canvas');
		tileCanvas.width = 4096;
		tileCanvas.height = 4096;
		var tileContext = tileCanvas.getContext('2d');

		for(var z = 0; z < depth; z++) {	
			var numPixels = width * height;

			//var featureMask = _canvas.features.getFeatureMask(z);

			// Create 2D slice with constrast map with alpha value equal to grey image value
			for(var i = 0; i < numPixels; i++) {

				var value = contrast.map(pixelData[z][i]) * 255 / resolution;
				imageData.data[4*i] = value;
				imageData.data[4*i+1] = value;
				imageData.data[4*i+2] = value;
				imageData.data[4*i+3] = value;
				
				/*
				// Get feature mask value
				var maskValue = 255;
				if(useMask)
					maskValue = (featureMask == null) ? 0.0 : featureMask.data[4*i];

				// Draw data if in feature ROI
				if(maskValue > 0) {
					var value = contrast.map(pixelData[z][i]) * 255 / resolution;
					imageData.data[4*i] = value;
					imageData.data[4*i+1] = value;
					imageData.data[4*i+2] = value;
					imageData.data[4*i+3] = value;
				}
				// Clear data not in feature ROI
				else {
					imageData.data[4*i] = 0.0;
					imageData.data[4*i+1] = 0.0;
					imageData.data[4*i+2] = 0.0;
					imageData.data[4*i+3] = 0.0;	
				}
				*/
			}
			
			// Create dataURL of 2D Slice
			context.putImageData(imageData, 0, 0);
			var dataURL = canvas.toDataURL();
			img.src = dataURL;

			// Draw a tiled image on a canvas
			var dWidth = 256;
			var dHeight = 256;
			var dx = (dWidth * z) % 4096;
			var dy = Math.floor((dWidth * z) / 4096) * dHeight;			
			tileContext.drawImage(img, 0, 0, width, height, dx, dy, dWidth, dHeight);
		}

		document.write('<img src="' + tileCanvas.toDataURL() + '" width="4096" height="4096"/>');

		return tileCanvas.toDataURL();
	}
	
}

export default new Draw3D();