
import React from 'react';

class Slider extends React.Component {
	render() {
		return <span className='zoom-slider slider'>
			<input type="range" name="zoom" value="0" min="10" max="100"/>
		</span>;
	}
}

export default Slider;
