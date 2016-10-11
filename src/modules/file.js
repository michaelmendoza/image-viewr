
class File {
	constructor() {
		super();
	}

	readPNG(file, event) {
		var img = document.createElement('img');
		img.src = event.target.result;
		return { filename:file.name, type:'png', img:img };
	}		

}

export default File;