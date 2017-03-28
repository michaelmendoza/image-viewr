import React from 'react';
import ViewerControls from './viewer-controls.jsx';
import ViewerStore from '../store/viewer-store.js';

class Viewer extends React.Component {

	componentDidMount() {
		var width = this.refs.Viewer.offsetWidth;
		var height = this.refs.Viewer.offsetHeight;
		ViewerStore.setupViewer(width, height);
	 	var element = document.getElementById("image-viewer");
	 	var canvas = ViewerStore.getCanvas().canvas;
		element.appendChild(canvas);

		window.addEventListener('resize', function(event){
		  var width = this.refs.Viewer.offsetWidth;
			var height = this.refs.Viewer.offsetHeight;
		  ViewerStore.setViewportSize(width, height);
		  ViewerStore.drawImage();
		}.bind(this));			
	}

	render() {
		
		return (
			<div className='viewer-container'>
				<ViewerControls></ViewerControls>

				<div className='viewer' id='image-viewer' ref='Viewer'> </div>

				<section>
					<div className='viewer-coronal-view'></div>
					<div className='viewer-transverse-view'></div>
					<div className='viewer-sagittal-view'></div>
				</section>
			</div>
		);
	}
}

export default Viewer;
