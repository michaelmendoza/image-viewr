
import EventEmitter from 'events';

class ToolStore extends EventEmitter {

	constructor() {
		super();

		this.activeTool = 'add';
	}

	changeTool(tool) {
		this.activeTool = tool;
		this.emit('toolupdate');
	}

	doAdd() {
		 
	}

}

export default new ToolStore();
