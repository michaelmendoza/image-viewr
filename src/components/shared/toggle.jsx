
import React from 'react';

class Toggle extends React.Component {

	constructor(props) {
		super(props);
		this.defaultProps = {onChange: () => {}};
		this.state = {on:true};	
	}

	toggle() {
		this.setState(
			({on}) => ({on: !on}),
			() => { this.props.onChange(this.state.on); }
		)
	} 

	render() {
		const {on} = this.state;	
		
		return <label className="label toggle">
				<input type="checkbox" className="toggle_input" 
					checked={on} onChange={this.toggle.bind(this)}/>
				<div className="toggle-control"></div>
			</label>;
	}
}

export default Toggle;