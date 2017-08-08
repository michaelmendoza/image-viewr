
import React from 'react';
import Toggle from '../shared/toggle.jsx';
import Slider from '../shared/slider.jsx';
import Spacer from '../shared/spacer.jsx';
import ViewerStore from '../store/viewer-store.js';

class ViewerLayerDetail extends React.Component {
	
	constructor(props) {
		super(props);
		var layer = ViewerStore.getLayer(this.props.layerIndex);
		this.state = { layer: layer, colormap: 'greys' };
	}

	componentDidMount() {
		this.state.layer.renderColorscale(this.refs.colormap);
	}

	handleColormap(event) {
		this.setState({ colormap: event.target.value })
		this.state.layer.setColorMap(event.target.value, this.refs.colormap);
	}

	render() {
		var layer = this.state.layer;

		return (
			<section className='viewer-layer-detail'> 

				<ul>
					<li>
						<img className='detail-thumbnail' src={layer.img.toDataURL()} /> 
						 <span className='flex'></span> 
						<label> Layer {this.props.layerIndex} </label>
					</li>
					<li> 
						<label>Color Map</label> <Spacer/>
						<select value={this.state.colormap} onChange={this.handleColormap.bind(this)}>
						  <option value="greys">GreyScale</option>
						  <option value="jet">Jet</option>
						</select>
					</li>
					<li> <canvas ref='colormap' width='200' height='40'></canvas> </li>
					<li> <label>Histogram</label> </li> 
					<li> <label>Visible</label> <Spacer/> <Toggle></Toggle> </li>
					<li> <label>Opacity</label> <Spacer/> <Slider/>  </li>
					<li> <label>Zoom</label> <Spacer/> <Slider/> </li>
					<li> <label>X Offset</label> <Spacer/> <Slider/> </li>
					<li> <label>Y Offset</label> <Spacer/> <Slider/> </li>
					<li> <label>Level</label> <Spacer/> <Slider/> </li>
					<li> <label>Width</label> <Spacer/> <Slider/> </li>
					<li> <label>Resolution</label><Spacer/> <Slider/> </li>
					<li> <label>Min Threshold</label><Spacer/> <Slider/> </li>
					<li> <label>Max Threshold</label><Spacer/> <Slider/> </li>					
				</ul>

			</section>
		);
	}

}

export default ViewerLayerDetail;