import React from 'react';
import ReactDOM from 'react-dom';

import ViewerStore from '../store/viewer-store.js';

class Viewer extends React.Component {

	constructor() {
		super();
		this.state = { canvas:null };
	}

	componentDidMount() {
		var width = this.refs.Viewer.offsetWidth;
		var height = this.refs.Viewer.offsetHeight;
		ViewerStore.setupViewer(width, height);
		ViewerStore.loadImage('../src/assets/image.png');
	 	var element = document.getElementById("image-viewer");
	 	var canvas = ViewerStore.getCanvas().canvas;
		element.appendChild(canvas);
	}

	handleSelectPanMode() {
		ViewerStore.selectPanMode();
	}

	handleZoomIn() {
		ViewerStore.zoomIn();
	}

	handleZoomOut() {
		ViewerStore.zoomOut();
	}

	handleZoomReset() {
		ViewerStore.zoomReset();
	}

	render() {
		var canvas = this.state.canvas;

		return (
			<div className='viewer-container'>
				<div className='viewer-header layout-row' > 
					<div className='icons-left flex'> 
						<button className='icon-button' onClick={this.handleSelectPanMode}> <i className='material-icons'>pan_tool</i> </button>
					</div>
					<div className='icons-right flex'>
						<button className='icon-button' onClick={this.handleZoomReset}> <i className='material-icons'>location_searching</i> </button>
						<button className='icon-button' onClick={this.handleZoomIn}> <i className='material-icons'>zoom_in</i> </button>
						<button className='icon-button' onClick={this.handleZoomOut}> <i className='material-icons'>zoom_out</i> </button>
					</div>
				</div>
				<div className='viewer' id='image-viewer' ref='Viewer'> </div>
			</div>
		);
	}
}

export default Viewer;
