
import EventEmitter from 'events';
import File from '../../modules/file.js';
import FileSet from '../../modules/file-set.js';

class ImageFileStore extends EventEmitter {

	constructor() {
		super();
		this.files = [];

		this.getLoadedFiles = this.getLoadedFiles.bind(this);
		this.readFile = this.readFile.bind(this);
	}

	getLoadedFiles() {
		return this.files;
	}

	readFile(event) {
		var files = event.dataTransfer.files;

		var isDicomSet = true;
		for (var i = 0; i < files.length; i++) {
			isDicomSet = files[i].type == "application/dicom" ? isDicomSet : false;
		}

		if(isDicomSet) {
			// Load a 3D dicom dataset
			var dataset = new FileSet(files, ()=> { this.emit('filesloaded'); });
			this.files.push( dataset );
		}
		else {
			// Load a series of files
			for (var i = 0; i < files.length; i++) {
				this.files.push( new File(files[i], () => { this.emit('filesloaded'); }));
			}
		}
	}

}

export default new ImageFileStore();
