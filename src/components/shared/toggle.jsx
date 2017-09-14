
import React from 'react';

class Toggle extends React.Component {
	
	constructor(props) {
		super(props);
		this.state = { value: true };
	}

	handleChange() {
		var newvalue = !this.props.value;
		this.setState({ value:newvalue });
		if(this.props.onChange) this.props.onChange(newvalue); 
	} 

	render() {
		var value = this.state.value;
		
		return <label className="label toggle">
				<input type="checkbox" className="toggle_input" 
					checked={value} onChange={this.handleChange.bind(this)}/>
				<div className="toggle-control"></div>
			</label>;
	}

}

export default Toggle;