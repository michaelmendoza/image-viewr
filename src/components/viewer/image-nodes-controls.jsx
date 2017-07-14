import React from 'react';
import ImageNodeStore from '../store/image-node-store.js';

class ImageNodesControls extends React.Component {

	handleAddNode() {
		ImageNodeStore.addNode(this);
	}
	
	render() {
		return (
			<section className='image-node-controls'> 
				<div className="icon-button"><i className="material-icons">menu</i></div>
				<div className="icon-button" onClick={this.handleAddNode.bind('image')}><i className="material-icons">photo</i></div>
				<div className="icon-button" onClick={this.handleAddNode.bind('add')}><i className="material-icons">add_box</i></div>
				<div className="icon-button" onClick={this.handleAddNode.bind('fit')}><i className="material-icons">timeline</i></div>
				<div className="icon-button" onClick={this.handleAddNode.bind('histogram')}><i className="material-icons">insert_chart</i></div>
				<div className="icon-button" onClick={this.handleAddNode.bind('custom')}><i className="material-icons">code</i></div>
				<div className="icon-button" onClick={this.handleAddNode.bind('view')}><i className="material-icons">pageview</i></div>
			</section>
		);
	}
}

export default ImageNodesControls;
