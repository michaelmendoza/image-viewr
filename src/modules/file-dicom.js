
import dicomParser from 'dicom-parser';

class FileDICOM {

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
		var imageFile = { filename:file.name, type:'dicom', pixelData:pixelData, width:columns, height:rows, numPixels:numPixels };

		var canvas = document.createElement('canvas');
		canvas.width = columns;
		canvas.height = rows;

    var context = canvas.getContext('2d');
    var numPixels = columns * rows;
		var imageData = context.getImageData(0, 0, columns, rows);
		for(var i = 0; i < numPixels; i++) {
		    imageData.data[4*i] = (pixelData[i]*255)/4095;
		    imageData.data[4*i+1] = (pixelData[i]*255)/4095;
		    imageData.data[4*i+2] = (pixelData[i]*255)/4095;
		    imageData.data[4*i+3] = 255;
		}
		context.putImageData(imageData, 0, 0);
		var dataURL = canvas.toDataURL();     

		var img = document.createElement('img');
		img.src = dataURL;
		imageFile.img = img;

		return imageFile;
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

}

export default FileDICOM;