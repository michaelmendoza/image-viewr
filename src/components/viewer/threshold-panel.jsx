import React from 'react';
import ViewerStore from '../store/viewer-store.js';

class ThresholdPanel extends React.Component {

	constructor() {
		super();
		this.state = { minThreshold: ViewerStore.getMinThreshold() } ;
	}

  handleMinThresholdChange(event) {
    this.setState({
      minThreshold: event.target.value
    });

    ViewerStore.drawMinThreshold(event.target.value);
  }

	render() {

		return (
			<div className='threshold-panel'>
				<div className='min-threshold-control'>
					<h4>Min Threshold</h4>
					<div className='layout-row'>
						<input className='flex-80' type="range" name="points" value={this.state.minThreshold} min="0" max="255" onChange={this.handleMinThresholdChange.bind(this)}/>
						<label className='label-value flex-20'>
							{this.state.minThreshold}
						</label>
					</div>
				</div>
			</div>
		);
	}
}

export default ThresholdPanel;