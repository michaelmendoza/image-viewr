
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

}

export default ImageLoad;

