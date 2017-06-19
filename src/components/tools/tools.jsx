import React from 'react';
import Nav from './nav.jsx';
import ToolStore from '../store/tool-store.js';

class Tools extends React.Component {

	constructor(props) {
		super(props);
		
		ToolStore.on('toolupdate', () => {
			this.setState({ });
		})
	}

	render() {
	
		var Add = <div>Add</div>;
		var Stuff = <div>Stuff</div>;
		var View = ToolStore.activeTool == 'add' ? Add : Stuff;

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
