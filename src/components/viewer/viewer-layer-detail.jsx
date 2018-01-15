
import React from 'react';
import Histogram from '../shared/histogram.jsx';
import Toggle from '../shared/toggle.jsx';
import Slider from '../shared/slider.jsx';
import Spacer from '../shared/spacer.jsx';
import ViewerStore from '../store/viewer-store.js';

var SETTINGS = ViewerStore.getSettings();

class ViewerLayerDetail extends React.Component {
	
	constructor(props) {
		super(props);
		var layer = ViewerStore.getLayer(this.props.layerIndex);
		this.state = { 
			layer: layer, 
			colormap: 'greys', 
			visible: layer.visible,
			interpolate: layer.interpolate,
			opacity: layer.opacity * 100, 
			min: layer.threshold.min,
			max: layer.threshold.max,
			minValue: layer.contrast.minValue,
			maxValue: layer.contrast.maxValue,
			offsetX: layer.controls.offsetX, 
			offsetY: layer.controls.offsetY, 
			zoom: layer.controls.zoom / SETTINGS.ZOOM_STEP,
			level: layer.contrast.level,
			width: layer.contrast.width,
			minContrast: layer.contrast.getMin(),
			maxContrast: layer.contrast.getMax(),
			axial: 0,
			coronal: 0,
			sagittal: 0,
			view:'2D'
		}; 
	}

	componentDidMount() { 
		this.state.layer.renderColorscale(this.refs.colormap);
		ViewerStore.Viewr.on('layer-update', this.update.bind(this));
	}

	componentWillUnmount() {
		ViewerStore.Viewr.removeListener('layer-update', this.update.bind(this));
	}

	update() {
		var layer = ViewerStore.getLayer(this.props.layerIndex);
		this.setState({
			offsetX: layer.controls.offsetX, 
			offsetY: layer.controls.offsetY, 
			zoom: layer.controls.zoom / SETTINGS.ZOOM_STEP,
			level: layer.contrast.level,
			width: layer.contrast.width,
			minContrast: layer.contrast.getMin(),
			maxContrast: layer.contrast.getMax()
		})		
	}

	handleColormap(event) {
		this.setState({ colormap: event.target.value })
		this.state.layer.setColorMap(event.target.value, this.refs.colormap);
	}

	handleVisible(value) {
		this.setState({ visible:value });
		this.state.layer.toggleLayer();
	}

	handleInterpolate(value) {
		this.setState({ interpolate:value });
		this.state.layer.setInterpolate(value);
	}

	handleOpacity(value) {
		this.setState({ opacity:value });
		this.state.layer.setOpacity(value / 100.0);
	}

	handleMin(value) {
		this.setState({ min:value });
		this.state.layer.setMinThreshold(value);
	}

	handleMax(value) {
		this.setState({ max:value });
		this.state.layer.setMaxThreshold(value);
	}

	handleOffsetX(value) {
		this.setState({ offsetX:value });
		this.state.layer.setOffsetX(parseFloat(value));
	}

	handleOffsetY(value) {
		this.setState({ offsetY:value });
		this.state.layer.setOffsetY(parseFloat(value));
	}	

	handleZoom(value) {
		this.setState({ zoom:value });
		this.state.layer.setZoom(parseFloat(value) * SETTINGS.ZOOM_STEP);
	}

	handleLevel(value) {
		var layer = this.state.layer;
		layer.setContrastLevel(parseInt(value));
		layer.updateHistogram();
		this.setState({ level:value, minContrast:layer.contrast.getMin(), maxContrast:layer.contrast.getMax() });		
	}

	handleWidth(value) {
		var layer = this.state.layer;
		layer.setContrastWidth(parseInt(value));
		layer.updateHistogram();
		this.setState({ width:value, minContrast:layer.contrast.getMin(), maxContrast:layer.contrast.getMax() });
	} 

	handleMinContrast(value) {
		var layer = this.state.layer;
		layer.setContrastMin(parseInt(value));
		layer.updateHistogram();
		this.setState({ minContrast:value, level:layer.contrast.level, width:layer.contrast.width });
	}
	
	handleMaxContrast(value) {
		var layer = this.state.layer;
		layer.setContrastMax(parseInt(value));
		layer.updateHistogram();
		this.setState({ maxContrast:value, level:layer.contrast.level, width:layer.contrast.width });
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
						  <option value="hot">Hot</option>
						  <option value="cool">Cool</option>
						  <option value="RdBu">RdBu</option>
						</select> 
					</li>
					<li> 
						<canvas ref='colormap' width='260' height='40'></canvas> </li>
					<li> 
						<label>Histogram</label> 
					</li> 
					<li>
						<Histogram layer={this.state.layer} width='260' height='40'/> 
					</li>
					<li> 
						<label>Visible</label> <Spacer/>  
						<Toggle value={this.state.visible} onChange={this.handleVisible.bind(this)} > </Toggle>
					</li>					
					<li> 
						<label>Pixel Interpolation</label> <Spacer/>
						<Toggle value={this.state.interpolate} onChange={this.handleInterpolate.bind(this)} ></Toggle>
					</li> 

					<h4> Opacity </h4>
					<li> <label>Opacity</label> <Spacer/> 
						<Slider min={0} max={100} value={this.state.opacity} onChange={this.handleOpacity.bind(this)}/> 
						<label className='value'> {this.state.opacity} </label>
					</li>
					<li> <label>Min Threshold</label><Spacer/> 
						<Slider min={this.state.minValue} max={this.state.maxValue} value={this.state.min} onChange={this.handleMin.bind(this)}/>
						<label className='value'> {this.state.min} </label> 
					</li>
					<li> <label>Max Threshold</label><Spacer/> 
						<Slider min={this.state.minValue} max={this.state.maxValue} value={this.state.max} onChange={this.handleMax.bind(this)}/> 
						<label className='value'> {this.state.max} </label> 
					</li>		

					<h4> Transforms </h4>					
					<li> <label>X Offset</label> <Spacer/> 
						<Slider min={-100} max={100} value={this.state.offsetX} step={0.1} onChange={this.handleOffsetX.bind(this)}/> 
						<label className='value'> {this.state.offsetX} </label> 
					</li>
					<li> <label>Y Offset</label> <Spacer/>
						<Slider  min={-100} max={100} value={this.state.offsetY} step={0.1} onChange={this.handleOffsetY.bind(this)}/>  
						<label className='value'> {this.state.offsetY} </label> 
					</li>
					<li> <label>Zoom</label> <Spacer/>
						<Slider  min={1} max={100} value={this.state.zoom} onChange={this.handleZoom.bind(this)}/>  
						<label className='value'> {(this.state.zoom * SETTINGS.ZOOM_STEP).toFixed(2)} </label> 
					</li> 

					<h4>Contrast</h4>
					<li> <label>Level</label> <Spacer/> 
						<Slider min={0} max={4096} value={this.state.level} onChange={this.handleLevel.bind(this)}/> 
						<label className='value'> {this.state.level} </label> 
					</li>
					<li> <label>Width</label> <Spacer/> 
						<Slider min={0} max={4096} value={this.state.width} onChange={this.handleWidth.bind(this)}/> 
						<label className='value'> {this.state.width} </label> 
					</li>
					<li> <label>Min</label> <Spacer/> 
						<Slider min={0} max={4096} value={this.state.minContrast} onChange={this.handleMinContrast.bind(this)}/> 
						<label className='value'> {this.state.minContrast} </label> 
					</li>
					<li> <label>Max</label> <Spacer/> 
						<Slider min={0} max={4096} value={this.state.maxContrast} onChange={this.handleMaxContrast.bind(this)}/> 
						<label className='value'> {this.state.maxContrast} </label> 
					</li>

					{ this.state.view != '2D' ? <h4>Slices</h4> : null }
					{
						this.state.view != '2D' ? 
						<li> <label>Axial Index</label> <Spacer/> 
							<Slider/> 
							<label className='value'> {this.state.offsetY} </label> 
						</li> : null		
					}		
					{	
						this.state.view != '2D' ? 
						<li> <label>Coronal Index</label> <Spacer/> 
							<Slider/> 
							<label className='value'> {this.state.offsetY} </label> 
						</li>	: null				
					}
					{
						this.state.view != '2D' ? 
						<li> <label>Sagittal Index</label> <Spacer/> 
							<Slider/> 
							<label className='value'> {this.state.offsetY} </label> 
						</li> : null
					}				
				</ul>

			</section>
		);
	}

}

export default ViewerLayerDetail;
