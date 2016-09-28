import React from 'react';
import ViewerStore from '../store/viewer-store.js';

class ROIPanel extends React.Component {

	constructor() {
		super();
		this.state = { pixel:{x:'-', y:'-', value:'-'} };
	}

	render() {

		return (
			<div></div>
		);
	}
}

export default ROIPanel;