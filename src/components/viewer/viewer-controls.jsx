import React from 'react';
import ViewerStore from '../store/viewer-store.js';
import ZoomControls from './zoom-controls.jsx';

class Viewer extends React.Component {

	constructor() {
		super();
		this.state = { canvasMode:ViewerStore.getCanvasMode() };
	}

	componentDidMount() { 
		ViewerStore.Viewr.on('canvas-update', () => {
			this.setState({ canvasMode:ViewerStore.getCanvasMode() });
		})
	}

	handleModeSelect() { ViewerStore.setCanvasMode(this); }

	handleSelectVolumeView() {
		var mode = ViewerStore.getViewMode();
		var modes = ViewerStore.getViewModes();
		if(mode == modes._3D)
			ViewerStore.setViewMode(modes._3DVol);
		else
			ViewerStore.setViewMode(modes._3D);
	}

	is3DVolView() {
		var mode = ViewerStore.getViewMode();
		var modes = ViewerStore.getViewModes();
		return mode == modes._3DVol;
	}
	
	handleAlphaChange() {
		this.setState({ alphaFactor: event.target.value });
		ViewerStore.updateAlphaFactor(event.target.value);
	}

	render() {
		var mode = this.state.canvasMode;
		var modes = ViewerStore.getCanvasModes();
		var pixelButtonClass = mode == modes.PIXEL ? 'active' : '';
		var panButtonClass = mode == modes.PAN || mode == modes.PAN_UPDATE ? 'active' : '';
		var roiButtonClass = mode == modes.ROI || mode == modes.ROI_UPDATE_POSITION || mode == modes.ROI_UPDATE_RADIUS ? 'active' : '';
		var customRoiButtonClass = mode == modes.CUSTOM_ROI || mode == modes.CUSTOM_ROI_ADD_POINT || mode == modes.CUSTOM_ROI_UPDATE_POINT || mode == modes.CUSTOM_ROI_UPDATE_POSITION ? 'active' : '';
		var contrastButtonClass = mode == modes.CONTRAST ? 'active' : '';
		var volumeViewButtonClass = this.is3DVolView() ? 'active' : '';

		var volumeViewButton = <button className={'icon-button ' + volumeViewButtonClass} onClick={this.handleSelectVolumeView}> <i className='material-icons'>landscape</i> </button> 

		return (
			<section className='viewer-header layout-row' > 
				<div className='icons-left flex'> 
					<button className={'icon-button contrast ' + contrastButtonClass} onClick={this.handleModeSelect.bind(modes.CONTRAST)}> <i className='material-icons'>tonality</i> </button>
					<button className={'icon-button pan ' + panButtonClass}        onClick={this.handleModeSelect.bind(modes.PAN)}> <i className='material-icons'>pan_tool</i> </button>
					<button className={'icon-button '     + roiButtonClass}        onClick={this.handleModeSelect.bind(modes.ROI)}> <i className='material-icons'>bubble_chart</i> </button>																		
					<button className={'icon-button edit ' + customRoiButtonClass} onClick={this.handleModeSelect.bind(modes.CUSTOM_ROI)} > <i className='material-icons'>edit_mode</i> </button>
					<button className={'icon-button'}> <i className='material-icons'>filter_1</i> </button>
					<button className={'icon-button'}> <i className='material-icons'>filter_2</i> </button>
					<button className={'icon-button'}> <i className='material-icons'>filter_3</i> </button>
					<button className={'icon-button'}> <i className='material-icons'>view_week</i> </button>
					<button className={'icon-button rotate'}> <i className='material-icons'>view_week</i> </button>

				</div>
				<div className='icons-right flex'>
					<ZoomControls></ZoomControls>
				</div>
			</section> 
		);
	}
}

export default Viewer;
