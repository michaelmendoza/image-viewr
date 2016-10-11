
class FileManager {
	constructor() {
		super();
		this.files = [];

		this.getLoadedFiles = this.getLoadedFiles.bind(this);
	}

	getLoadedFiles() {
		return this.files;
	}

	readFiles(event) {
    var files = event.dataTransfer.files;

    for (var i = 0; i < files.length; i++) {
    	var file = files[i];
    	var reader = new FileReader();

    	var readers = {
    		"image/png" : () => {
		    	reader.onload = this.readPNG.bind(this, file);
		   		reader.readAsDataURL(file)
    		},
    		"application/dicom" : () => {
    			reader.onload = this.readDICOM.bind(this, file);
    			reader.readAsArrayBuffer(file);
    		}
    	}
    	readers[file.type]();

    }
	}

}

export default FileManager;