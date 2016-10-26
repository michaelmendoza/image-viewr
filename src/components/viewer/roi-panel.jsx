import React from 'react';
import ViewerStore from '../store/viewer-store.js';

class ROIPanel extends React.Component {

	constructor() {
		super();
		this.getFeatures = this.getFeatures.bind(this);
		this.state = { features: ViewerStore.getFeatures() };
	}

	componentDidMount() {
  	ViewerStore.on('mousemove', this.getFeatures);
	}

	componentWillUnmount() {
	  ViewerStore.removeListener('mousemove', this.getFeatures);
	}

	getFeatures() {
		this.setState({
			features: ViewerStore.getFeatures()
		})
	}

	handleDeleteFeature(index) {
		ViewerStore.deleteFeature(index);
		this.setState({ features: ViewerStore.getFeatures() });
	}

	render() {

		var infoBox = <div className='roi-info-box'> Please create an roi by click and draging on image </div>

		return (
			<section className='roi-panel'>  

				{ this.state.features.length == 0 ? infoBox : null }

				{
					this.state.features.map(function(feature, index) {
						return <div key={index} className='feature-item'>
							<div>
								<label> X: { Math.round(feature.x) } </label>
								<label> Y: { Math.round(feature.y) } </label>
							</div>
							<div>
								<label> Radius: {feature.radius.toFixed(0)} </label>
							</div>
							<div>
								<label> Average Value: {feature.avgPixel.toFixed(1)} </label>
							</div>
							<div>
								<label> Pixel Count: {feature.pixelCount} </label>
							</div>

							<button className={'icon-button'} onClick={this.handleDeleteFeature.bind(this, index)}> 
								<i className='material-icons'>close</i> 
							</button>

						</div>
					}.bind(this))
				}
			</section>
		);
	}
}

export default ROIPanel;