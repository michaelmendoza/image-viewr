import EventEmitter from 'events';

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
    	var file = files[i];
    	var reader = new FileReader();
    	reader.onload = function(event) {
    		var img = document.createElement('img');
    		img.src = event.target.result;
    		this.files.push({ filename:file.name, img:img });
    		this.emit('filesloaded');
    	}.bind(this)

   		reader.readAsDataURL(file)
    }
	}

}

export default new ImageFileStore();
