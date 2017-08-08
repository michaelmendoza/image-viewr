import React from 'react';
import ViewerLayerDetail from './viewer-layer-detail.jsx';
import ViewerStore from '../store/viewer-store.js';

class ViewerLayersPanel extends React.Component {

	constructor(props) {
		super(props);
		this.state = { showDetail:false, detailIndex: 0 };
	}

	getLayers() {
		var layers = ViewerStore.getLayers();

		return layers.map((layer, index) => { 
			var img;
			if(layer.img)
				img = <img src={layer.img.toDataURL()} />
			else 
				img = <button className="layer-icon img"><i className="material-icons">wallpaper</i></button>

			return <div className='layer layout-row layout-vertical-center'> 
				{ img }
				<label className="flex"> Layer {index} </label>
				<button className="layer-icon opacity"><i className="material-icons">visibility</i></button>			
				<button className="layer-icon close"><i className="material-icons">close</i></button>
				<button className="layer-icon more" onClick={this.handleShowDetail.bind(this, index)}><i className="material-icons">more_vert</i></button>
				</div>;
		});
	}

	getDetail() {
		return <ViewerLayerDetail layerIndex={this.state.detailIndex}></ViewerLayerDetail>
	}

	handleShowDetail(index) {
		this.setState({ showDetail: true, detailIndex:index });
	}

	handleAddLayer() {
		ViewerStore.addLayer();
		this.setState({});
	}

	render() {
		return (
				<section className='panel viewer-layers-panel'>
				<h4 className='panel-title'>
					<label> Image Layers </label>
					<button className="add-button" onClick={this.handleAddLayer.bind(this)}><i className="material-icons">add</i></button>
				</h4>
				
				<div className="layers">
				{ this.state.showDetail ? this.getDetail() : this.getLayers() }
				</div>
				
				</section>		
		);
	}	
}

export default ViewerLayersPanel;
