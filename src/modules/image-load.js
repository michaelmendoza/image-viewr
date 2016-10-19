
var ImageLoad = function() {

	this.loadImage = (imgFile) => {
		this.img = new Image();

		this.img.onload = function() {
			var context = this.context;
			this.width = this.img.width;
			this.height = this.img.height;
			this.img.crossOrigin = "Anonymous";
			context.drawImage(this.img, 0, 0);
			
		}.bind(this)

		this.img.src = imgFile;	
	}

}

export default ImageLoad;

