import React from 'react';
import ImageNodesControls from './image-nodes-controls.jsx';
import ImageNodeStore from '../store/image-node-store.js';

class ImageNodes extends React.Component {

	constructor() {
		super();
	}

	componentDidMount() {
		var ref = this.refs.ImageNode;
		ImageNodeStore.createGraph();
	}

	render() {

		return (
			<section className="image-nodes panel">
					<ImageNodesControls></ImageNodesControls>
					<div id='image-node' className='image-node-svg' ref='ImageNode'></div>
			</section>
		);
	}
}

export default ImageNodes;