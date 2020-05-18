import React from 'react';
import ToolStore from '../store/tool-store.js';
import SimpleUploadForm from './simple-upload-form.jsx';

class Add extends React.Component {

	constructor() {
		super();
	}

	onSubmit (ev) {
		ToolStore.doAdd(ev.target);
	}

	render() {
		return (
			<div>
				<section className="leftSide">
					<SimpleUploadForm name="Add" onSubmit={this.onSubmit} action="/api/image/add"></SimpleUploadForm>
				</section>
				<section className="rightSide">
					<img className="result" />
				</section>
				<section className="example-code">
					<h2>Example</h2>
					<h3>Form</h3>
					<pre>
{`	<form method="post" action="/api/image/add" encType="multipart/form-data">
		<input type="file" name="images" multiple />
		<input type="submit" />
	</form>`}
					</pre>
					<h3>Fetch</h3>
					<pre>
{`	let init = {
		method: 'POST,
		body: new FormData(form)
	};	

	fetch('/api/image/add', init)
	.then(function (returnedStream) {
		doStuff(returnedStream);
	});`}
				</pre>
				</section>
			</div>
		);
	}
}

export default Add; 
