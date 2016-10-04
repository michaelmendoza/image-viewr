import React from 'react';
import ViewerStore from '../store/viewer-store.js';
import ImageFileStore from '../store/image-file-store.js';

class ViewerFilePanel extends React.Component {

	constructor() {
		super();
		this.state = { files:[] };

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
		var imageFile = file.img != null ? file.img.src : file.filename;
		ViewerStore.loadImage(imageFile);
		if(file.type == 'dicom') {
			ViewerStore.loadDicomImage(file);
		}
	}

	render() {

		return (
			<section className='viewer-file-panel' onDragOver={this.handleDragOver.bind(this)} onDrop={this.handleDrop.bind(this)}>  
				<h4> Image Files </h4>
				<div>
					<ul>
						<li onClick={this.handleSelectFile.bind(this, { filename:'../src/assets/image.png', img:null })}> 
							<img src='../src/assets/image.png'/> 
						</li>
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