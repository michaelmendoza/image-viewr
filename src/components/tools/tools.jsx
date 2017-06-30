import React from 'react';
import Nav from './nav.jsx';
import ToolStore from '../store/tool-store.js';
import Add from './add.jsx';
import SOS from './sos.jsx';

class Tools extends React.Component {

	constructor(props) {
		super(props);
		
		ToolStore.on('toolupdate', () => {
			this.setState({ });
		})
	}

	render() {
	
		var View = ToolStore.activeTool == 'add' ? <Add></Add> : <SOS></SOS>;

		return (
			<div className='api-tools'> 
				<header>API Tools</header>
				<Nav></Nav>
				{ View } 
			</div>
		);
	}
}

export default Tools; 
