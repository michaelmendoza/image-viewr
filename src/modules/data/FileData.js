import {parseDicom} from 'dicom-parser';
import nj from 'numjs';
import { ContrastType, toImageURL } from './Voxel';

export const FileType = {
    PNG: 'image/png',
    JPEG: 'image/jpeg',
    DICOM: 'application/dicom'
}

/** Reads, and Holds data from file. */
class FileData {

    constructor(filelist, callback) {
        this.filelist = filelist;
        this.type = this.getType(filelist);      
    }

    /** Retrieves files type */
    getType(filelist) {
        var fileType = filelist[0].type;

        // Generate type from fileExtension, if type is empty
        if(fileType == "") {
            var filename = filelist[0].name;
			var splitHere = filename.indexOf('.');
            var typeTag = filename.substring(splitHere, filename.length); 
			if(typeTag == ".dcm")  fileType = FileType.DICOM;
			if(typeTag == ".jpeg") fileType = FileType.JPEG;
			if(typeTag == ".png")  fileType = FileType.PNG;
        }

        return fileType;
    }

    /** Read file data */
    async read() {
        var filelist = this.filelist;
        var readers = {
			[FileType.PNG]   : () => { return readImageAsync(filelist[0]); },
			[FileType.JPEG]  : () => { return readImageAsync(filelist[0]); },
			[FileType.DICOM] : () => { return readDicomAsync(filelist); }
        }
                
        try {
            this.data = await readers[this.type]();
            console.log("Debug: File Read", this.type)
        } catch(err) {
            console.log("Debug: File Read Error")
        } 
    }
}

export const readImage = (file, callback) => {
    var data = { img: new Image() };
    var reader = new FileReader();
    reader.onload = (event) => { 
        data.img.onload = () =>  {
            data.pixelData = nj.images.read(data.img);
            callback(data);
        }
        data.img.src = event.target.result;
    }
    reader.readAsDataURL(file);
    return data;
}

export const readImageAsync = (file) => {
    return new Promise((resolve, reject) => {
        var data = { img: new Image() };
        var reader = new FileReader();
        reader.onload = (event) => { 
            data.img.onload = () =>  {
                data.pixelData = nj.images.read(data.img);
                data.width = data.pixelData.shape[1];
                data.height = data.pixelData.shape[0];
                resolve(data);
            }
            data.img.onerror = reject;
            data.img.src = event.target.result;
        }
        reader.onerror = reject;
        reader.readAsDataURL(file);
    })
}

export const readDicomAsync = (filelist) => {
    return filelist.length > 1 ? readDicom3DAsync(filelist) : readDicom2DAsync(filelist[0]);
}

const readDicom2D = (file, callback) => {
    var data = null;
    var reader = new FileReader();
    reader.onload = (event) => {
        data = readDicomFile(event);
        callback(data);
    }
    reader.readAsArrayBuffer(file);
    return data;
}

const readDicom2DAsync = (file) => {
    return new Promise((resolve, reject) => {
        let reader = new FileReader();
        reader.onload = (event) => {
            resolve(readDicomFile(event));
        }
        reader.onerror = reject;
        reader.readAsArrayBuffer(file);
    })
}

const readDicom3D = (files, callback) => {
    var data = null;
    var dicomArray = Array(files.length);
    var count = 0;
    for (var i = 0; i < files.length; i++) {
        var reader = new FileReader();
        reader.onload = (event) => {
            dicomArray[count] = readDicomFile(event);
            if(files.length - 1 == count++) {
                data = processDicom3D(dicomArray);
                callback(data);
            }
        }
        reader.readAsArrayBuffer(files[i]);
    }
    return data;
}

const readDicom3DAsync = (files) => {
    return new Promise((resolve, reject) => {
        var data = null;
        var dicomArray = Array(files.length);
        var count = 0;
        for (var i = 0; i < files.length; i++) {
            var reader = new FileReader();
            reader.onload = (event) => {
                dicomArray[count] = readDicomFile(event);
                if(files.length - 1 == count++) {
                    data = processDicom3D(dicomArray);
                    resolve(data);
                }
            }
            reader.onerror = reject;
            reader.readAsArrayBuffer(files[i]);
        } 
    })
}

const processDicom3D = (dicomArray) => {
    var data = {};
    data.header = dicomArray.map((d)=>{ return d.header; })
    data.width = dicomArray[0].width;
    data.height = dicomArray[0].height;
    data.depth = dicomArray.length;
    data.shape = [data.height, data.width, data.depth]

    var pixelSpacing = dicomArray[0].header.pixelSpacing;
    if(pixelSpacing !== undefined) {
        pixelSpacing = pixelSpacing.split('\\');
        data.dx = parseFloat(pixelSpacing[0]);
        data.dy = parseFloat(pixelSpacing[1]);
    }		
    data.dz = parseFloat(dicomArray[0].header.sliceThickness);
    data.dz = parseFloat(data.dz.toFixed(4));


    data.pixelArray = [];
    for(var i = 0; i < dicomArray.length; i++) { 
        data.pixelArray.push(dicomArray[i].pixelArray);
    }
    
    // Process data into numjs 3d array
    /*
    data.pixelData = nj.zeros(data.shape);
    for(var h = 0; h < data.shape[0]; h++) {
        for(var w = 0; w < data.shape[1]; w++) {
            for(var d = 0; d < data.shape[2]; d++) {
                let value = data.pixelArray[d][h * data.width + w];
                data.pixelData.set(h,w,d,value);
            }
        }
    }
    */

    //data.pixelData = nj.array(data.pixelArray).reshape(data.height, data.width, data.depth);
    return data;
}

/** Reads dicom header data from single dicom file */
const readDicomFile = (event) => {
    var frame = 0;
    var arrayBuffer = event.target.result;
    var byteArray = new Uint8Array(arrayBuffer);
    var dataSet = parseDicom(byteArray);

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
        bitsStored: 'x00280101',

        // Image Plane Module
        pixelSpacing: 'x00280030',		
        imageOrientation: 'x00200037',							
        imagePosition: 'x00200032',
        sliceThickness: 'x00180050',
        sliceLocation: 'x00201041',

        // Transfer Syntax
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

    var pixelFormat = getPixelFormat(dataSet);
    var bytesPerPixel = getBytesPerPixel(pixelFormat);
    var frameOffset = pixelDataOffset + frame * numPixels * bytesPerPixel;
    if(frameOffset >= dataSet.byteArray.length) {
      throw 'frame exceeds size of pixelData';
    }
    if(frameOffset + numPixels > dataSet.byteArray.length) {
        console.log('Error: Invalid File Format, Uses compressed data.');
    }
    
    // View array buffer as uint16 typed array, convert to normal array 
    var pixelArray = new Uint16Array(dataSet.byteArray.buffer, frameOffset, numPixels);   
    pixelArray = [...pixelArray];

    // Convert normal array to NdArray (numjs) 
    var pixelData = nj.array(pixelArray).reshape(rows, columns);

    return { header:header, width:columns, height:rows, depth:1, pixelArray:pixelArray, pixelData:pixelData }
}

const getPixelFormat = (dataSet) => {
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

const getBytesPerPixel = (pixelFormat) => {
    if(pixelFormat ===1) {
      return 1;
    }
    else if(pixelFormat ===2 || pixelFormat ===3) {
      return 2;
    }
    throw "unknown pixel format";
}

export const readBinary = () => {
    console.log("WARNING: TO BE IMPLEMENTED.")
}

export default FileData; 