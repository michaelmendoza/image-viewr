
import * as d3 from 'd3';

class ImageHistogram {

	constructor(pixelData, maxValue, binCount, zoomToFit = false) {
		this.pixelData = pixelData;
		this.maxValue = maxValue;
		this.binCount = binCount;
		this.zoomToFit = zoomToFit;
		this.createHistogram(binCount);
	}
	
	createHistogram(binCount = 100) { 	
		this.binCount = binCount;
		this.step = this.maxValue / this.binCount;

		// Create an zero array
		this.bins = [];
		for(var i = 0; i < this.binCount; i++) {
			this.bins.push(0);
		}

		// Create histogram
		this.pixelCount = this.pixelData.length;
		for(var i = 0; i < this.pixelCount; i++) {
			var value = this.pixelData[i];
			var index = Math.floor(value / this.step);
			this.bins[index] += 1;
		}
	}

	createHistogramSVG(element, width = 200, height = 100) {

		var data = this.bins; 
		var svg = d3.select(element)
		    .append("svg")
		    .attr("width", width)
		    .attr("height", height)	

		var g = svg.append("g")
		var color = '#0C5BA6';

		// Histogram Min and Max Values
		var ymin = d3.min(data, function (d) { return d; });
		var ymax = d3.max(data, function(d) { return d; });

		// Pixel Min/Max Values
		var pmin = d3.min(this.pixelData, function (d) { return d; });
		var pmax = d3.max(this.pixelData, function(d) { return d; });

		// Get Scale
		var y = d3.scaleLinear()
			.domain([0 , ymax])
			.range([0, height]);

		var x = d3.scaleLinear()
			.domain([pmin , pmax])
			.range([0, width]);

		var barthickness = width / this.binCount;
		var xzoom = this.maxValue / (pmax - pmin);
		var dx = 1.0;
		var dy = 1.0;
		var xOffset = 0;
		
		g.selectAll("rect")
			.data(data)
			.enter()
			.append("rect")
			.attr("x", function(d, i) { return barthickness * i; })
			.attr("width", barthickness)
			.attr("y", function(d) { return height; })
			.attr("height", function(d) { return 0; })
			.attr("ry", 2.5)
			.attr("ry", 2.5)
			.attr("fill", color)
			.attr('transform', 'translate(0, 0) scale(' + xzoom + ', 1)')

		g.selectAll('rect')
			.transition()
			.duration(500)				
			.attr("y", function(d,i) { return height - y(d); })
			.attr("height", function(d, i) { return y(d); })

		var box = svg.append('rect')
			.attr("x", 0).attr("width", width)
			.attr("y", 0).attr("height", height)
			.attr("fill", "#FEFEFE")
			.attr("opacity", 0)
			.on('wheel.zoom', () => {
				d3.event.stopPropagation();
				d3.event.preventDefault();
				dx = d3.event.wheelDeltaX / 100 + dx;
				dy = d3.event.wheelDeltaY / 100 + dy;
				g.selectAll('rect').attr('transform', 'translate(0, 0) scale(' + (xzoom * dy) + ', 1)')
			})
			.call(d3.drag()
				.on("start", dragstarted)
				.on("drag", dragged)
				.on("end", dragended));

			function dragstarted(d) {
				
			}
			
			function dragged(d) {
				var dx = d3.event.x - xOffset;
				g.selectAll('rect').attr("transform", "translate(" + dx + ',' + 0 + ") ");
				xOffset = d3.event.x;
			}

			function dragended(d) {
				
			}

	}
}

export default ImageHistogram;