
class DrawImage {
	
	createImg(imageData) {
		var canvas = document.createElement('canvas');
		var context = canvas.getContext('2d');
		canvas.width = imageData.width;
		canvas.height = imageData.height;

		context.putImageData(imageData, 0, 0);
		var dataURL = canvas.toDataURL();     
		var img = document.createElement('img');
		img.src = dataURL;
		return img;
	}
	
	getImageData(img) {
		var canvas = document.createElement('canvas');
		var context = canvas.getContext('2d');
		canvas.width = img.width;
		canvas.height = img.height;
		context.drawImage(img, 0, 0 );
		return context.getImageData(0, 0, img.width, img.height);
	}

	getBlankImageData(width, height) {
		var canvas = document.createElement('canvas');
		var context = canvas.getContext('2d');
		canvas.width = width;
		canvas.height = height;		
		return context.getImageData(0, 0, width, height);
	}

	invert(imageData) {
		var data = imageData.data;
		for (var i = 0; i < imageData.data.length; i += 4) {
			data[i] = 255 - data[i];
			data[i+1] = 255 - data[i+1];
			data[i+2] = 255 - data[i+2];
			data[i+3] = 255;
		}	
	}

	toGreyscale(imageData) {
		var data = imageData.data;
		for (var i = 0; i < data.length; i += 4) {
			var avg = (data[i] + data[i +1] + data[i +2]) / 3;
			data[i]     = avg; // red
			data[i + 1] = avg; // green
			data[i + 2] = avg; // blue
		}
	}

	toGreyscaleWithConstrast(imageData, contrast) {
		var data = imageData.data;
		for (var i = 0; i < data.length; i += 4) {
			var avg = (data[i] + data[i +1] + data[i +2]) / 3;
			avg = contrast.map(avg); 
			data[i]     = avg; // red
			data[i + 1] = avg; // green
			data[i + 2] = avg; // blue
		}
	}

}

export default new DrawImage();