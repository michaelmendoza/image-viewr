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
		var pixelPanel = <PixelPanel></PixelPanel>
		var roiPanel = <ROIPanel></ROIPanel>

		return (
			<section className='viewer-info-panel'>  
				<section className='panel'>
					{pixelPanel}
				</section>

				<section className='panel info-panel'>
				<h4 className='panel-title'>
					<label> ROI Layers </label>
				</h4>
				
				{ roiPanel }
				</section>
			</section>
		);
	}
}

export default ViewerInfoPanel;