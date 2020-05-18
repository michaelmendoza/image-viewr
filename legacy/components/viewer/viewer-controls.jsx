import React from 'react';
import ViewerStore from '../store/viewer-store.js';
import ViewStateStore from '../store/view-state-store.js';
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
		ViewerStore.Viewr.on('view-update', () => {
			if(ViewerStore.is2DView()) ViewStateStore.setTo2D();
			if(ViewerStore.is3DView()) ViewStateStore.setTo3D();
			this.setState({});
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

	handleTogglePane() {
		ViewStateStore.togglePane(this);
	}

	handleVerticalView() {
		ViewStateStore.setVertical();
	}

	handleHorizontalView() {
		ViewStateStore.setHorizontal();
	}

	getActiveClass(button) {
		var mode = this.state.canvasMode;
		var modes = ViewerStore.getCanvasModes();
		var buttonDict = {
			'contrast': () => { return mode == modes.CONTRAST ?  'active' : ''; },
			'zoom': () => { return mode == modes.ZOOM || mode == modes.ZOOM_UPDATE ? 'active' : ''; },
			'pan': () => { return mode == modes.PAN || mode == modes.PAN_UPDATE ? 'active' : ''; },
			'roi': () => { return mode == modes.ROI || mode == modes.ROI_UPDATE_POSITION || mode == modes.ROI_UPDATE_RADIUS ? 'active' : ''; },
			'croi': () => { return mode == modes.CUSTOM_ROI || mode == modes.CUSTOM_ROI_ADD_POINT || mode == modes.CUSTOM_ROI_UPDATE_POINT || mode == modes.CUSTOM_ROI_UPDATE_POSITION ? 'active' : ''; },
			'volume': () => { this.is3DVolView() ? 'active' : ''; }
		}
		
		return buttonDict[button]();
	}

	render() {
		var modes = ViewerStore.getCanvasModes();
		var view = ViewStateStore;
		var showControlsClass = ViewerStore.is3DView() ? '' : 'hidden';
		var volumeViewButton = <button className={'icon-button ' + this.getActiveClass('volume')} onClick={this.handleSelectVolumeView}> <i className='material-icons'>landscape</i> </button> 

		return ( 
			<section className='viewer-header layout-row' > 
				<div className='icons-left flex'> 
					<button className={'icon-button contrast ' + this.getActiveClass('contrast')} onClick={this.handleModeSelect.bind(modes.CONTRAST)}>    <i className='material-icons'>tonality</i> </button>
					<button className={'icon-button zoom '     + this.getActiveClass('zoom')}     onClick={this.handleModeSelect.bind(modes.ZOOM)}>        <i className='material-icons'>search</i> </button>
					<button className={'icon-button pan '      + this.getActiveClass('pan')}      onClick={this.handleModeSelect.bind(modes.PAN)}>         <i className='material-icons'>pan_tool</i> </button>
					<button className={'icon-button '          + this.getActiveClass('roi')}      onClick={this.handleModeSelect.bind(modes.ROI)}>         <i className='material-icons'>bubble_chart</i> </button>																		
					<button className={'icon-button edit '     + this.getActiveClass('croi')}     onClick={this.handleModeSelect.bind(modes.CUSTOM_ROI)} > <i className='material-icons'>edit_mode</i> </button>
				</div> 

				<div className={'icons-center flex ' + showControlsClass}>
					<button className={'toggle-button ' + view.getToggleClass(0)} onClick={this.handleTogglePane.bind(0)}> <i className='material-icons'>filter_1</i> </button>
					<button className={'toggle-button ' + view.getToggleClass(1)} onClick={this.handleTogglePane.bind(1)}> <i className='material-icons'>filter_2</i> </button>
					<button className={'toggle-button ' + view.getToggleClass(2)} onClick={this.handleTogglePane.bind(2)}> <i className='material-icons'>filter_3</i> </button>
					<button className={'toggle-button ' + view.getHorizontalClass()} onClick={this.handleHorizontalView}> <i className='material-icons'>view_week</i> </button>
					<button className={'toggle-button rotate ' + view.getVerticalClass()} onClick={this.handleVerticalView}> <i className='material-icons'>view_week</i> </button>
				</div>	

				<div className='icons-right flex'>
					<ZoomControls></ZoomControls>
				</div>
			</section> 
		);
	}
}

export default Viewer;
