import React from 'react';
import ThresholdPanel from '../viewer/threshold-panel.jsx';
import Viewer from '../viewer/viewer.jsx';
import ViewerFilePanel from '../viewer/viewer-file-panel.jsx';
import ViewerInfoPanel from '../viewer/viewer-info-panel.jsx';
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
			'layers' : <ViewerInfoPanel></ViewerInfoPanel>,
			'threshold' : <ThresholdPanel></ThresholdPanel>
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
