
import React from 'react';

class Toggle extends React.Component {
	
	render() {
		return <label className="label toggle">
				<input type="checkbox" className="toggle_input" />
				<div className="toggle-control"></div>
			</label>;
	}

}

export default Toggle;