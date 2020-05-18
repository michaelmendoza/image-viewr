import React from 'react';
import ViewerStore from '../store/viewer-store.js';
import ImageFileStore from '../store/image-file-store.js';

class ViewerFilePanel extends React.Component { 

	constructor() {
		super();
		this.state = { files:ImageFileStore.getLoadedFiles() };

		ImageFileStore.on('filesloaded', () => {
			var files = ImageFileStore.getLoadedFiles();
			this.setState({ files:files });
		})		
	}
	
	handleDragOver(event) {
		event.stopPropagation();
		event.preventDefault();
		event.dataTransfer.dropEffect = 'copy';
	}

	handleDrop(event) {
    event.stopPropagation();
		event.preventDefault();
		ImageFileStore.readFile(event);
	}

	handleSelectFile(file) {
		ImageFileStore.setCurrentFile(file);
		ViewerStore.loadFile(file);
	}

	render() {

		var defaultImage = <li onClick={this.handleSelectFile.bind(this, { filename:'../src/assets/image.png', img:null })}> 
			<img src='../src/assets/image.png'/>
		</li>
		
		return (
			<section className='viewer-file-panel panel' onDragOver={this.handleDragOver.bind(this)} onDrop={this.handleDrop.bind(this)}>  
				<h4 className='panel-title'> <label> Image Files </label> </h4> 
				<div>
					<ul>
						{
							this.state.files.map(function(file, index) {
								var src = file.img !== undefined ? file.img.src : '../src/assets/d.jpg';
								return <li key={index} onClick={this.handleSelectFile.bind(this, file)}> 
									<img src={src}/> 
								</li>
							}.bind(this))
						}
					</ul>
					<div className='load-image-file'> 
						<i className='material-icons'>add</i> 
						<span>Drag Files Here</span> 
					</div> 	
				</div>			
			</section>
		);
	}
}

export default ViewerFilePanel;