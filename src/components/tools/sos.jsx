import React from 'react';
import ToolStore from '../store/tool-store.js';
import UploadForm from './upload-form.jsx';

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
				<UploadForm name="SOS" onSubmit={this.onSubmit} action="http://localhost:3001/api/image/sos"></UploadForm>
			</section>
			<section className="rightSide">
				<img className="result" />
			</section>
		</div>
	}
}

export default SOS; 
