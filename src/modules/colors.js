
class Colors {

	constructor() {
		this.colorIndex = 0;
		this.colors = ['#FF0000', '#FF8900', '#F6FF00', '#00FF1B', '#00FFE4', '#0092FF', '#0024FF', '#6D00FF', '#F600FF', '#FF0076', '#FF0004'];
	}

	getColor() {
		var index = this.colorIndex++ % this.colors.length;
		return this.colors[index];
	}

	getRandomColor() {
		var r = Math.round(Math.random() * 255);
		var g = Math.round(Math.random() * 255);
		var b = Math.round(Math.random() * 255);
		return this.rgbToHex(r,g,b);
	}

	componentToHex(c) {
		var hex = c.toString(16);
		return hex.length == 1 ? "0" + hex : hex;
	}

	rgbToHex(r, g, b) {
		return "#" + this.componentToHex(r) + this.componentToHex(g) + this.componentToHex(b);
	}


}

export default new Colors();