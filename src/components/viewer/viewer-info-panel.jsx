import React from 'react';
import ViewerStore from '../store/viewer-store.js';
import CanvasModes from '../../modules/modes/canvas-modes.js';
import PixelPanel from './pixel-panel.jsx';
import ROIPanel from './roi-panel.jsx';
import ThresholdPanel from './threshold-panel.jsx';

class ViewerInfoPanel extends React.Component {

	componentDidMount() {
		ViewerStore.Viewr.on('canvas-update', () => {
			this.setState({});
		})	      
	}

	render() {
		var mode = ViewerStore.getCanvasMode();

		var options = {
			[CanvasModes.ROI]:'active',
			[CanvasModes.ROI_UPDATE_POSITION]:'active',
			[CanvasModes.ROI_UPDATE_RADIUS]:'active',
			[CanvasModes.CUSTOM_ROI]:'active',
			[CanvasModes.CUSTOM_ROI_ADD_POINT]: 'active',
			[CanvasModes.CUSTOM_ROI_UPDATE_POINT]: 'active',
			[CanvasModes.CUSTOM_ROI_UPDATE_POSITION]: 'active'
		};
		var activeROI = options[mode] || '';
		
		options = {
			[CanvasModes.THRESHOLD]:'active',
			[CanvasModes.THRESHOLD_EYEDROPPER]:'active'
		}
		var activeThreshold = options[mode] || '';

		var selectROI = ViewerStore.setCanvasMode.bind(ViewerStore, CanvasModes.ROI);
		var selectThreshold = ViewerStore.setCanvasMode.bind(ViewerStore, CanvasModes.THRESHOLD);

		var pixelPanel = <PixelPanel></PixelPanel>
		var roiPanel = <ROIPanel></ROIPanel>
		var thresholdPanel = <ThresholdPanel></ThresholdPanel>

		return (
			<section className='viewer-info-panel'>  
				<section className='panel'>
					{pixelPanel}
				</section>

				<section className='panel info-panel'>
				<ul>
					<li className={activeROI} 			onClick={selectROI}> ROI </li>
					<li className={activeThreshold} onClick={selectThreshold}> Threshold </li>
				</ul>
				{ activeROI == 'active' ? roiPanel : null }
				{ activeThreshold == 'active' ? thresholdPanel : null }
				</section>
			</section>
		);
	}
}

export default ViewerInfoPanel;