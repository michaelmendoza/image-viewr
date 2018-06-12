
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
		var type = this.getType(file);
		readers[type]();
	}
	
	/** Assuming first file is the same type for all files in list, should check */
	getType(file) { 
		var fileType = file[0].type;
		if(fileType == "")	
		{
			var filename = file[0].name;
			var splitHere = filename.indexOf('.');
			var typeTag = filename.substring(splitHere, filename.length); 
			if(typeTag == ".dcm"){
				fileType = "application/dicom";
			}
			else if(typeTag == ".jpeg"){
				fileType = "image/jpeg";
			}
			else if(typeTag == ".png"){
				fileType = "image/png";
			}
		}
		return fileType;				
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
		if(file.length > 1)
			this.readDICOMs(file);
		else
			this.readSingleDICOM(file[0]);
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
			this.img = dicom.createImg();

			this.fileLoadedCallback();
		}
		reader.readAsArrayBuffer(file);
	}

	readDICOMs(files) { 
		this.dicom = Array(files.length);
		this.type = 'dicom-3d';
		this.img = null;

		var count = 0;
		for (var i = 0; i < files.length; i++) {

			var reader = new FileReader();
			reader.onload = (event) => { 
				this.dicom[count] = new FileDICOM(event);
				if(files.length - 1 == count++)
					this.dicomsLoaded();
			}
			reader.readAsArrayBuffer(files[i]);
		}
	}

	dicomsLoaded() {
		this.width = this.dicom[0].width;
		this.height = this.dicom[0].height;
		this.depth = this.dicom.length;
		this.img = this.dicom[Math.floor(this.depth / 2)].createImg();

		this.pixelSpacing = this.dicom[0].header.pixelSpacing;
		if(this.pixelSpacing !== undefined) {
			this.pixelSpacing = this.pixelSpacing.split('\\');
			this.pixelSpacing = { x: parseFloat(this.pixelSpacing[0]), y: parseFloat(this.pixelSpacing[1]) };				
			this.pixelSpacing_X = this.pixelSpacing.x;
			this.pixelSpacing_Y = this.pixelSpacing.y;
		}		
		this.sliceThickness = this.dicom[0].header.sliceThickness;
		this.sliceThickness = parseFloat(this.sliceThickness).toFixed(4);

		this.pixelData = [];
		for(var i = 0; i < this.dicom.length; i++) { 
			this.pixelData.push(this.dicom[i].pixelData);
		}

		this.fileLoadedCallback();			
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

	getPixelCount(dim) { 
		var pixelCount = [
			this.width * this.height,
			this.depth * this.width,
			this.depth * this.height
		]
		return pixelCount[dim];
	}

}

export default File;