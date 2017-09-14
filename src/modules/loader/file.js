
import FileDICOM from './file-dicom.js';

class File {
	constructor(file, fileLoadedCallback) {
		this.filename = file.name;
		this.type = null;
		this.img = null;
		this.fileLoadedCallback = fileLoadedCallback;

		var readers = {
			"image/png" : () => { this.readPNG(file); },
			"image/jpeg": () => { this.readJPEG(file); },
			"application/dicom" : () => { this.readDICOM(file); }
		}
		readers[file.type]();
	}
	
	readPNG(file) {
		var reader = new FileReader();
		reader.onload = (event) => { 
			var img = document.createElement('img');
			img.src = event.target.result;
			this.type = 'png';
			this.img = img;
			this.fileLoadedCallback();
		}
		reader.readAsDataURL(file);
	}		
	
	readJPEG(file) {
		var reader = new FileReader();
		reader.onload = (event) => {
			var img = document.createElement('img');
			img.src = event.target.result;
			this.type = 'jpeg';
			this.img = img;
			this.fileLoadedCallback();
		}
		reader.readAsDataURL(file);
	}

	readDICOM(file) {
		var reader = new FileReader();
		reader.onload = (event) => {
			var dicom = new FileDICOM(event);
			this.dicom = dicom;
			this.type = 'dicom';
			this.img = dicom.img;			
			this.width = dicom.width;
			this.height = dicom.height;
			this.numPixels = dicom.numPixels;
			this.pixelData = dicom.pixelData;		
			this.header = dicom.header;	
			this.getBounds = (dimIndex) => { 
				return { width: this.width, height: this.height };
			}

			this.fileLoadedCallback();
		}
		reader.readAsArrayBuffer(file);
	}

	readSingleDICOM(file) {
		var reader = new FileReader();
		reader.onload = (event) => {
			var dicom = new FileDICOM(event);
			this.dicom = dicom;
			this.type = 'dicom';
			this.img = dicom.img;			
			this.width = dicom.width;
			this.height = dicom.height;
			this.numPixels = dicom.numPixels;
			this.pixelData = dicom.pixelData;		
			this.header = dicom.header;	
			this.getBounds = (dimIndex) => { 
				return { width: this.width, height: this.height };
			}

			this.fileLoadedCallback();
		}
		reader.readAsArrayBuffer(file);
	}

	readDICOMs(files) {
		var filesLoaded = () => { };

		var count = 0;
		files.forEach((file)=> {
			var reader = new FileReader();
			reader.onload = (event) => { 
				this.dicom[count] = new FileDICOM(event);
				if(file.length - 1 == count++)
					filesLoaded();
			}
			reader.readAsArrayBuffer(file);
		})
	}

}

export default File;