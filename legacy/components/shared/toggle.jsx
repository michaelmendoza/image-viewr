
import React from 'react';

class Toggle extends React.Component {
	
	static defaultProps = {onChange: () => {}};
	state = {on:true};

	toggle = () => {
		this.setState(
			({on}) => ({on: !on}),
			() => { this.props.onChange(this.state.on); }
		)
	} 

	render() {
		const {on} = this.state;	
		
		return <label className="label toggle">
				<input type="checkbox" className="toggle_input" 
					checked={on} onChange={this.toggle}/>
				<div className="toggle-control"></div>
			</label>;
	}
}

export default Toggle;