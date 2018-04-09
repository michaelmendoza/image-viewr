import React from 'react';
import ViewerLayerDetail from './viewer-layer-detail.jsx';
import ViewerStore from '../store/viewer-store.js';

class ViewerLayersPanel extends React.Component {

	constructor(props) {
		super(props);
		this.state = { showDetail:false, detailIndex: 0 };
	}

	handleClickLayer(index) {
		ViewerStore.setActiveLayer(index);
		this.setState({});
	}

	getLayers() {
		var layers = ViewerStore.getLayers();

		return layers.map((layer, index) => { 
			var active = layer.isActive ? 'active' : '';
			var img;
			if(layer.img) {
				if(layer.img.toDataURL)
					img = <img src={layer.img.toDataURL()} />
				else
					img = <img src={layer.img} />
			}
			else 
				img = <button className="layer-icon img"><i className="material-icons">wallpaper</i></button>

			return <div className={'layer layout-row layout-vertical-center ' + active} key={index} onClick={this.handleClickLayer.bind(this, index)}> 
				{ img } 
				<label className="flex"> Layer {index} </label>
				<button className="layer-icon opacity" onClick={this.handleToggleVisible.bind(this, index)}><i className="material-icons">{layer.visible ? 'visibility' : 'visibility_off'}</i></button>			
				<button className="layer-icon close" onClick={this.handleRemoveLayer.bind(this, index)}><i className="material-icons">close</i></button>
				<button className="layer-icon more" onClick={this.handleShowDetail.bind(this, index)}><i className="material-icons">more_vert</i></button>
				</div>; 
		});
	}

	getDetail() {
		return <ViewerLayerDetail layerIndex={this.state.detailIndex}></ViewerLayerDetail>
	}

	getButton() {
		return this.state.showDetail ? 
		<button className="add-button" onClick={this.handleCloseLayer.bind(this)}><i className="material-icons">close</i></button> :		
		<button className="add-button" onClick={this.handleAddLayer.bind(this)}><i className="material-icons">add</i></button>
	} 

	handleShowDetail(index) {
		this.setState({ showDetail: true, detailIndex:index });
	}

	handleAddLayer() {
		ViewerStore.addLayer();
		this.setState({});
	}

	handleCloseLayer() {
		this.setState({ showDetail: false });
	} 

	handleRemoveLayer(index) {
		ViewerStore.removeLayer(index);
		this.setState({});
	}

	handleToggleVisible(index) {
		this.setState({}); 
		ViewerStore.toggleLayer(index);
	}

	render() { 
		return ( 
				<section className='panel viewer-layers-panel'>
				<h4 className='panel-title'>
					<label> Image Layers </label>
					{ this.getButton() }
					</h4>
				
				<div className="layers">
				{ this.state.showDetail ? this.getDetail() : this.getLayers() }
				</div> 
				
				</section> 
		);
	}	
}

export default ViewerLayersPanel;
