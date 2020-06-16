import React from 'react';
import { SliceType } from '../modules/data/Voxel';

const LayerTargetLines = (props) => {

    let green = "#00ae2e";
    let red = "#e61912";
    let yellow = "#d2c72d";

    let colorX, colorY;
    if(props.view == SliceType.XY) {
       colorX = green;
       colorY = yellow;
    }
    if(props.view == SliceType.XZ){
       colorX = green;
       colorY = red;
    }
    if(props.view == SliceType.YZ) {
       colorX = yellow;
       colorY = red;
    }

    let width = props.viewbox.width;
    let height = props.viewbox.height;
    let dim = ( width < height ) ? width : height;
    let stroke = ( dim / 100 ) * 0.5;
    
    return (
        <g className="layer-target">
          <line x1="-10000" y1={(height / 2).toString()} x2="10000" y2={(height / 2).toString()} stroke={colorX} opacity="80%" strokeWidth={stroke}/>
          <line x1={(width / 2).toString()} y1="-10000" x2={(width / 2).toString()} y2="10000" stroke={colorY} opacity="80%" strokeWidth={stroke}/>
        </g>
    );
}

export default LayerTargetLines;
