import Viewr from '../viewr.js';
import ViewModes from '../modes/view-modes.js';

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
			else if(file.type == 'dicom-3d') {
				canvas.contrast.autoContrast3D(file.fileset);
				Viewr.setMode('view', ViewModes._3D);
			}
			
			//canvas.drawImage();
		}
		else {
			console.log("Error: File doesn't have image data");
		}
	}

	this.loadFileInFileSet = (indexMove) => {
			
			var dim = canvas.dimIndex;
			var maxIndex = (dim == 0) ? canvas.file.depth : (dim == 1) ? canvas.file.height : canvas.file.width;

			var index = canvas.file.activeIndex + indexMove;
			index = index < 0 ? 0 : index;
			index = index >= maxIndex ? maxIndex - 1 : index;
			canvas.file.activeIndex = index;

			//canvas.img = new Image();
			//canvas.img = canvas.file.fileset[index].img;
			//canvas.width = canvas.img.width;
			//canvas.height = canvas.img.height;
			canvas.drawImage();
	}

}

export default ImageLoad;

