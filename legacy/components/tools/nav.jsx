import React from 'react';
import ToolStore from '../store/tool-store.js';

class Nav extends React.Component {
	
	constructor(props) { 
		super(props);
		
		this.state = { current:ToolStore.activeTool }
	}

	changeTool(tool) {
		this.setState({ current:tool })
		ToolStore.changeTool(tool);
	}

	render() {
		return <section>
			<ul >
				<li onClick={this.changeTool.bind(this, 'add')}>Add</li>
				<li onClick={this.changeTool.bind(this, 'sos')}>SOS</li>
				<li onClick={this.changeTool.bind(this, 'customcode')}>Code</li>
			</ul>
		</section>
	}
}

export default Nav; 
