
import ViewerStore from './viewer-store.js';
import EventEmitter from 'events';

class UIStateStore extends EventEmitter {

	constructor() {
		super();

		this.state = 'file';
	}

	getState() {
		return this.state;
	}

	getStates() {
		return [
			'default',
			'file',
			'layers',
			'threshold',
			'image-node'
		]
	}

	setState(newState) {
		if(!ViewerStore.isFileLoaded())
			if(newState == 'layers' || newState == 'threshold')
				return;

		this.state = newState;
		this.emit('state-update');
	}
}

export default new UIStateStore();
