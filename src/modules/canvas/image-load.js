import Viewr from '../viewr.js';
import ViewModes from '../modes/view-modes.js';

var ImageLoad = function(canvas) { 

	this.loadFile = (file) => {

		canvas.file = file;
			
		if(file.type == 'png' || file.type == 'jpeg') {
			Viewr.setMode('view', ViewModes._2D);
			canvas.setViewportSize();
			canvas.img = file.img;
			canvas.drawImage();
		}
		
		// Auto-contrast for dicom files
		if(file.type == 'dicom') {
			Viewr.setMode('view', ViewModes._2D);
			canvas.contrast.autoContrast(file.pixelData, file.numPixels);
			canvas.setViewportSize();
			canvas.updateImage();			
		}

		else if(file.type == 'dicom-3d') { 
			Viewr.setMode('view', ViewModes._3D);
			var bounds = file.getBounds(canvas.dimIndex);
			canvas.contrast.autoContrast3D(file.fileset);
			canvas.controls.setAspectRatio(bounds.dx, bounds.dy);
			canvas.setViewportSize();
			this.loadDefaultDimIndices(file);
			canvas.updateImage();
		} 

	}

	this.loadDefaultDimIndices = (file) => { 
		if(canvas.dimIndex == 0) 
			canvas.sliceIndex = Math.floor(file.depth / 2);
		else if(canvas.dimIndex == 1)
			canvas.sliceIndex = Math.floor(file.height / 2);
		else if(canvas.dimIndex == 2)
			canvas.sliceIndex = Math.floor(file.width / 2);
	}

	this.loadFileInFileSet = (indexMove) => {

		if(indexMove == 0)
			return;

		var dim = canvas.dimIndex;
		var maxIndex = (dim == 0) ? canvas.file.depth : (dim == 1) ? canvas.file.height : canvas.file.width;
		
		var index = canvas.sliceIndex + indexMove;
		index = index < 0 ? 0 : index;
		index = index >= maxIndex ? maxIndex - 1 : index;
		canvas.sliceIndex = index;

		canvas.updateImage();
		if(canvas.sliceSelect != null)
			canvas.sliceSelect.update(); 
	}

}

export default ImageLoad;

