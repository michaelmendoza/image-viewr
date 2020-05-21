import React, { useState, useRef } from 'react';
import { toImageURL, sliceToImageURL, multiSliceToImageURL } from '../modules/data/Voxel';

const Layer = (props) => {
    const ref = useRef();

    const file = props.file;
    //const src = file === null ? "" : toImageURL(file.data.pixelData);
    const getSrc = () => {
        if(file == null) 
            return "";
        else if(file.data.depth == 1)
            return toImageURL(file.data.pixelData);
        else if(props.multislice)
            return  multiSliceToImageURL(file.data, props.view, props.idx);
        else 
            return sliceToImageURL(file.data, props.view, props.idx);
    }

    const getHeight = () => {
        return file.data.height.toString();
    }

    const getWidth = () => {
        if(props.multislice == true)
            return (3 * file.data.width).toString();
        else
            return file.data.width.toString();
    }

    return (
        <g className="layer" ref={ref}>
           { file === null ? <image/> : <image href={getSrc()}  x="0" y="0" height={getHeight()} width={getWidth()}/> }
        </g>
    );
}

export default Layer;
