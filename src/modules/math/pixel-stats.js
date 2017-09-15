
/** Based on Dicom data */
class PixelStats {
	

	getMinMax(data) {
		var min = 4096;
		var max = 0;

		var length = data.length;
		for(var i = 0; i < length; i++) { 
			var value = data[i];
			if(value >= 0) {
				if(value < min) min = value;
				if(value > max) max = value;
			}
		}

		return { min:min, max:max };
	}

	getMean(data) {
		var sum = 0;
		var length = data.length;
		for (var i = 0; i < length; i++) {
			var value = data[i];
			if(value >= 0) {
				sum += value;
			}
		}
		return sum / length;
	}

	getStdDev(data) {	
		var sum = 0;
		var sum2 = 0;
		var length =  data.length;
		for (var i = 0; i < length; i += 4) {
			var value = data[i];
			if(value >= 0) {
				sum += value;
				sum2 += value * value;
			}
		}

		var mean = sum / length;
		var mean2 = sum2 / length;

		var variance = mean2 - mean * mean;
		return Math.sqrt(variance);
	} 

}

export default new PixelStats();
