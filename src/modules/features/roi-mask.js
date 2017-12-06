
class ROIMask {
	
	/** Create a canvas with feature drawn in bounding box*/
	createMask(feature) {
		var bounds = feature.getBoundingBox();

		var canvasMask = document.createElement('canvas');
		canvasMask.width = Math.floor(bounds.width);
		canvasMask.height = Math.floor(bounds.height);
		var contextMask = canvasMask.getContext('2d');
		feature.drawMaskROI(contextMask, bounds);
		var mask = contextMask.getImageData(0, 0, canvasMask.width, canvasMask.height);
		return mask.data;
	}

	/** 
		* Takes images, and mask imageData array, and creates a new array with masked image 
		*	data. Masked pixels maintain image values, while unmasked pixels have a value of -1.
		* Returned masked image array size is 1/4 the size of the image.
		**/ 	
	applyMaskToImage(feature, mask, layer) {
		var pixelData = layer.file.pixelData;
		var width = layer.file.width;
		var height = layer.file.height;

		var bounds = feature.getBoundingBox();
		bounds.sx = Math.floor(bounds.sx);
		bounds.sy = Math.floor(bounds.sy);
		bounds.width = Math.floor(bounds.width);
		bounds.height = Math.floor(bounds.height)

		var length = mask.length / 4;
		var values = Array(length);

		for (var i = 0; i < length; i++) { 
			var valid = (mask[i * 4] === 255);
			if(valid) {
				var x = bounds.sx;
				var y = bounds.sy;
				var w = bounds.width;
				var index = x + (i % w) + (y + Math.floor(i / w)) * width;
				values[i] = pixelData[index];
			}
			else
				values[i] = -1;
		}
		
		return values;	
	}	

}

export default new ROIMask();
