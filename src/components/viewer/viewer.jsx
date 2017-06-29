import React from 'react';
import ViewerControls from './viewer-controls.jsx';
import ViewerStore from '../store/viewer-store.js';

class Viewer extends React.Component {

	componentDidMount() {
		var info = this.getViewerInfo();
		ViewerStore.setupViewer(info);

		ViewerStore.on('canvasmode', () => { 
			this.setState({});

			var mode = ViewerStore.getViewMode();
			var modes = ViewerStore.getViewModes();
			if(mode == modes._3DVol)
				ViewerStore.setupVolumeRenderer('volume-renderer');
		})

		window.addEventListener('resize', function(event) {
		  ViewerStore.setViewportSize();
		}.bind(this));
	}

	componentDidUpdate() {
		ViewerStore.setViewportSize();
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
		return (mode == modes._3D) ? 'multiple-views' : (mode == modes._3DVol) ? 'volume-view' : '';
	}
	
	render() {
		var viewClass = this.viewModeClass();
		
		return (
			<div className='viewer-container'>
				<ViewerControls></ViewerControls>

				<section className='viewer'> 
					<div className={'viewer-primary layout-row ' + viewClass}>
						<div className={'primary-viewer-pane ' + viewClass} id='image-viewer' ref='Viewer'> </div>
						<div className={'viewer-pane ' + viewClass}         id='image-viewer2' ref='Viewer2'> </div>
						<div className={'viewer-pane ' + viewClass}         id='image-viewer3' ref='Viewer3'> </div>
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
