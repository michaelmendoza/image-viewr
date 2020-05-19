import React, { useContext, useEffect, useRef } from 'react';
import { AppContext } from '../contexts/AppContext';
import Layer from '../modules/layers/Layer';

const Viewport = () => {
    const { file } = useContext(AppContext);
    const ref = useRef();

    useEffect( () => {
        console.log('File Update');
    }, [file])

    return (
        <div className="viewport" >  
            <svg ref={ref}>
                <Layer file={file}></Layer>
            </svg>
            
        </div>
    );
}

export default Viewport;