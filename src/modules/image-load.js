
var ImageLoad = function() {

	this.loadFile = (file) => {

		this.file = file;

		if(file.img != null) {
			this.img = file.img;
			this.width = this.img.width;
			this.height = this.img.height;
			
			// Auto-contrast for dicom files
			if(file.type == 'dicom')
				this.imageContrast.autoContrast(file.pixelData, file.numPixels);
			else if(file.type == 'dicom-3d')
				this.imageContrast.autoContrast(file.fileset[0].pixelData, file.fileset[0].numPixels);
			
			this.drawImage();
		}
		else {
			console.log("Error: File doesn't have image data");
		}
	}

	this.loadFileInFileSet = (indexMove) => {
		
			var index = this.file.activeIndex + indexMove;
			index = index < 0 ? 0 : index;
			index = index >= this.file.fileset.length ? this.file.fileset.length - 1 : index;
			this.file.activeIndex = index;

			this.img = new Image();
			this.img = this.file.fileset[index].img;
			this.width = this.img.width;
			this.height = this.img.height;
			this.drawImage();
	}

}

export default ImageLoad;

