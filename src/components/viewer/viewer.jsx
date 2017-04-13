import React from 'react';
import ViewerControls from './viewer-controls.jsx';
import ViewerStore from '../store/viewer-store.js';

class Viewer extends React.Component {

	componentDidMount() {
		var info = this.getViewerInfo();
		ViewerStore.setupViewer(info);

		window.addEventListener('resize', function(event) {
			var info = this.getViewerInfo();
		  ViewerStore.setViewportSize(info);
		}.bind(this));
	}

	getViewerInfo() {
		return [
			{ id:'image-viewer', width:this.refs.Viewer.offsetWidth, height:this.refs.Viewer.offsetHeight },
			{ id:'image-viewer2', width:this.refs.Viewer2.offsetWidth, height:this.refs.Viewer2.offsetHeight },
			{ id:'image-viewer3', width:this.refs.Viewer3.offsetWidth, height:this.refs.Viewer3.offsetHeight }
		];
	}

	viewModeClass() {
		var mode = ViewerStore.getViewMode();
		var modes = ViewerStore.getViewModes();
		return (mode == modes._3D) ? 'multiple-views' : '';
	}

	render() {
		var viewClass = this.viewModeClass();
		
		return (
			<div className='viewer-container'>
				<ViewerControls></ViewerControls>

				<section className='viewer layout-row'> 
					<div className={'viewer-primary ' + viewClass} id='image-viewer' ref='Viewer'> </div>

					<div className={'viewer-secondary flex ' + viewClass}> 
						<div className='viewer-pane' id='image-viewer2' ref='Viewer2'> </div>
						<div className='viewer-pane' id='image-viewer3' ref='Viewer3'> </div>
					</div>
				</section>

			</div>
		);
	}
}

export default Viewer;
