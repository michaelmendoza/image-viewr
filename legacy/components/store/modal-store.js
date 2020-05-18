
import EventEmitter from 'events';

class ModalStore extends EventEmitter {
	constructor() {
		super();
		this.showModal = false;

		this.toggle = this.toggle.bind(this);
	}

	toggle() {
		this.showModal = !this.showModal;
		this.emit('modal-update');
	}
}

export default new ModalStore();