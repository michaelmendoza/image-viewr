import React from 'react';
import ViewerStore from '../store/viewer-store.js';
import CanvasModes from '../../modules/canvas-modes.js';
import PixelPanel from './pixel-panel.jsx';
import ROIPanel from './roi-panel.jsx';
import ThresholdPanel from './threshold-panel.jsx';

class ViewerInfoPanel extends React.Component {

	componentDidMount() {
		ViewerStore.on('canvasmode', () => {
			this.setState({});
		})	      
	}

	render() {
		var canvasMode = ViewerStore.getCanvasMode(); 
		var activePixel = canvasMode == CanvasModes.PIXEL ? 'active' : '';
		var activeROI = (canvasMode == CanvasModes.ROI || canvasMode == CanvasModes.ROI_UPDATE_POSITION || canvasMode == CanvasModes.ROI_UPDATE_RADIUS) ? 'active' : '';
		var activeThreshold = canvasMode == CanvasModes.THRESHOLD ? 'active' : '';

		var selectPixel = ViewerStore.setCanvasMode.bind(ViewerStore, CanvasModes.PIXEL);
		var selectROI = ViewerStore.setCanvasMode.bind(ViewerStore, CanvasModes.ROI);
		var selectThreshold = ViewerStore.setCanvasMode.bind(ViewerStore, CanvasModes.THRESHOLD);

		var pixelPanel = <PixelPanel></PixelPanel>
		var roiPanel = <ROIPanel></ROIPanel>
		var thresholdPanel = <ThresholdPanel></ThresholdPanel>

		return (
			<section className='viewer-info-panel'>  
				<ul>
					<li className={activePixel} 		onClick={selectPixel}> Pixel </li>
					<li className={activeROI} 			onClick={selectROI}> ROI </li>
					<li className={activeThreshold} onClick={selectThreshold}> Threshold </li>
				</ul>
				{ activePixel == 'active' ? pixelPanel : null }
				{ activeROI == 'active' ? roiPanel : null }
				{ activeThreshold == 'active' ? thresholdPanel : null }
			</section>
		);
	}
}

export default ViewerInfoPanel;