import React from 'react';
import ViewerStore from '../store/viewer-store.js';
import ROIPanelItem from './roi-panel-item.jsx';

class ROIPanel extends React.Component {

	constructor() {
		super();
		this.getFeatures = this.getFeatures.bind(this);
		this.state = { features: ViewerStore.getFeatures() };
	}
	
	componentDidMount() {
  	ViewerStore.on('mousemove', this.getFeatures);
  	ViewerStore.on('feature-update', this.getFeatures);
	}

	componentWillUnmount() {
	  ViewerStore.removeListener('mousemove', this.getFeatures);
	  ViewerStore.removeListener('feature-update', this.getFeatures);
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

	handleFeatureChange(index) {
		ViewerStore.drawImage();
	}

	getROI(feature, index) {
		var sliceIndex = ViewerStore.getSliceIndex();
		var FeatureTypes = ViewerStore.getFeatureTypes();
		if(feature.type == FeatureTypes.CIRCLE || feature.type == FeatureTypes.CUSTOM) {
			if(feature.sliceIndex != sliceIndex)
				return null;
			else
				return <ROIPanelItem
								key={index}
								feature={feature} 
								index={index} 
								onDelete={this.handleDeleteFeature.bind(this, index)}
								onChange={this.handleFeatureChange.bind(this, index)}>						 
						 </ROIPanelItem>;
		}
		else
			return <div> Error </div>
	}

	render() {

		var infoBox = <div className='roi-info-box'> Please create an roi by click and draging on image </div>

		return (
			<section className='roi-panel'>  
				{ this.state.features.length == 0 ? infoBox : null }

				{
					this.state.features.map(function(feature, index) {
						return this.getROI(feature, index);
					}.bind(this))
				}
			</section>
		);
	}
}

export default ROIPanel;