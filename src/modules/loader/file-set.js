
import File from './file.js';

class FileSet {
	constructor(files, fileLoadedCallback) {
		this.files = files;
		this.type = 'dicom-3d';
		this.img = null;
		this.fileLoadedCallback = fileLoadedCallback;

		this.readDICOMs();
	}

	isLoaded() { 
		this.loadedCount++;
		if(this.loadedCount == this.files.length) {
			this.img = this.fileset[0].img;
			this.width = this.fileset[0].width;
			this.height = this.fileset[0].height;		
			this.depth = this.loadedCount;

			this.pixelSpacing = this.fileset[0].header.pixelSpacing;
			this.pixelSpacing = this.pixelSpacing.split('\\');
			this.pixelSpacing = { x: parseFloat(this.pixelSpacing[0]), y: parseFloat(this.pixelSpacing[1]) };
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