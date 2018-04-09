
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

	doAdd (form) {
		let that = this;
		this.sendForm(form).then(function (blob) {
			that.displayResult(blob);
		});		
	}

	doSOS (form) {
		let that = this;
		this.sendForm(form).then(function (blob) {
			that.displayResult(blob);
		});
	}

	doCustomCode (form) {
		let that = this;
		this.sendForm(form).then(function (blob) {
			that.displayResult(blob);
		});
	}

	sendForm (form) {
		let init = {
			method: form.method,
			body: new FormData(form)
		};		

		return new Promise(function (resolve, reject) {
			fetch(form.action, init).then(function (stream) {
				stream.blob().then(function (blob) {
					resolve(blob);
				});
			});
		});

	}

	displayResult (blob) {
		var result = document.querySelector('.result');
		let url = URL.createObjectURL(blob);
		result.src = url;
	}

}

export default new ToolStore();
