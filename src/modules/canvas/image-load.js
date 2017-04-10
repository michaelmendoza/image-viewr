
var ImageLoad = function(canvas) { 

	this.loadFile = (file) => {
		
		canvas.file = file;

		if(file.img != null) {
			canvas.img = file.img;
			canvas.width = canvas.img.width;
			canvas.height = canvas.img.height;
			
			// Auto-contrast for dicom files
			if(file.type == 'dicom')
				canvas.contrast.autoContrast(file.pixelData, file.numPixels);
			else if(file.type == 'dicom-3d')
				canvas.contrast.autoContrast3D(file.fileset);
			
			canvas.drawImage();
		}
		else {
			console.log("Error: File doesn't have image data");
		}
	}

	this.loadFileInFileSet = (indexMove) => {
		
			var index = canvas.file.activeIndex + indexMove;
			index = index < 0 ? 0 : index;
			index = index >= canvas.file.fileset.length ? canvas.file.fileset.length - 1 : index;
			canvas.file.activeIndex = index;

			canvas.img = new Image();
			canvas.img = canvas.file.fileset[index].img;
			canvas.width = canvas.img.width;
			canvas.height = canvas.img.height;
			canvas.drawImage();
	}

}

export default ImageLoad;

