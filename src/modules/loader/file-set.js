
import File from './file.js';

class FileSet {
	constructor(files, fileLoadedCallback) {
		this.files = files;
		this.type = 'dicom-3d';
		this.img = null;
		this.fileLoadedCallback = fileLoadedCallback;

		this.activeIndex = 0;

		this.readDICOMs();
	}

	getActiveFile() {
		return this.fileset[this.activeIndex];
	}

	isLoaded() { 
		this.loadedCount++;
		if(this.loadedCount == this.files.length) {
			this.img = this.fileset[0].img;
			this.width = this.fileset[0].width;
			this.height = this.fileset[0].height;		
			this.depth = this.loadedCount;

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