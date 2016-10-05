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

		return (
			<section className='roi-panel'>  
				{
					this.state.features.map(function(feature, index) {
						return <div key={index} className='feature-item'>
							<label> x: {feature.x} </label>
							<label> y: {feature.y} </label>
							<label> radius: {feature.radius.toPrecision(3)} </label>
							<label> avg: -- </label>
						</div>
					})
				}
			</section>
		);
	}
}

export default ROIPanel;