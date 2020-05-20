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
    //let sliceData = null;
    let shape = data.shape;
    if(sliceType == SliceType.XY) { // XY slice, index by z
        //sliceData = pixelData.slice(null, null, [index,index+1]);
        shape = [shape[0], shape[1]];
    }
    if(sliceType == SliceType.XZ) { // XZ slice, index by y
        //sliceData = pixelData.slice(null, [index,index+1], null);
        shape = [shape[0], shape[2]]
    }
    if(sliceType == SliceType.YZ) {  // YZ slice, index by x
        //sliceData = pixelData.slice([index,index+1], null, null);
        shape = [shape[1], shape[2]]
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

export const toImageURL = (pixelData, contrastType = ContrastType.MINMAX) => { 
    var scaledData = null;
    if(contrastType == ContrastType.MINMAX)
        scaledData = pixelData.divide(pixelData.max()).multiply(255);
    else
        scaledData = pixelData;
    
    var canvas = document.createElement('canvas');
    canvas.width = pixelData.shape[1];
    canvas.height = pixelData.shape[0];
    console.log(canvas.width, canvas.height);
    nj.images.save(scaledData, canvas);
    return canvas.toDataURL();
}

export const sliceToImageURL = (pixelData, sliceType, index, contrastType = ContrastType.MINMAX) => {
    var sliceData = slice(pixelData, sliceType, index);
    console.log(sliceData.shape);
    return toImageURL(sliceData, contrastType);
}

class Voxel {

}

export default Voxel;
