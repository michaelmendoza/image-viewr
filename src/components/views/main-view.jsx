import ImageNodes from '../viewer/image-nodes.jsx';
import React from 'react';
import ThresholdPanel from '../viewer/threshold-panel.jsx';
import Viewer from '../viewer/viewer.jsx';
import ViewerFilePanel from '../viewer/viewer-file-panel.jsx';
import ViewerInfoPanel from '../viewer/viewer-info-panel.jsx';
import ViewerLayersPanel from '../viewer/viewer-layers-panel.jsx';
import ViewerStatsPanel from '../viewer/viewer-stats-panel.jsx';
import UIStateStore from '../store/ui-state-store.js';

class MainView extends React.Component {

	componentDidMount() {
		UIStateStore.on('state-update', () => { 
			this.setState({});
		})
	}

	render() {
		var state = UIStateStore.getState();
		var states = {
			'default' : null,
			'file' : <ViewerFilePanel></ViewerFilePanel>,
			'stats': <ViewerStatsPanel></ViewerStatsPanel>,
			'image-layers': <ViewerLayersPanel></ViewerLayersPanel>,
			'layers' : <ViewerInfoPanel></ViewerInfoPanel>,
			'threshold' : <ThresholdPanel></ThresholdPanel>,
			'image-node' : <ImageNodes></ImageNodes>
		}
		var element = states[state];

		return (
			<section className='main-view layout-row'>
				{ element }
				<Viewer uistate={state}></Viewer>
			</section>
		);
	}
}

export default MainView;
