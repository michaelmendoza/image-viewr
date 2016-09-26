import React from 'react';
import ViewerStore from '../store/viewer-store.js';
import CanvasModes from '../../modules/canvas-modes.js'

class ViewerInfoPanel extends React.Component {

	constructor() {
		super();
		this.state = { pixel:{x:'-', y:'-', value:'-'} };

		ViewerStore.on('mousemove', () => {
			var data = ViewerStore.getCanvasMousePixel();
			this.setState({ pixel:data });
		})

		ViewerStore.on('canvasmode', () => {
			this.setState({});
		})

	}

	render() {
		var pixel = 'x: ' + this.state.pixel.x + 
								' y: ' + this.state.pixel.y + 
								' data: ' + this.state.pixel.value;

		var canvasMode = ViewerStore.getCanvasMode(); 
		console.log('--', canvasMode );
		var activePixel = canvasMode == CanvasModes.PIXEL ? 'active' : '';
		var activeROI = (canvasMode == CanvasModes.ROI || canvasMode == CanvasModes.ROI_UPDATE_POSITION || canvasMode == CanvasModes.ROI_UPDATE_RADIUS) ? 'active' : '';
		var activeThreshold = canvasMode == CanvasModes.THRESHOLD ? 'active' : '';

		var selectPixel = ViewerStore.setCanvasMode.bind(ViewerStore, CanvasModes.PIXEL);
		var selectROI = ViewerStore.setCanvasMode.bind(ViewerStore, CanvasModes.ROI);
		var selectThreshold = ViewerStore.setCanvasMode.bind(ViewerStore, CanvasModes.THRESHOLD);

		return (
			<section className='viewer-info-panel'>  
				<ul>
					<li className={activePixel} 		onClick={selectPixel}> Pixel </li>
					<li className={activeROI} 			onClick={selectROI}> ROI </li>
					<li className={activeThreshold} onClick={selectThreshold}> Threshold </li>
				</ul>
				<div>{pixel}</div>
			</section>
		);
	}
}

export default ViewerInfoPanel;