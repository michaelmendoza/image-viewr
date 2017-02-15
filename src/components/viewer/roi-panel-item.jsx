import React from 'react';
import { SketchPicker } from 'react-color';

class ROIPanelItem extends React.Component {

	constructor() {
		super();
		this.state = { show:false };
	}

	componentDidMount() {
		this.setState({ color: this.props.feature.color });
	}

	handleShow() {
		this.setState({ color: this.props.feature.color, show:!this.state.show });
	}

	handlePickerClose() {
		if(this.state.show)
			this.setState({ show: false });
	}

	handleDelete() {
		if(!this.state.show)
			this.props.onDelete();
	}

	handleChange(color) {
		this.setState({ color:color.hex });
		this.props.feature.color = color.hex;
		this.props.onChange();
	}

	render() {
		var feature = this.props.feature;
		var index = this.props.index;
		var picker = <div className='colorpicker'> <SketchPicker color={feature.color} onChange={this.handleChange.bind(this)}></SketchPicker> </div>;
		var pickerBG = <div className='colorpicker-background' onClick={this.handlePickerClose.bind(this)}></div>;

		return <div key={index} className='roi-item'>
			
			<h4 className='roi-title'>
				<div className = 'roi-colorbox' style={{ backgroundColor: this.state.color }} onClick={this.handleShow.bind(this)}></div>
				{ this.state.show ? <div className='roi-colorpicker'> {picker} {pickerBG} </div> : null }
				<label> { feature.name } </label>
			</h4>
			<div className='roi-label'>
				<label> Area: {feature.area.toFixed(1)} </label>
			</div>
			<div className='roi-label'>
				<label> Mean: {feature.avgPixel.toFixed(1)} </label>
			</div>
			<div className='roi-label'>
				<label> # Pixels: {feature.pixelCount} </label>
			</div>

			<button className={'icon-button'} onClick={this.handleDelete.bind(this)}> 
				<i className='material-icons'>close</i> 
			</button>
		</div>

	}
}

export default ROIPanelItem;