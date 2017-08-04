import React from 'react';
import ViewerStore from '../store/viewer-store.js';

class ViewerLayersPanel extends React.Component {

	getLayers() {
		var layers = ViewerStore.getLayers();
		return layers.map((layer) => {
			<div className='layer'> Layer </div>;
		});
	}

	render() {
		return (
				<section className='panel viewer-layers-panel'>
				<h4 className='panel-title'>
					<label> Image Layers </label>
				</h4>
				
				<div className="layers">
				{ this.getLayers() }
				</div>
				
				</section>		
		);
	}	
}

export default ViewerLayersPanel;
