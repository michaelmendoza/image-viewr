import React, { useState, useContext } from 'react';
import { AppContext } from '../contexts/AppContext';
import FileData, { toImageURL } from '../modules/data/FileData';
import img from '../assets/sheep-logan-phantom.png';

const FileLoader = (props) => {

    const { setFile } = useContext(AppContext);

    const handleFileInput = (event) => {
        var file = event.target.files[0];
        var reader = new FileReader();
        reader.onload = function(e) {
          setFile(e.target.result);
        }; 
        reader.readAsDataURL(file);
      }
      
      const handlePreview = (event) => {         
        var file = new FileData(event.target.files);
        file.read().then(() => {
            var data = file.data;
            var max = data.pixelData.max();
            var mean = data.pixelData.mean();
            var std = data.pixelData.std();
            console.log('shape:', data.pixelData.shape, 'max:', max, 'mean:', mean, 'std:', std);
            var scaled = data.pixelData.divide(max).multiply(255);
            setFile(file);
        })
    }
    
    const handleImageInput = (event) => {   
        props.handleClose();

        var file = new FileData(event.target.files);
        file.read().then(() => {
            setFile(file);
        })
    }
    
    return (
        <div className="file-loader" >  
          <div className="file-loader-picture">
            <img  src={img}></img>
          </div>
         
          <div className="file-loader-button">
            <input type="file" id="file" onChange={handleImageInput} multiple/>
            <label htmlFor="file"> Upload File </label>
          </div>
          
           <div className="file-loader-note"> 
            <label> Note: Dicom, png, jpeg files supported</label> 
          </div>
        </div>
      );
}

export default FileLoader;