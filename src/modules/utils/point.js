
class Point {
	constructor(x, y) {
		this.x = x;
		this.y = y;

		this.size = 4;
	}

	isOnPoint(x, y) {
		var distance = (this.x - x) * (this.x - x) + (this.y - y) * (this.y - y);
		return distance < this.size * this.size;
	}
}

export default Point;