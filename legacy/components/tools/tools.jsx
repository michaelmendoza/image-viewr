import React from 'react';
import Nav from './nav.jsx';
import ToolStore from '../store/tool-store.js';
import Add from './add.jsx';
import SOS from './sos.jsx';
import CustomCode from './customcode.jsx';

class Tools extends React.Component {

	constructor(props) {
		super(props);
		
		ToolStore.on('toolupdate', () => {
			this.setState({ });
		})
	}

	render() {
	
		let View = {
			'add': <Add></Add>,
			'sos': <SOS></SOS>,
			'customcode': <CustomCode></CustomCode>
		}[ToolStore.activeTool];

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
