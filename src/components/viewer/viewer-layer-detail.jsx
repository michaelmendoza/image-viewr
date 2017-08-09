
import React from 'react';
import Toggle from '../shared/toggle.jsx';
import Slider from '../shared/slider.jsx';
import Spacer from '../shared/spacer.jsx';
import ViewerStore from '../store/viewer-store.js';

class ViewerLayerDetail extends React.Component {
	
	constructor(props) {
		super(props);
		var layer = ViewerStore.getLayer(this.props.layerIndex);
		this.state = { 
			layer: layer, colormap: 'greys', 
			opacity: layer.opacity * 100, 
			xoffset:0, 
			yoffset:0,  
			level: layer.contrast.level,
			width: layer.contrast.width,
			min_threshold: layer.threshold.minThreshold,
			max_threshold: layer.threshold.maxThreshold
		};
	}

	componentDidMount() {
		this.state.layer.renderColorscale(this.refs.colormap);
	}

	handleColormap(event) {
		this.setState({ colormap: event.target.value })
		this.state.layer.setColorMap(event.target.value, this.refs.colormap);
	}

	handleOpacity(value) {
		this.setState({ opacity:value });
		this.state.layer.setOpacity(value / 100.0);
	}

	render() {
		var layer = this.state.layer;

		return (
			<section className='viewer-layer-detail'> 

				<ul>				
					<li>
						<Spacer/>
						<img className='detail-thumbnail' src={layer.img.toDataURL()} /> 
						<Spacer/> 
					</li>

					<h4> Info </h4>
					<li>
						<label> Name </label>
						<Spacer/>
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

					<h4> Opacity </h4>
					<li> <label>Visible</label> <Spacer/> <Toggle></Toggle> </li>
					<li> <label>Opacity</label> <Spacer/> 
						<Slider min={0} max={100} value={this.state.opacity} onChange={this.handleOpacity.bind(this)}/> 
						<label> {this.state.opacity} </label>
					</li>
					<li> <label>Min Threshold</label><Spacer/> <Slider/> </li>
					<li> <label>Max Threshold</label><Spacer/> <Slider/> </li>		

					<h4> Offsets </h4>					
					<li> <label>X Offset</label> <Spacer/> <Slider/> </li>
					<li> <label>Y Offset</label> <Spacer/> <Slider/> </li>

					<h4>Contrast</h4>
					<li> <label>Level</label> <Spacer/> <Slider/> </li>
					<li> <label>Width</label> <Spacer/> <Slider/> </li>

					<h4>Slices</h4>
					<li> <label>Slice</label> <Spacer/> <Slider/> </li>					

					<li> <label>Axial</label> <Spacer/> <Slider/> </li>					
					<li> <label>Coronal</label> <Spacer/> <Slider/> </li>					
					<li> <label>Sagittal</label> <Spacer/> <Slider/> </li>					
				</ul>

			</section>
		);
	}

}

export default ViewerLayerDetail;
