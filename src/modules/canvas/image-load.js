import Viewr from '../viewr.js';
import ViewModes from '../modes/view-modes.js';

var ImageLoad = function(canvas) { 

	this.loadFile = (file) => {

		canvas.file = file;

		if(file.img != null) {
			canvas.img = file.img;
			
			// Auto-contrast for dicom files
			if(file.type == 'dicom')
				canvas.contrast.autoContrast(file.pixelData, file.numPixels);
			else if(file.type == 'dicom-3d') {
				canvas.contrast.autoContrast3D(file.fileset);
				Viewr.setMode('view', ViewModes._3D);
			}			
		}
		else {
			console.log("Error: File doesn't have image data");
		}
	}

	this.loadFileInFileSet = (indexMove) => {

		var dim = canvas.dimIndex;
		var maxIndex = (dim == 0) ? canvas.file.depth : (dim == 1) ? canvas.file.height : canvas.file.width;

		var index = canvas.sliceIndex + indexMove;
		index = index < 0 ? 0 : index;
		index = index >= maxIndex ? maxIndex - 1 : index;
		canvas.sliceIndex = index;

		canvas.drawImage();
		if(canvas.sliceSelect != null)
			canvas.sliceSelect.drawSlices();
	}

}

export default ImageLoad;

