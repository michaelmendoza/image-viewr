import React from 'react';

class Add extends React.Component {

	constructor() {
		super();
		this.addFiles = this.addFiles.bind(this);
	}

	addFiles () {
		document.getElementById('file-input-label').innerHTML = document.getElementById('file-input').files.length + ' Files Selected';
		this.createInputTiles(document.getElementById('file-input').files);
	}

	createInputTiles (files) {
		Object.keys(files).forEach(function (key) {
			let prev = document.createElement('IMG');
			document.querySelector('.previews').appendChild(prev);
			prev.src =  URL.createObjectURL(files[key]);
		});
	}

	getResult (ev) {
		ev.preventDefault();
		ev.stopPropagation();

		let headers = new Headers();
		let data = new FormData(ev.target);

		let init = {
			headers: headers,
			method: ev.target.method,
			body: data,
			mode: 'cors'
		};		

		let that = this;
		fetch(ev.target.action, init).then(function (stream) {
			stream.blob().then(function (blob) {
				that.displayResult(blob);
			});
		});
	}

	displayResult (blob) {
		var result = document.querySelector('.result');
		let url = URL.createObjectURL(blob);
		result.src = url;
	}

	render() {
		return <div>
			<section className="leftSide">
				<form method="post" action="http://localhost:3001/api/image/add" encType="multipart/form-data" onSubmit={this.getResult.bind(this)}>
					<div className="input-container">
						<input type="file" name="images" id="file-input" className="inputfile" onChange={this.addFiles} multiple />
						<label htmlFor="file-input" id="file-input-label">Choose Images...</label>
					</div>
					<div className="input-container">
						<input type="submit" value="Add" className="submit-button" />
					</div>
				</form>
				<div className="previews"></div>
			</section>
			<section className="rightSide">
				<img className="result" />
			</section>
		</div>
	}
}

export default Add; 
