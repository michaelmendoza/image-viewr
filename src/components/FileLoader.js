import React, { useState, useContext } from 'react';
import { AppContext } from '../contexts/AppContext';
import FileData, { toImageURL } from '../modules/data/FileData';
import nj from 'numjs';

const FileLoader = () => {

    const { setFile } = useContext(AppContext);
    const [src, setSrc] = useState('https://picsum.photos/200/200');

    const handleFileInput = (event) => {
        var file = event.target.files[0];
        var reader = new FileReader();
        reader.onload = function(e) {
          setSrc(e.target.result);
          setFile(e.target.result);
        }; 
        reader.readAsDataURL(file);
      }
    
    const handleImageInput = (event) => {
        var file = new FileData(event.target.files, 
            (data) => { 
                var max = data.pixelData.max();
                var mean = data.pixelData.mean();
                var std = data.pixelData.std();
                console.log('shape:', data.pixelData.shape, 'max:', max, 'mean:', mean, 'std:', std);
                setSrc(toImageURL(data.pixelData)); 
            }
        ); 
    }
    
    return (
        <div className="file-loader" >  
        <input type="file" onChange={handleImageInput} />
        <img src={src}/>
        </div>
      );

}

export default FileLoader;