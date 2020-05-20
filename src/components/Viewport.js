import React, { useContext, useEffect, useRef } from 'react';
import { AppContext } from '../contexts/AppContext';
import Layer from './Layer';

const Viewport = (props) => {
    const { file } = useContext(AppContext);
    const ref = useRef();

    const getViewBox = () => {
        let invalidData = file == null || file.data == null || file.data === undefined;
        
        if(!invalidData) {
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
                <Layer file={file} view={props.view} idx={10}></Layer>
            </svg>
            
        </div>
    );
}

export default Viewport;