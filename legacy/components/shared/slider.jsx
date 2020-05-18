
import React from 'react';

class Slider extends React.Component {

	constructor(props) {
		super(props);
		
		this.state = { 
			value:this.props.value || 0, 
			min:this.props.min || 0,
			max:this.props.max || 100,
			step:this.props.step || 1
		}
	}	

	componentWillReceiveProps(nextProps) {
		// You don't have to do this check first, but it can help prevent an unneeded render
		if (nextProps.value !== this.state.value) {
			this.setState({ value: nextProps.value });
		}
	}
	
	handleChange(event) {
		this.setState({ value: event.target.value });
		if(this.props.onChange) this.props.onChange(event.target.value);
	}
	
	render() { 
		return <span className='slider'>
			<input type="range" 
				name="zoom" 
				value={this.state.value} 
				min={this.state.min} 
				max={this.state.max}
				step={this.state.step}
				onChange={this.handleChange.bind(this)}/>
		</span>;
	}
}

export default Slider;
