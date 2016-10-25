import React from 'react';
import Viewer from '../viewer/viewer.jsx';
import ViewerFilePanel from '../viewer/viewer-file-panel.jsx';
import ViewerInfoPanel from '../viewer/viewer-info-panel.jsx';

class MainView extends React.Component {

	render() {
		return (
			<section className='main-view' >
				<ViewerFilePanel></ViewerFilePanel>
				<Viewer></Viewer>
				<ViewerInfoPanel></ViewerInfoPanel>
			</section>
		);
	}
}

export default MainView;
