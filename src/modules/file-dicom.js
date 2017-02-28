
import dicomParser from 'dicom-parser';

class FileDICOM {

	constructor(event) {
		this.readDICOM(event);
	}

	readDICOM(event) {
		var frame = 0;
		var arrayBuffer = event.target.result;
		var byteArray = new Uint8Array(arrayBuffer);
		var dataSet = dicomParser.parseDicom(byteArray);

		var headerUIDs = {
			patientId: 'x00100020',
			patientName: 'x00100010',
			studyId: 'x00200010',
			studyDescription: 'x00081030',
			studyDate: 'x00080020',
			studyTime: 'x00080030',
			protocolName: 'x00181030',
			seriesDescription: 'x0008103e',
			seriesNumber: 'x00200011',
			modality: 'x00080060',
			instanceNumber: 'x00200013',
			acquistionNumber: 'x00200012',
			
			rows: 'x00280010',
			columns: 'x00280011',
			samplesPerPixel: 'x00280002',
			pixelSpacing: 'x00280030',
			sliceThickness: 'x00180050',
			bitsStored: 'x00280101',

			transferSyntax: 'x00020010' // Explicit VR Little Endian - "1.2.840.10008.1.2.1"
		};

		var header = {};
		for (var key in headerUIDs) {
			if(key == 'rows' || key == 'columns' || key == 'samplesPerPixel' || key == 'bitsStored')
				header[key] = dataSet.uint16(headerUIDs[key]);
			else
				header[key] = dataSet.string(headerUIDs[key]);
		}

		var rows = header.rows;
		var columns = header.columns;
		var samplesPerPixel = header.samplesPerPixel;
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

		var canvas = document.createElement('canvas');
		canvas.width = columns;
		canvas.height = rows;

    var context = canvas.getContext('2d');
    var numPixels = columns * rows;
		var imageData = context.getImageData(0, 0, columns, rows);

		var maxValue = 0;
		for(var i = 0; i < numPixels; i++) {
			maxValue = maxValue >= pixelData[i] ? maxValue : pixelData[i];
		}
		var resolution = maxValue; //Math.pow(2,bitsStored);

		for(var i = 0; i < numPixels; i++) {
			var value = (pixelData[i] * 255)/resolution;
			imageData.data[4*i] = value;
			imageData.data[4*i+1] = value;
			imageData.data[4*i+2] = value;
			imageData.data[4*i+3] = 255;
		}
		context.putImageData(imageData, 0, 0);
		var dataURL = canvas.toDataURL();     

		var img = document.createElement('img');
		img.src = dataURL;
		
		this.header = header;
		this.img = img;
		this.width = columns;
		this.height = rows;
		this.numPixels = numPixels;
		this.pixelData = pixelData;
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