
import React from 'react';

class Histogram extends React.Component {
	
	componentDidMount() {
		var ref = this.refs.histogram;
		this.props.layer.createHistogram(ref, this.props.width, this.props.height);
	}	

	render() {
		return <div ref="histogram"></div>
	}

}

export default Histogram;