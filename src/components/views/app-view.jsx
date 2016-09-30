import React from 'react';
import ReactDOM from 'react-dom';

import HeaderView from './header-view.jsx';
import MainView from './main-view.jsx';
import FooterView from './footer-view.jsx';

class AppView extends React.Component {

	handleDragOver(event) {
		event.stopPropagation();
		event.preventDefault();
		event.dataTransfer.dropEffect = 'none';
	}

	handleDrop(event) {
    event.stopPropagation();
		event.preventDefault();
	}

	render() {
		return (
			<section className='app-view' onDragOver={this.handleDragOver.bind(this)} onDrop={this.handleDrop.bind(this)}>  
				<HeaderView></HeaderView>
				<MainView></MainView>
				<FooterView></FooterView>
			</section>
		);
	}
}

ReactDOM.render(<AppView/>, document.getElementById('app-view'));
