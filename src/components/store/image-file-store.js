
import EventEmitter from 'events';
import File from '../../modules/loader/file.js';
import FileSet from '../../modules/loader/file-set.js';

class ImageFileStore extends EventEmitter { 

	constructor() {
		super();
		this.files = [];
		this.current = null;

		this.getLoadedFiles = this.getLoadedFiles.bind(this);
		this.readFile = this.readFile.bind(this);
	}

	setCurrentFile(file) {
		this.current = file;
	}

	getCurrentFile() {
		return this.current;
	}

	getLoadedFiles() {
		return this.files;
	}

	readFile(event) {
		var files = event.dataTransfer.files;
		var dataset = new File(files, ()=> { this.emit('filesloaded'); });
		this.files.push( dataset );

		/*
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
		*/
	}

	addFile(file) {
		this.files.push(file);
		this.emit('filesloaded');
	}
	
	addImageFile(image) {
		var file = { filename:'', type:"image", img:image };
		this.files.push(file);	
		this.emit('filesloaded'); 
	}

}

export default new ImageFileStore();
