
import UIStateStore from '../store/ui-state-store.js';
import ViewerStore from '../store/viewer-store.js';
import React from 'react';

class SideView extends React.Component {

	componentDidMount() {
		UIStateStore.on('state-update', () => {
			this.setState({});
		})
		ViewerStore.Viewr.on('file-loaded', () => {
			this.setState({})
		}) 
	} 

	handleClick() {
		UIStateStore.setState(this);
	}

	render() {
		var disabled = ViewerStore.isFileLoaded() ? '' : '-disabled';

		return (
			<section className='side-view'> 
				<button className="nav-button" onClick={this.handleClick.bind('default')}><i className="material-icons">apps</i></button>
				<button className="nav-button" onClick={this.handleClick.bind('file')}><i className="material-icons">insert_drive_file</i></button>		
				<button className={"nav-button" + disabled} onClick={this.handleClick.bind('stats')}><i className="material-icons">subject</i></button>	
				<button className={"nav-button" + disabled} onClick={this.handleClick.bind('image-layers')}><i className="material-icons">list</i></button>
				<button className={"nav-button" + disabled} onClick={this.handleClick.bind('layers')}><i className="material-icons">layers</i></button>
				<button className={"nav-button" + disabled} onClick={this.handleClick.bind('threshold')}><i className="material-icons">equalizer</i></button>
				<button className="nav-button" onClick={this.handleClick.bind('image-node')}><i className="material-icons">code</i></button>
			</section>
		);
	}
}

export default SideView;
