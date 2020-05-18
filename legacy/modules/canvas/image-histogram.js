
import * as d3 from 'd3';

class ImageHistogram {

	constructor(pixelData, minValue, maxValue, binCount, zoomToFit = false) {
		this.pixelData = pixelData;
		this.minValue = minValue;
		this.maxValue = maxValue;
		this.binCount = binCount;
		this.zoomToFit = zoomToFit;
		this.createHistogram(binCount);
	}
	
	createHistogram(binCount) { 	
		this.binCount = binCount || this.binCount || 100;
		this.step = (this.maxValue - this.minValue) / this.binCount;

		// Create an zero array
		this.bins = [];
		for(var i = 0; i < this.binCount; i++) {
			this.bins.push(0);
		}

		// Create histogram 
		this.pixelCount = this.pixelData.length;
		for(var i = 0; i < this.pixelCount; i++) {
			var value = this.pixelData[i];
			if(this.minValue <= value && value <= this.maxValue) {
				var index = Math.floor((value - this.minValue) / this.step);
				if(index < this.binCount)
					this.bins[index] += 1;			
			}
		}
	}

	updateHistogram(min, max) {
		this.minValue = min > 0 ? min : 0;
		this.maxValue = max;
		this.createHistogram();
		this.delete();
		this.createHistogramSVG();
	}

	delete() {
		d3.select(this.element).select("svg").remove();
	}

	createHistogramSVG(element, width, height) {

		this.element = element || this.element; 
		this.width = width || this.width || 200; 
		this.height = height || this.height || 100;

		width = parseInt(this.width);
		height = parseInt(this.height); 
		var margin = { left:0, right:0, top:0, bottom: 12}

		var data = this.bins; 
		var svg = d3.select(this.element)
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

		width = width - margin.left - margin.right;
		height = height - margin.bottom - margin.top;

		// Get Scale
		var y = d3.scaleLinear()
			.domain([0 , ymax])
			.range([0, height]);

		var x = d3.scaleLinear()
			.domain([pmin , pmax])
			.range([0, width]);

		var barthickness = width / this.binCount;
		//var xzoom = this.maxValue / (pmax - pmin);
		var dx = 1.0;
		var dy = 1.0;
		var xOffset = 0;
			
		g.append('text')
			.attr("x", 0).attr("y", height + margin.bottom - 6)
			.attr("fill", "#222222")
			.attr("text-anchor", "start")
			.attr("alignment-baseline", "central")
			.style("font-size", "8px")
			.text(this.minValue)

		g.append('text')
			.attr("x", width).attr("y", height + margin.bottom - 6)
			.attr("fill", "#222222")
			.attr("text-anchor", "end")
			.attr("alignment-baseline", "central")
			.style("font-size", "8px")
			.text(this.maxValue)

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
			//.attr('transform', 'translate(0, 0) scale(' + xzoom + ', 1)')
			
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
			/*
			.on('wheel.zoom', () => {
				d3.event.stopPropagation();
				d3.event.preventDefault();
				dx = d3.event.wheelDeltaX / 100 + dx;
				dy = d3.event.wheelDeltaY / 100 + dy;
				//g.selectAll('rect').attr('transform', 'translate(0, 0) scale(' + (xzoom * dy) + ', 1)')
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
			*/
	}
}

export default ImageHistogram;