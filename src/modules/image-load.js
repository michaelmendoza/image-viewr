
var ImageLoad = function() {

	this.loadFile = (file) => {

		this.file = file;

		if(file.img != null) {
			this.img = file.img;
			this.width = this.img.width;
			this.height = this.img.height;
			this.drawImage();
		}
		else {
			this.img = new Image();
			this.img.onload = function() {
				var context = this.context;
				this.width = this.img.width;
				this.height = this.img.height;
				this.img.crossOrigin = "Anonymous";
				this.drawImage();
			}.bind(this)
			this.img.src = file.filename;
		}
	}

	this.loadFileInFileSet = (indexMove) => {
		
			var index = this.file.activeIndex + indexMove;
			index = index < 0 ? 0 : index;
			index = index >= this.file.fileset.length ? this.file.fileset.length - 1 : index;
			this.file.activeIndex = index;

			this.img = new Image();
			this.img = this.file.fileset[index].img;
			this.width = this.img.width;
			this.height = this.img.height;
			this.drawImage();
	}

}

export default ImageLoad;

