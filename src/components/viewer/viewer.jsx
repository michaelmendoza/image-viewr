import React from 'react';
import ViewerControls from './viewer-controls.jsx';
import ViewerStore from '../store/viewer-store.js';
import ViewStateStore from '../store/view-state-store.js';

class Viewer extends React.Component {

	constructor(props) {
		super(props);
		this.state = { autozoom: false };
	}

	componentDidMount() {
		var info = this.getViewerInfo();
		ViewerStore.setupViewer(info);

		ViewerStore.Viewr.on('canvas-update', () => { 
			this.setState({});
		})

		ViewerStore.Viewr.on('view-update', () => { 
			this.setState({ autozoom: true });

			var mode = ViewerStore.getViewMode();
			var modes = ViewerStore.getViewModes();
			if(mode == modes._3DVol)
				ViewerStore.setupVolumeRenderer('volume-renderer');
		})
		
		ViewStateStore.on('update', () => {
			this.setState({ autozoom: true });
		})

		window.addEventListener('resize', function(event) {
		  ViewerStore.setViewportSize();
		  ViewerStore.autoZoomResize();	
		}.bind(this));
	}
	
	componentDidUpdate() {
		ViewerStore.setViewportSize();
		
		if(this.state.autozoom) {
			ViewerStore.autoZoomResize();
			this.setState({ autozoom: false });		
		}
	}

	getViewerInfo() {
		return [
			{ id:'image-viewer', ref:this.refs.Viewer },
			{ id:'image-viewer2', ref:this.refs.Viewer2 },
			{ id:'image-viewer3', ref:this.refs.Viewer3 }
		];
	}

	viewModeClass() {
		var mode = ViewerStore.getViewMode();
		var modes = ViewerStore.getViewModes();
		return (mode == modes._3D) ? '' : (mode == modes._3DVol) ? 'volume-view' : '';
	}

	render() {
		var viewClass = this.viewModeClass();
		var viewerClass = ViewStateStore.getViewerClass();
		var paneClasses = ViewStateStore.getViewerPaneClassArray();

		return ( 
			<div className='viewer-container'>
				<ViewerControls></ViewerControls>

				<section className={'viewer ' + this.props.uistate}> 
					<div className={'viewer-primary ' + viewerClass + " " + viewClass}>
						<div className={'viewer-pane ' + paneClasses[0]} id='image-viewer' ref='Viewer'> </div>
						<div className={'viewer-pane ' + paneClasses[1]} id='image-viewer2' ref='Viewer2'> </div>
						<div className={'viewer-pane ' + paneClasses[2]} id='image-viewer3' ref='Viewer3'> </div>
					</div>
					
					<div className={'viewer-volume-renderer ' + viewClass} id="volume-renderer">
						<div>Transfer </div>
						<img id="transferFunctionImg" />
					</div>

				</section>

			</div>
		);
	}
}

export default Viewer;
