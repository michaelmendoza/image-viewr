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

	handleSelectCircle() {
		console.log('Circle');
	}

	handleSelectRect() {
		console.log('Rect');
	}

	render() {

		var infoBox = <div className='roi-info-box'> Please create an roi by click and draging on image </div>

		return (
			<section className='roi-panel'>  

				<div className='roi-type-buttons'>
					<button className='button' onClick={this.handleSelectCircle}> Circle </button>
					<button className='button' onClick={this.handleSelectRect}> Rectange </button>
				</div>

				{ this.state.features.length == 0 ? infoBox : null }

				{
					this.state.features.map(function(feature, index) {
						return <div key={index} className='feature-item'>
							<div>
								<label> x: {feature.x} </label>
								<label> y: {feature.y} </label>
								<label> radius: {feature.radius.toPrecision(3)} </label>
							</div>
							<div>
								<label> avg: {feature.avgPixel.toPrecision(5)} </label>
							</div>
						</div>
					})
				}
			</section>
		);
	}
}

export default ROIPanel;