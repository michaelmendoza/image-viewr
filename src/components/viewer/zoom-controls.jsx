import React from 'react';
import ViewerStore from '../store/viewer-store.js';

const ZOOM_STEP = 0.1;

class ZoomControls extends React.Component {

	constructor() {
		super();
		this.state = { zoomStep:10.0, zoomMin:1, zoomMax:40 };
	}

	componentDidMount() { 
		ViewerStore.Viewr.on('zoom-update', () => {
			var zoom = ViewerStore.getZoom(); 
			var zoomStep = zoom / ZOOM_STEP
			this.setState({ zoomStep:zoomStep });
		}) 
	}

	handleZoomReset() { ViewerStore.zoomReset(); }
	
	handleZoomIn() { ViewerStore.zoomIn(); }

	handleZoomOut() { ViewerStore.zoomOut(); }

	handleZoomChange( event ) {
		this.setState({ zoomStep: event.target.value });
		var zoomValue = this.state.zoomStep * ZOOM_STEP; 
		ViewerStore.setZoom(zoomValue);
	};

	render() {
		return (
			<div className='zoom-controls'>
				<button className='icon-button' onClick={this.handleZoomReset}> <i className='material-icons'>location_searching</i> </button>
				<button className='icon-button' onClick={this.handleZoomOut}> <i className='material-icons'>zoom_out</i> </button>						
				<span className='zoom-slider'>
					<input type="range" name="zoom" value={this.state.zoomStep} min={this.state.zoomMin} max={this.state.zoomMax} onChange={this.handleZoomChange.bind(this)} />
				</span>
				<button className='icon-button' onClick={this.handleZoomIn}> <i className='material-icons'>zoom_in</i> </button>
			</div>
		)
	}

}

export default ZoomControls;
