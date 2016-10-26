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

	render() {

		var infoBox = <div className='roi-info-box'> Please create an roi by click and draging on image </div>

		return (
			<section className='roi-panel'>  

				{ this.state.features.length == 0 ? infoBox : null }

				{
					this.state.features.map(function(feature, index) {
						return <div key={index} className='feature-item'>
							<div>
								<label> x: { Math.round(feature.x) } </label>
								<label> y: { Math.round(feature.y) } </label>
								<label> radius: {feature.radius.toPrecision(3)} </label>
							</div>
							<div>
								<label> avg: {feature.avgPixel.toPrecision(5)} </label>
								<label> pixel count: {feature.pixelCount} </label>

							</div>
						</div>
					})
				}
			</section>
		);
	}
}

export default ROIPanel;