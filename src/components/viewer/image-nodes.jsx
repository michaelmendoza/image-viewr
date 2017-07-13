import React from 'react';
import ImageNodesControls from './image-nodes-controls.jsx';
import ImageNodeStore from '../store/image-node-store.js';

class ImageNodes extends React.Component {

	constructor() {
		super();
	}

	componentDidMount() {
		ImageNodeStore.createGraph();
	}

	render() {

		return (
			<section className="image-nodes panel">
					<ImageNodesControls></ImageNodesControls>
					<div id='image-node' className='image-node-svg'></div>
			</section>
		);
	}
}

export default ImageNodes;