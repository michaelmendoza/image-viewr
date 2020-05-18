import React from 'react';
import ViewerStore from '../store/viewer-store.js';

class PixelPanel extends React.Component {

	constructor() {
		super();
		this.getPixelData = this.getPixelData.bind(this);
		this.state = { pixel: {x:'-', y:'-', value:'-'} };
	}

	componentDidMount() {
		ViewerStore.on('mousemove', this.getPixelData);	      
	}

	componentWillUnmount() {
		ViewerStore.removeListener('mousemove', this.getPixelData);
	}

	getPixelData() {
		var data = ViewerStore.getCanvasMousePixel();
		this.setState({ pixel:data });
	}

	render() {

		return (
			<div className='pixel-panel'>
				<label> { 'X: ' + this.state.pixel.x }</label>
				<label> { 'Y: ' + this.state.pixel.y } </label>
				<label> { 'Value: ' + this.state.pixel.value } </label>
			</div>
		);
	}
}

export default PixelPanel;