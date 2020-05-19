import React, { useState, useContext } from 'react';
import { AppContext } from '../contexts/AppContext';
import FileData, { toImageURL } from '../modules/data/FileData';

const FileLoader = () => {

    const { setFile } = useContext(AppContext);
    //const [src, setSrc] = useState('https://picsum.photos/200/200');
    //const [shape, setShape] = useState([200, 200])

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
        var file = new FileData(event.target.files);
        file.read().then(() => {
            var data = file.data;
            var max = data.pixelData.max();
            var mean = data.pixelData.mean();
            var std = data.pixelData.std();
            console.log('shape:', data.pixelData.shape, 'max:', max, 'mean:', mean, 'std:', std);
            var scaled = data.pixelData.divide(max).multiply(255);
            //setSrc(toImageURL(scaled)); 
            //setShape(data.pixelData.shape);
            setFile(file);
        })
    }
    
    //<img src={src} width={shape[1]} height={shape[0]}/>

    return (
        <div className="file-loader" >  
        <input type="file" onChange={handleImageInput} />
        </div>
      );
}

export default FileLoader;