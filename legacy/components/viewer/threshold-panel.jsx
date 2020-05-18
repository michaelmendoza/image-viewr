import React from 'react';
import ViewerStore from '../store/viewer-store.js';

var ThresholdModes = ViewerStore.getThresholdModes();

class ThresholdPanel extends React.Component { 

	constructor() {
		super();

		this.state = { 
			colorThreshold: ViewerStore.getColorThreshold(),
			colorPercent: ViewerStore.getColorPixelOffset(),
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
		ViewerStore.drawImage();
	}

	handleSelectEyedropperMode() {
		var modes = ViewerStore.getCanvasModes();
		ViewerStore.setCanvasMode(modes.THRESHOLD_EYEDROPPER);
	}

	handleResetThreshold() {
		var thresholdMode = ViewerStore.getThresholdMode();
		if(thresholdMode == ThresholdModes.COLOR) {
			var defaultColorThreshold = { r: { min:0, max:255 }, g: { min:0, max:255 }, b: { min:0, max:255 } };
			ViewerStore.drawColorThreshold(defaultColorThreshold);
			this.setState({ colorThreshold: ViewerStore.getColorThreshold() })
		}
		else if(thresholdMode == ThresholdModes.GREY) {
			ViewerStore.drawMinThreshold(0);
			this.setState({ minThreshold: ViewerStore.getMinThreshold() })
		}
	}

	handleColorPercentageChange(event) {
		this.setState({ colorPercent: event.target.value });

		ViewerStore.setColorPixelOffset(parseInt(this.state.colorPercent));
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

	renderSliderControl(title, value, min, max, handleChange) {
		return <div className='threshold-control'>
			<h4>{title}</h4>
			<div className='layout-row'>
				<input className='flex-80' type="range" name="points" value={value} min={min} max={max} onChange={handleChange}/>
				<label className='label-value flex-20'>
					{value}
				</label>
			</div>
		</div>
  }

	render() {
		var color = this.state.colorThreshold;
		var colorThresholdControls = <section>
			{ this.renderSliderControl('Red Min Threshold',   color.r.min, 0, 255, this.handleColorThresholdChange.bind(this, 'r', 'min')) }
			{ this.renderSliderControl('Red Max Threshold',   color.r.max, 0, 255, this.handleColorThresholdChange.bind(this, 'r', 'max')) }
			{ this.renderSliderControl('Green Min Threshold', color.g.min, 0, 255, this.handleColorThresholdChange.bind(this, 'g', 'min')) }
			{ this.renderSliderControl('Green Max Threshold', color.g.max, 0, 255, this.handleColorThresholdChange.bind(this, 'g', 'max')) }
			{ this.renderSliderControl('Blue Min Threshold',  color.b.min, 0, 255, this.handleColorThresholdChange.bind(this, 'b', 'min')) }
			{ this.renderSliderControl('Blue Max Threshold',  color.b.max, 0, 255, this.handleColorThresholdChange.bind(this, 'b', 'max')) }
		</section>

		var greyThresholdControls = <section>
			{ this.renderSliderControl('Min Threshold', this.state.minThreshold, 0, 255, this.handleMinThresholdChange.bind(this)) }
		</section>

		var eyedropperButton = <button className={'icon-button' } onClick={this.handleSelectEyedropperMode}> 
			<i className='material-icons'>opacity</i> 
		</button>			
		
		var resetButton = <button className={'icon-button'} onClick={this.handleResetThreshold.bind(this)}> 
			<i className='material-icons'>cached</i> 
		</button>																

		var colorPercentControl = <section>
			{ this.renderSliderControl('Color Picker Window Size', this.state.colorPercent, 0, 200, this.handleColorPercentageChange.bind(this)) }
		</section>

		var fileType =  ViewerStore.getFileType();
		var showColorOption = (fileType == 'dicom' || fileType == 'dicom-3d') ? false : true;

		return (
			<section className='threshold-panel panel'>

				<h4 className='panel-title'> 
					<label> Threshold </label> 
				</h4>

				<div className='threshold-settings layout-row'> 
					<span className='settings-item'>
						<input type='radio' value={ThresholdModes.NONE}
							checked={this.state.thresholdMode == ThresholdModes.NONE} 
							onChange={this.handleModeChange.bind(this, ThresholdModes.NONE)}/> 
						<label>None</label>
					</span>

					<span className='flex'></span>

					{ 
						showColorOption ? 
						<span className='settings-item'>
							<input type='radio' value={ThresholdModes.COLOR}
								checked={this.state.thresholdMode == ThresholdModes.COLOR} 
								onChange={this.handleModeChange.bind(this, ThresholdModes.COLOR)}/> 
							<label>Color</label>
						</span>
						: null
					}

					<span className='flex'></span>
					
					<span className='settings-item'>
						<input type='radio' value={ThresholdModes.GREY} 
							checked={this.state.thresholdMode == ThresholdModes.GREY} 
							onChange={this.handleModeChange.bind(this, ThresholdModes.GREY)}/> 
						<label>Grey</label>
					</span>
				</div>

				<div className='threshold-buttons layout-row'>
					{ this.state.thresholdMode == ThresholdModes.COLOR ? eyedropperButton : null}
					<div className='flex'></div>
					{resetButton}
				</div>

				{ this.state.thresholdMode == ThresholdModes.COLOR ? colorPercentControl : null } 

				{ this.state.thresholdMode == ThresholdModes.COLOR ? colorThresholdControls : greyThresholdControls } 
			</section>
		);
	}
}

export default ThresholdPanel;