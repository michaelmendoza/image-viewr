import nj from 'numjs';

export const SliceType = {
    XY:'xy',
    XZ:'xz',
    YZ:'yz'
}

export const ContrastType = {
    MINMAX:'minmax',
    AUTO:'auto',
    WINDOW:'window',
    NONE:'none'
}

export const slice = (data, sliceType, index) => {
    index = Math.max(index, 0);

    let shape = data.shape;
    if(sliceType == SliceType.XY) { // XY slice, index by z
        shape = [shape[0], shape[1]];
        index = Math.min(index, data.shape[2]-1);
    }
    if(sliceType == SliceType.XZ) { // XZ slice, index by y
        shape = [shape[0], shape[2]]
        index = Math.min(index, data.shape[1]-1);
    }
    if(sliceType == SliceType.YZ) {  // YZ slice, index by x
        shape = [shape[1], shape[2]]
        index = Math.min(index, data.shape[0]-1);
    }
    
    var copyData = nj.zeros(shape);
    for(var h = 0; h < shape[0]; h++) {
        for(var w = 0; w < shape[1]; w++) {
            if(sliceType == SliceType.XY)
                copyData.set(h, w, data.pixelArray[index][h * data.width + w]); // copyData.set(h, w, pixelData.get(h, w, index));
            else if(sliceType == SliceType.XZ)
                copyData.set(h, w, data.pixelArray[w][index * data.width + h]); // copyData.set(h, w, pixelData.get(h, index, w));
            else if(sliceType == SliceType.YZ)
                copyData.set(h, w, data.pixelArray[w][h * data.width + index]); // copyData.set(h, w, pixelData.get(index, h, w));
        }
    }
    
    //return sliceData.reshape(shape[0],shape[1]);
    return copyData;
}

export const multiSlice = (data, sliceType, index) => {
    index = Math.max(index, 0);

    var nSlices = 3;
    let shape = data.shape;
    if(sliceType == SliceType.XY) { // XY slice, index by z
        shape = [shape[0], nSlices * shape[1]];
        index = Math.min(index, data.shape[2]-1);
    }
    if(sliceType == SliceType.XZ) { // XZ slice, index by y
        shape = [shape[0], nSlices * shape[2]]
        index = Math.min(index, data.shape[1]-1);
    }
    if(sliceType == SliceType.YZ) {  // YZ slice, index by x
        shape = [shape[1], nSlices * shape[2]]
        index = Math.min(index, data.shape[0]-1);
    }

    var copyData = nj.zeros(shape);
    for(var m = 0; m < nSlices; m++) {
        for(var h = 0; h < shape[0]; h++) {
            for(var w = 0; w < shape[1]; w++) {
                var idx = index + m;

                if(sliceType == SliceType.XY)
                    copyData.set(h, w + m * shape[1], data.pixelArray[idx][h * data.width + w]); // copyData.set(h, w, pixelData.get(h, w, index));
                else if(sliceType == SliceType.XZ)
                    copyData.set(h, w + m * shape[1], data.pixelArray[w][idx * data.width + h]); // copyData.set(h, w, pixelData.get(h, index, w));
                else if(sliceType == SliceType.YZ)
                    copyData.set(h, w + m * shape[1], data.pixelArray[w][h * data.width + idx]); // copyData.set(h, w, pixelData.get(index, h, w));
            }
        }
    }

    return copyData;
}

const canvas = document.createElement('canvas');

export const toImageURL = (pixelData, aspectAdjustment = 1.0, contrastType = ContrastType.MINMAX) => { 
    var scaledData = null;
    if(contrastType == ContrastType.MINMAX)
        scaledData = pixelData.divide(pixelData.max()).multiply(255);
    else
        scaledData = pixelData;
        
    canvas.width = pixelData.shape[1] * aspectAdjustment;
    canvas.height = pixelData.shape[0];
    nj.images.save(scaledData, canvas);
    return canvas.toDataURL();
}

export const sliceToImageURL = (data, sliceType, index, contrastType = ContrastType.MINMAX) => {
    var sliceData = slice(data, sliceType, index);
    
    var aspectAdjustment;
    if(sliceType == SliceType.XY) { 
        aspectAdjustment = data.dx / data.dy;
    }
    if(sliceType == SliceType.XZ) { 
       aspectAdjustment = data.dz / data.dx;
    }
    if(sliceType == SliceType.YZ) {  
        aspectAdjustment = data.dz / data.dy;
    }

    return toImageURL(sliceData, aspectAdjustment, contrastType);
}

export const multiSliceToImageURL = (data, sliceType, index, contrastType = ContrastType.MINMAX) => {
    var sliceData = multiSlice(data, sliceType, index);
    return toImageURL(sliceData, 1.0, contrastType);
}

class Voxel {

}

export default Voxel;
