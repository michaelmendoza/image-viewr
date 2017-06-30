import React from 'react';
import ToolStore from '../store/tool-store.js';
import UploadForm from './upload-form.jsx';

class Add extends React.Component {

	constructor() {
		super();
	}

	onSubmit (ev) {
		ToolStore.doAdd(ev.target);
	}

	render() {
		return <div>
			<section className="leftSide">
				<UploadForm name="Add" onSubmit={this.onSubmit} action="http://localhost:3001/api/image/add"></UploadForm>
			</section>
			<section className="rightSide">
				<img className="result" />
			</section>
		</div>
	}
}

export default Add; 
