import React from 'react';
import ReactDOM from 'react-dom';

import ViewerStore from '../store/viewer-store.js';

class Viewer extends React.Component {

	constructor() {
		super();
		this.state = { canvas:null };
	}

	componentDidMount() {
		ViewerStore.loadImage('../src/assets/image.png');
	 	var element = document.getElementById("image-viewer");
	 	var canvas = ViewerStore.getCanvas().canvas;
		element.appendChild(canvas);
	}

	render() {
		var canvas = this.state.canvas;

		return (
			<div className='viewer-container'>
				<div className='viewer-header' ><h4> File: ../src/assets/image.png </h4> </div>
				<div className='viewer' id='image-viewer'> </div>
			</div>
		);
	}
}

export default Viewer;
