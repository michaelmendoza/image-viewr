import React, { useContext, useEffect } from 'react';
import { AppContext } from  '../contexts/AppContext';
import { SliceType } from '../modules/data/Voxel';
import Viewport from './Viewport';

// <Viewport3D></Viewport3D>

const Viewports = () => {
    const { state } = useContext(AppContext);

    useEffect( () => {
        console.log('File Update', state.file);
    }, [state.file])
    
    return (
       <div className="viewports">
           <div className="layout-row flex">
              <Viewport view={SliceType.XY} file={state.file} multislice={false}/>
              <Viewport view={SliceType.XZ} file={state.file} multislice={false}/>
            </div>
            <div className="layout-row flex">
              <Viewport view={SliceType.YZ} file={state.file} multislice={false}/>
              <Viewport view={SliceType.XY} file={state.file} multislice={true}/>
            </div>
       </div> 
    )
}

export default Viewports;
