import React from 'react';
import ImageFileStore from '../store/image-file-store.js';

class ViewerStatsPanel extends React.Component {

	getLabels() {
		var file = ImageFileStore.getCurrentFile();
		var labels = ['filename', 'type', 'width', 'height', 'header'];

		return labels.map((label) => {
			if(label == 'header' && file[label])
				return this.getDicomHeader()
			else if(file[label]) 
				return <label>{label}: {file[label]} </label>
		})
	}

	getDicomHeader() {
		var file = ImageFileStore.getCurrentFile();
		var header = file['header'];
		if(header) {
			var keys = Object.keys(header);
			return <div className='header-info'>
				<h4>Dicom Header Information: </h4>
				{ 
					keys.map((key) => {
						return  <label>{key}: {header[key]} </label>; 
					}) 
				}
			</div>	
		}
		else 
			return null;
	}

	render() {
		return (
				<section className='panel viewer-stats-panel'>
				<h4 className='panel-title'>
					<label> File Information </label>
				</h4>
				
				<div className="labels">
				{
					this.getLabels().map((label) => { return label; })
				}
				</div>

				</section>		
		);
	}	

}

export default ViewerStatsPanel;
