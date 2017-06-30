
import EventEmitter from 'events';
import File from '../../modules/loader/file.js';
import FileSet from '../../modules/loader/file-set.js';

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

		if(isDicomSet && files.length > 1) {
			// Load a 3D dicom dataset
			var dataset = new FileSet(files, ()=> { this.emit('filesloaded'); });
			this.files.push( dataset );
		}
		else {
			// Load a series of files
			for (var i = 0; i < files.length; i++) {
				
				var file = new File(files[i], () => { 
					if(file.type == 'dicom')
						file.img = file.dicom.createImg();

					this.emit('filesloaded'); 
				});

				this.files.push( file );
			}
		}
	}

}

export default new ImageFileStore();