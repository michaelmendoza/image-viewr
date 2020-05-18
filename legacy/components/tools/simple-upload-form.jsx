import React from 'react';
import ToolStore from '../store/tool-store.js';

class SimpleUploadForm extends React.Component {

	constructor(props) {
		super(props);
		this.state = {
			uploads: false
		}
		this.files = [];
		this.addFiles = this.addFiles.bind(this);
	}

	addFiles (ev) {
		this.files = ev.nativeEvent.target.files;
		this.setState({ uploads: true });
	}

	onSubmit (ev) {
		ev.preventDefault();
		this.props.onSubmit(ev);
	}

	render() {

		let upload_label = this.state.uploads ? this.files.length + ' Files Selected' : 'Choose Images...';
		let files = [];
		let that = this;
		Object.keys(this.files).forEach(function (key) {
			files.push(
				<img key={key} src={URL.createObjectURL(that.files[key])} />
			);
		})

		return (
			<form method="post" name={this.props.name} action={this.props.action} encType="multipart/form-data" onSubmit={this.onSubmit.bind(this)}>
				<fieldset>
					<legend>{this.props.name}</legend>
					<div className="input-container">
						<input type="file" name="images" id="file-input" className="inputfile" onChange={this.addFiles.bind(this)} multiple />
						<label htmlFor="file-input" id="file-input-label">{ upload_label }</label>
					</div>
					<div className="input-container">
						<input type="submit" value={this.props.name} className="submit-button" />
					</div>
					<div className="previews">
						{ files }
					</div>
				</fieldset>
			</form>
		);
	}
}

export default SimpleUploadForm; 
