import EventEmitter from 'events';
import dicomParser from 'dicom-parser';

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

	readPNG(file, event) {
		var img = document.createElement('img');
		img.src = event.target.result;
		this.files.push({ filename:file.name, type:'png', img:img });
		this.emit('filesloaded');
	}

	getPixelFormat(dataSet) {
		var pixelRepresentation = dataSet.uint16('x00280103');
		var bitsAllocated = dataSet.uint16('x00280100');
		if(pixelRepresentation === 0 && bitsAllocated === 8) {
			return 1; // unsigned 8 bit
		} 
		else if(pixelRepresentation === 0 && bitsAllocated === 16) {
			return 2; // unsigned 16 bit
		} 
		else if(pixelRepresentation === 1 && bitsAllocated === 16) {
			return 3; // signed 16 bit data
		}
	}

	getBytesPerPixel(pixelFormat) {
		if(pixelFormat ===1) {
		  return 1;
		}
		else if(pixelFormat ===2 || pixelFormat ===3) {
		  return 2;
		}
		throw "unknown pixel format";
	}

	readDICOM(file, event) {
		var frame = 0;
		var arrayBuffer = event.target.result;
		var byteArray = new Uint8Array(arrayBuffer);

		var dataSet = dicomParser.parseDicom(byteArray);
		var patientId = dataSet.string('x00100020');
		var patientName = dataSet.string('x00100010');
		var transferSyntax = dataSet.string('x00020010');  // Explicit VR Little Endian - "1.2.840.10008.1.2.1"

		var rows = dataSet.uint16('x00280010');
		var columns = dataSet.uint16('x00280011');
		var samplesPerPixel = dataSet.uint16('x00280002');
		var numPixels = rows * columns * samplesPerPixel;

		var pixelDataElement = dataSet.elements.x7fe00010;
		var pixelDataOffset = pixelDataElement.dataOffset;

		var pixelFormat = this.getPixelFormat(dataSet);
		var bytesPerPixel = this.getBytesPerPixel(pixelFormat);
		var frameOffset = pixelDataOffset + frame * numPixels * bytesPerPixel;
		if(frameOffset >= dataSet.byteArray.length) {
		  throw 'frame exceeds size of pixelData';
		}
		var pixelData = new Uint16Array(dataSet.byteArray.buffer, frameOffset, numPixels);

		this.files.push({ filename:file.name, type:'dicom', pixelData:pixelData, width:columns, height:rows, numPixels:numPixels });
		this.emit('filesloaded');
	}

}

export default new ImageFileStore();
