import React from 'react';
import ViewerStore from '../store/viewer-store.js';

class PixelPanel extends React.Component {

	constructor() {
		super();
		this.getPixelData = this.getPixelData.bind(this);
		this.state = { pixel:{x:'-', y:'-', value:'-'} };
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
		var pixel = 'x: ' + this.state.pixel.x + 
								' y: ' + this.state.pixel.y + 
								' data: ' + this.state.pixel.value;

		return (
			<div className='pixel-panel'>{pixel}</div>
		);
	}
}

export default PixelPanel;