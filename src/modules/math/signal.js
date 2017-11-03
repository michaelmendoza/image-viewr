
class Signal {
	constructor() {
		this.sample_period;
		this.sample_rate;
	}

	linspace(start, stop, length) {
		var result = Array(length)
		for (var i = 0; i < length - 1; i++) {
			result[i] = start + (stop - start) / (length - 1) * i;
		}
		result[length - 1] = stop;
		return result;
	}

	linspace2D(xMin, xMax, Nx, yMin, yMax, Ny) { 
		var x = this.linspace(xMin, xMax, Nx);
		var y = this.linspace(yMin, yMax, Ny);
		var result = Array(Nx * Ny);

		var count = 0;
		for (var i = 0; i < Nx - 1; i++)
			for (var j = 0; j < Ny -1; j++ )
				result[count++] = { x:x[i], y:y[j] };
		return result;
	}

	generateSignal() {

	}

	generateNoisySignal() {

	}

	exponential(x, scale, lambda) {
		var length = x.length;
		var result = Array(length);
		for(var i = 0; i < length; i++)
			result[i] = scale * Math.exp(-lambda * x[i])
		return result;
	} 

	biexponential(x, scale, lambda, x2, lambda2) {
		var length = x.length;
		var result = Array(length);
		for(var i = 0; i < length; i++)
			result[i] = scale * Math.exp(-lambda * x[i]) + scale2 * Math.exp(-lambda2 * x[i]);
		return result;
	}

	gaussian(x, scale, mean, stdDev) { 
		var length = x.length;
		var result = Array(length);
		for (int i = 0; i < length; i++)
			result[i] = scale * Math.exp(-(x[i] - mean) * (x[i] - mean) / (2 * stdDev * stdDev));
		return result;
}

export default Signal;
