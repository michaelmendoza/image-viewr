
var ImageLoad = function() {

	this.loadImage = (imgFile) => {

		if(imgFile.img != null) {
			this.img = imgFile.img;
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
			this.img.src = imgFile.filename;
		}
	}

}

export default ImageLoad;

