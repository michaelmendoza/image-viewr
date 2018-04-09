import React from 'react';
import ToolStore from '../store/tool-store.js';
import SimpleUploadForm from './simple-upload-form.jsx';

class SOS extends React.Component {

	constructor() {
		super();
	}

	onSubmit (ev) {
		ToolStore.doSOS(ev.target);
	}

	render() {
		return <div>
			<section className="leftSide">
				<SimpleUploadForm name="SOS" onSubmit={this.onSubmit} action="/api/image/sos"></SimpleUploadForm>
			</section>
			<section className="rightSide">
				<img className="result" />
			</section>
		</div>
	}
}

export default SOS; 
