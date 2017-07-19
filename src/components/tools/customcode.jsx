import React from 'react';
import ToolStore from '../store/tool-store.js';

class CustomCode extends React.Component {

	constructor() {
		super();
		this.state = {
			uploads: false
		}
		this.files = [];
	}

	onChange (ev) {
		this.files = ev.nativeEvent.target.files;
		this.setState({ uploads: true });
	}

	onSubmit (ev) {
		ToolStore.doCustomCode(ev.target);
	}

	render() {
		let upload_label = this.state.uploads ? this.files.length + ' Files Selected' : 'Choose Images...';

		return (
			<div>
				<section className="leftSide">
					<form method="post" name="custom-code" action="/api/image/customcode" encType="multipart/form-data" onSubmit={this.onSubmit.bind(this)}>
						<fieldset>
							<legend>Custom Code</legend>
							<div className="input-container">
								<input type="file" name="images" id="file-input" className="inputfile" onChange={this.onChange.bind(this)} multiple />
								<label htmlFor="file-input" id="file-input-label">{ upload_label }</label>
							</div>
							<div className="input-container">
								<textarea name="custom-code-input"></textarea>
							</div>
							<div className="input-container">
								<input type="submit" value="Custom Code" className="submit-button" />
							</div>
							<div className="previews"></div>
						</fieldset>
					</form>
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
		<textarea name="code"></textarea>
		<input type="submit" />
	</form>`}
					</pre>
					<h3>Exposed Variables and Methods</h3>
					<pre>
{`	Variables:
		"images": array of png images

	Methods:
		"show()": set return image
		"toNumPy()": get int64 numpy array
		"toPNG()": convert numpy back to PNG

	Examples:

		# Send back the first image sent:
		show(images[0])

		# Add two images together:
		im1 = toNumPy(images[0])
		im2 = toNumPy(images[1])
		show(toPNG(sum([im1, im2])))
	
`}
					</pre>
				</section>
			</div>
		);
	}
}

export default CustomCode; 
