import React, { useEffect, useRef, useState } from 'react';
import Layer from './Layer';
import { SliceType } from '../modules/data/Voxel';
import LayerTargetLines from './LayerTargetLines';

const Viewport = (props) => {
    const ref = useRef();
    const [ idx, setIdx ] = useState(0);
    
    useEffect(() => {
        ref.current.addEventListener('wheel', handleMouseWheel, { passive: false })
    }, [])

    const handleMouseDown = () => {
        setIdx( idx + 1 );
        console.log("Debug:MouseDown", idx);
    }

    const handleMouseMove = () => {
        console.log("Debug:MouseMove");
    }

    const handleMouseWheel = () => {
        event.stopPropagation();
		event.preventDefault();

        setIdx( (idx) => { 
            var indexMove = Math.round(event.wheelDelta / 20.0);
            var newIndex = Math.min(idx + indexMove, getMaxIndex());
            newIndex = Math.max(newIndex, 0);
            console.log("Debug:MouseWheel", idx); 
            return newIndex; 
        })
    }
    
    const getMaxIndex = () => {
        if(props.file == null)
            return 640;
        // TODO: Make not hard coded     

        var maxIndex = 0;
        if(props.view == SliceType.XY)
            maxIndex = props.file.data.depth;
        if(props.view == SliceType.XZ)
            maxIndex = props.file.data.height;
        if(props.view == SliceType.YZ)
            maxIndex = props.file.data.width;
        return maxIndex;
    }
    
    const getViewBoxDims = () => {
        let invalidData = props.file == null || props.file.data == null || props.file.data === undefined;
        
        if(!invalidData) {
            let width = props.file.data.width;
            let height = props.file.data.height;
            if(props.multislice)
                width = width * 3;
                
            return { width:width, height:height};
        }
        else {
            return { width:100, height:100};
        }
    }

    const getViewBox = () => {
        const { width, height } = getViewBoxDims();
        return `0 0 ${width} ${height}`;
    }
    
    return (
        <div className="viewport flex-50" ref={ref} onMouseDown={handleMouseDown} onMouseMove={handleMouseMove}>  
            <svg width="100%" height="100%" viewBox={getViewBox()} preserveAspectRatio="xMidYMid meet">
                <Layer file={props.file} viewbox={getViewBoxDims()} view={props.view} multislice={props.multislice} idx={idx}></Layer>
                <LayerTargetLines viewbox={getViewBoxDims()} view={props.view}></LayerTargetLines>
            </svg>
        </div>
    );
}

export default Viewport;