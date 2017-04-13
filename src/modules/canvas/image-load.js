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
				var bounds = file.getBounds(canvas.dimIndex);
				canvas.contrast.autoContrast3D(file.fileset);
				canvas.controls.setAspectRatio(bounds.dx, bounds.dy);
				Viewr.setMode('view', ViewModes._3D);
			}			
		}
		else {
			console.log("Error: File doesn't have image data");
		}
	}

	this.loadFileInFileSet = (indexMove) => {

		if(indexMove == 0)
			return;

		var dim = canvas.dimIndex;
		var maxIndex = (dim == 0) ? canvas.file.depth : (dim == 1) ? canvas.file.height : canvas.file.width;

		var index = canvas.sliceIndex + indexMove;
		//index = index % (maxIndex - 1);
		index = index < 0 ? 0 : index;
		index = index >= maxIndex ? maxIndex - 1 : index;
		canvas.sliceIndex = index;

		canvas.drawImage();
		if(canvas.sliceSelect != null)
			canvas.sliceSelect.drawSliceImages();
	}

}

export default ImageLoad;

