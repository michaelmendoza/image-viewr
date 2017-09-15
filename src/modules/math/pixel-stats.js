
/** Based on Dicom data */
class PixelStats {
	

	getMinMax(data, threshold) {
		var min = 4096;
		var max = 0;

		var length = data.length;
		for(var i = 0; i < length; i++) { 
			var value = data[i];
			if(value >= 0 && value >= threshold.min && value <= threshold.max) {
				if(value < min) min = value;
				if(value > max) max = value;
			}
		}

		return { min:min, max:max };
	}

	getMean(data, threshold) {
		var sum = 0;
		var length = data.length;
		for (var i = 0; i < length; i++) {
			var value = data[i];
			if(value >= 0 && value >= threshold.min && value <= threshold.max) {
				sum += value;
			}
		}
		return sum / length;
	}

	getStdDev(data, threshold) {	
		var sum = 0;
		var sum2 = 0;
		var length =  data.length;
		for (var i = 0; i < length; i++) {
			var value = data[i];
			if(value >= 0 && value >= threshold.min && value <= threshold.max) {
				sum += value;
				sum2 += value * value;
			}
		}

		var mean = sum / length;
		var mean2 = sum2 / length;

		var variance = mean2 - mean * mean;
		return Math.sqrt(variance);
	} 

	getCount(data, threshold) {
		var count = 0;
		var length = data.length;
		for (var i = 0; i < length; i ++) {
			var value = data[i];
			if(value >= 0 && value >= threshold.min && value <= threshold.max) {
				count++;
			}
		}
		return count;
	}

}

export default new PixelStats();
