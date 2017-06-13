
import File from './file.js';

class FileSet {
	constructor(files, fileLoadedCallback) {
		this.files = files;
		this.type = 'dicom-3d';
		this.img = null;
		this.fileLoadedCallback = fileLoadedCallback;

		this.readDICOMs();
	}

	getBounds(dimIndex) { 
		var bounds = [
			{ width: this.width, height: this.height, dx: this.pixelSpacing.x, dy: this.pixelSpacing.y }, // x, y
			{ width: this.depth, height: this.width, dx: this.sliceThickness, dy: this.pixelSpacing.x  }, // z, x
			{ width: this.depth, height: this.height, dx: this.sliceThickness, dy: this.pixelSpacing.y }  // z, y
		];
		var width = bounds[dimIndex].width;
		var height = bounds[dimIndex].height;
		var dx = bounds[dimIndex].dx;
		var dy = bounds[dimIndex].dy;
		return { width:width, height:height, dx:dx, dy:dy };
	} 

	isLoaded() { 
		this.loadedCount++;
		if(this.loadedCount == this.files.length) { 
			this.width = this.fileset[0].width;
			this.height = this.fileset[0].height;		
			this.depth = this.loadedCount;
			this.img = this.fileset[Math.floor(this.depth / 2)].dicom.createImg();

			this.pixelSpacing = this.fileset[0].header.pixelSpacing;
			if(this.pixelSpacing !== undefined) {
				this.pixelSpacing = this.pixelSpacing.split('\\');
				this.pixelSpacing = { x: parseFloat(this.pixelSpacing[0]), y: parseFloat(this.pixelSpacing[1]) };				
			} 
			this.sliceThickness = this.fileset[0].header.sliceThickness;
			this.sliceThickness = parseFloat(this.sliceThickness);

			this.pixelData = [];
			for(var i = 0; i < this.files.length; i++) {
				this.pixelData.push(this.fileset[i].pixelData);
			}

			this.fileLoadedCallback();			
		}
	}

	readDICOMs() {
		this.loadedCount = 0;
		this.fileset = [];
		for(var i = 0; i < this.files.length; i++) {
			var file = new File(this.files[i], this.isLoaded.bind(this));
			this.fileset.push(file);
		}	
	}

}

export default FileSet;