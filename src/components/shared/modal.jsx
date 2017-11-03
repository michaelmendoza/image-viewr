import React from 'react';

/** Modal Component - Base template for modals */
class Modal extends React.Component {

	componentDidMount() {
		this.props.store.on('modal-update', () => {
			this.setState({});
		})
	}
	
	/** Renders modal */
	render() { 
		var show = this.props.show;
		var store = this.props.store;
		var toggle = this.props.toggle;
		var showClass = store[show] ? 'show':'';

		return <div className={'modal-container ' + showClass}>
			<div className='modal-background' onClick={store[toggle]}></div>
			<div className='modal-popup'>
				<div className='modal-toolbar'>
					<h3> {this.props.title} </h3>
					<button className='close-button' onClick={store[toggle]}>
						<i className='material-icons'>close</i>
					</button>
				</div>
				<div className='modal-content'>
				
					Content

				</div>
			</div>
		</div>
	}
}

export default Modal;
