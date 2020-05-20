import React, { useState, useRef } from 'react';

const Layer = (props) => {
    const ref = useRef();

    const file = props.file;
    const src = file === null ? "" : file.toImageURL();
    
    return (
        <g className="layer" ref={ref}>
           { file === null ? <image/> : <image href={file.toImageURL()} 
                                                x="0" y="0"
                                                height={file.data.height.toString()} 
                                                width={file.data.width.toString()}/> }
        </g>
    );
}

export default Layer;
