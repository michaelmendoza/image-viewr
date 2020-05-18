import React from 'react';
import ReactDOM from 'react-dom';

import HeaderView from './header-view.jsx';
import MainView from './main-view.jsx';
import SideView from './side-view.jsx';
import FooterView from './footer-view.jsx';

import Tools from '../tools/tools.jsx';

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

		var app = <section className='app-view' onDragOver={this.handleDragOver.bind(this)} onDrop={this.handleDrop.bind(this)}>  
				<HeaderView></HeaderView>
				<SideView></SideView>
				<MainView></MainView>
				<FooterView></FooterView>
			</section>

		var tools = <Tools></Tools>
		var element = window.Debug.APITools ? tools : app;
		return element;
	}
}

ReactDOM.render(<AppView/>, document.getElementById('app-view'));
