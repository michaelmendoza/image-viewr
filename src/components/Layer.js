import React, { useState, useRef } from 'react';
import { toImageURL, sliceToImageURL } from '../modules/data/Voxel';

const Layer = (props) => {
    const ref = useRef();

    const file = props.file;
    //const src = file === null ? "" : toImageURL(file.data.pixelData);
    const getSrc = () => {
        if(file == null) 
            return "";
        else if(file.data.depth == 1)
            return toImageURL(file.data.pixelData);
        else 
            return sliceToImageURL(file.data, props.view, props.idx);
    }

    return (
        <g className="layer" ref={ref}>
           { file === null ? <image/> : <image href={getSrc()} 
                                                x="0" y="0"
                                                height={file.data.height.toString()} 
                                                width={file.data.width.toString()}/> }
        </g>
    );
}

export default Layer;
