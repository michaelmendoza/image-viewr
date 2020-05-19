import React, { useState, useRef } from 'react';

const Layer = (props) => {
    const ref = useRef();

    const file = props.file;
    const src = file === null ? "" : file.toImageURL();

    return (
        <g className="layer" ref={ref}>
           { file === null ? <image/> : <image href={src} width={file.width} height={file.height}/> }
        </g>
    );
}

export default Layer;
