import React from 'react';
import ToolStore from '../store/tool-store.js';

class UploadForm extends React.Component {

	constructor() {
		super();
		this.addFiles = this.addFiles.bind(this);
	}

	addFiles () {
		document.getElementById('file-input-label').innerHTML = document.getElementById('file-input').files.length + ' Files Selected';
		this.createInputTiles(document.getElementById('file-input').files);
	}

	createInputTiles (files) {
		document.querySelector('.previews').innerHTML = '';
		Object.keys(files).forEach(function (key) {
			let prev = document.createElement('IMG');
			document.querySelector('.previews').appendChild(prev);
			prev.src =  URL.createObjectURL(files[key]);
		});
	}

	onSubmit (ev) {
		ev.preventDefault();
		this.props.onSubmit(ev);
	}

	render() {
		return (
			<form method="post" action={this.props.action} encType="multipart/form-data" onSubmit={this.onSubmit.bind(this)}>
				<fieldset>
					<legend>{this.props.name}</legend>
					<div className="input-container">
						<input type="file" name="images" id="file-input" className="inputfile" onChange={this.addFiles} multiple />
						<label htmlFor="file-input" id="file-input-label">Choose Images...</label>
					</div>
					<div className="input-container">
						<input type="submit" value={this.props.name} className="submit-button" />
					</div>
					<div className="previews"></div>
				</fieldset>
			</form>
		)
	}
}

export default UploadForm; 
