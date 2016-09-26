import React from 'react';
import ViewerStore from '../store/viewer-store.js';

class ViewerFilePanel extends React.Component {

	constructor() {
		super();
	}

	render() {


		return (
			<section className='viewer-file-panel'>  
				<h4> Image Files </h4>
				<ul>
					<li> <img src='../src/assets/image.png'/> </li>
					<li> <img src='../src/assets/image.png'/> </li>
					<li> <img src='../src/assets/image.png'/> </li>
					<li> <img src='../src/assets/image.png'/> </li>
				</ul>
			</section>
		);
	}
}

export default ViewerFilePanel;