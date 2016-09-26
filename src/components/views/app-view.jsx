import React from 'react';
import ReactDOM from 'react-dom';

import HeaderView from './header-view.jsx';
import MainView from './main-view.jsx';
import FooterView from './footer-view.jsx';

class AppView extends React.Component {

	render() {
		return (
			<section className='app-view' >  
				<HeaderView></HeaderView>
				<MainView></MainView>
				<FooterView></FooterView>
			</section>
		);
	}
}

ReactDOM.render(<AppView/>, document.getElementById('app-view'));
