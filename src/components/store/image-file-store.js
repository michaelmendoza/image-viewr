
import EventEmitter from 'events';
import File from '../../modules/file.js';

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
		for (var i = 0; i < files.length; i++) {
			this.files.push( 
				new File( files[i], () => { this.emit('filesloaded'); } )
			);
		}
	}

}

export default new ImageFileStore();
