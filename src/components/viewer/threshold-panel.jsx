import React from 'react';
import ViewerStore from '../store/viewer-store.js';

var ThresholdModes = ViewerStore.getThresholdModes();

class ThresholdPanel extends React.Component {

	constructor() {
		super();

		var thresholdMode = ViewerStore.getThresholdMode();
		if(thresholdMode == ThresholdModes.NONE)
			ViewerStore.setThresholdMode(ThresholdModes.GREY);

		this.state = { 
			colorThreshold: ViewerStore.getColorThreshold(),
			minThreshold: ViewerStore.getMinThreshold(),
			thresholdMode: ViewerStore.getThresholdMode()
		};
	}

	componentDidMount() {
		ViewerStore.on('settings_update', () => {
			this.setState({ colorThreshold: ViewerStore.getColorThreshold() });
		}) 
	}

	handleModeChange(mode) {
		ViewerStore.setThresholdMode(mode);
		this.setState({ thresholdMode:mode });
	}

	handleColorThresholdChange(color, key, event) {
		this.state.colorThreshold[color][key] = event.target.value;
    this.setState({});

    ViewerStore.drawColorThreshold(this.state.colorThreshold);
	}

  handleMinThresholdChange(event) {
    this.setState({
      minThreshold: event.target.value
    });

    ViewerStore.drawMinThreshold(event.target.value);
  }

	renderSliderControl(title, value, handleChange) {
		return <div className='min-threshold-control'>
			<h4>{title}</h4>
			<div className='layout-row'>
				<input className='flex-80' type="range" name="points" value={value} min="0" max="255" onChange={handleChange}/>
				<label className='label-value flex-20'>
					{value}
				</label>
			</div>
		</div>
  }

	render() {
		var color = this.state.colorThreshold;
		var colorThresholdControls = <section>
			{ this.renderSliderControl('Red Min Threshold',   color.r.min, this.handleColorThresholdChange.bind(this, 'r', 'min')) }
			{ this.renderSliderControl('Red Max Threshold',   color.r.max, this.handleColorThresholdChange.bind(this, 'r', 'max')) }
			{ this.renderSliderControl('Green Min Threshold', color.g.min, this.handleColorThresholdChange.bind(this, 'g', 'min')) }
			{ this.renderSliderControl('Green Max Threshold', color.g.max, this.handleColorThresholdChange.bind(this, 'g', 'max')) }
			{ this.renderSliderControl('Blue Min Threshold',  color.b.min, this.handleColorThresholdChange.bind(this, 'b', 'min')) }
			{ this.renderSliderControl('Blue Max Threshold',  color.b.max, this.handleColorThresholdChange.bind(this, 'b', 'max')) }
		</section>

		var greyThresholdControls = <div className='min-threshold-control'>
			{ this.renderSliderControl('Min Threshold', this.state.minThreshold, this.handleMinThresholdChange.bind(this)) }
		</div>

		return (
			<div className='threshold-panel'>

				<div className='threshold-settings layout-row'>
					<span className='settings-item flex'>
						<input type='radio' value={ThresholdModes.COLOR}
							checked={this.state.thresholdMode == ThresholdModes.COLOR} 
							onChange={this.handleModeChange.bind(this, ThresholdModes.COLOR)}/> 
						<label>Color</label>
					</span>
					<span className='settings-item flex'>
						<input type='radio' value={ThresholdModes.GREY} 
							checked={this.state.thresholdMode == ThresholdModes.GREY} 
							onChange={this.handleModeChange.bind(this, ThresholdModes.GREY)}/> 
						<label>Grey</label>
					</span>
				</div>

				{ this.state.thresholdMode == ThresholdModes.COLOR ? colorThresholdControls : greyThresholdControls } 

			</div>
		);
	}
}

export default ThresholdPanel;