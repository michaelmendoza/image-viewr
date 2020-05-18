import React, { useContext, useEffect } from 'react';
import { AppContext } from '../contexts/AppContext';

const Viewport = () => {
    const { file } = useContext(AppContext);

    useEffect( () => {
        console.log('File Update');
    }, [file])

    return (
        <div className="viewport" >  
            Viewport
            {file}
        
        </div>
      );

}

export default Viewport;