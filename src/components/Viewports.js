import React, { useContext, useEffect } from 'react';
import { AppContext } from  '../contexts/AppContext';
import { SliceType } from '../modules/data/Voxel';
import Viewport from './Viewport';

const Viewports = () => {
    const { file } = useContext(AppContext);

    useEffect( () => {
        console.log('File Update', file);
    }, [file])
    
    return (
       <div className="viewports">
           <div className="layout-row flex">
              <Viewport view={SliceType.XY} file={file}/>
              <Viewport view={SliceType.XZ} file={file}/>
            </div>
            <div className="layout-row flex">
              <Viewport view={SliceType.YZ} file={file}/>
              <Viewport view={SliceType.XY} file={file}/>
            </div>
       </div> 
    )
}

export default Viewports;
