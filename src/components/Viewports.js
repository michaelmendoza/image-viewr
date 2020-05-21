import React, { useContext, useEffect } from 'react';
import { AppContext } from  '../contexts/AppContext';
import { SliceType } from '../modules/data/Voxel';
import Viewport from './Viewport';
import Viewport3D from './Viewport3D';

// <Viewport3D></Viewport3D>

const Viewports = () => {
    const { file } = useContext(AppContext);

    useEffect( () => {
        console.log('File Update', file);
    }, [file])

    return (
       <div className="viewports">
           <div className="layout-row flex">
              <Viewport view={SliceType.XY} file={file} multislice={false}/>
              <Viewport view={SliceType.XZ} file={file} multislice={false}/>
            </div>
            <div className="layout-row flex">
              <Viewport view={SliceType.YZ} file={file} multislice={false}/>
              <Viewport view={SliceType.XY} file={file} multislice={true}/>
            </div>
       </div> 
    )
}

export default Viewports;
