 
class CanvasPixel {

	constructor() {
		this.data = { x:'-', y:'-', value:'-'};
	}

	getPixelData(canvas, x, y) {
		var context = canvas.context;
		var controls = canvas.controls;
		var file = canvas.file;

		var pixel = { x:x, y:y, value:'-'};
		if(file == null) {
			this.data = pixel;
			return pixel;			
		} 

		var pixelData = undefined;
		if(file.type == 'dicom')
			pixelData = file.pixelData;
		else if(file.type == 'dicom-3d')
			pixelData = file.getActiveFile().pixelData;
		
		if(pixelData !== undefined) {
			var point = controls.transform({x,y});
			x = Math.round(point.x); 
			y = Math.round(point.y);
			var width = file.img.width;
			pixel = { x:x, y:y, value:pixelData[x + y * width] };
		}
		else {
			var data = context.getImageData(x, y, 1, 1).data;
			var greyValue = Math.round((data[0] + data[1] + data[2]) / 3);
			pixel = { x:x, y:y, r:data[0], g:data[1], b:data[2], value:greyValue };
		}

		this.data = pixel;
		return pixel;
	}

}

export default CanvasPixel;