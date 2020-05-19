import React, { useContext, useEffect, useRef } from 'react';
import { AppContext } from '../contexts/AppContext';
import Layer from '../modules/layers/Layer';

const Viewport = () => {
    const { file } = useContext(AppContext);
    const ref = useRef();

    const getViewBox = () => {
        if(file !== null) {
            let width = file.data.width;
            let height = file.data.height;
            return `0 0 ${width} ${height}`;
        }
        else {
            return "0 0 100 100";
        }
    }

    const handleMouseDown = () => {
        console.log("Debug:MouseDown");
    }

    const handleMouseMove = () => {
        console.log("Debug:MouseMove");
    }

    useEffect( () => {
        console.log('File Update');
    }, [file])

    return (
        <div className="viewport flex-50" onMouseDown={handleMouseDown} onMouseMove={handleMouseMove}>  
            <svg width="100%" height="100%" ref={ref} viewBox={getViewBox()} preserveAspectRatio="xMidYMid meet">
                <Layer file={file}></Layer>
            </svg>
            
        </div>
    );
}

export default Viewport;