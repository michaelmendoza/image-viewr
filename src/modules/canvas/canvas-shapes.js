
class CanvasShapes {

	drawLine(canvas, line) {
		var context = canvas.context;
		var controls = canvas.controls;

		var p1 = controls.inverseTransform({ x:line.x1, y:line.y1 });
		var p2 = controls.inverseTransform({ x:line.x2, y:line.y2 });

		context.lineWidth = 2;
		context.strokeStyle = '#4DF94D';
		context.beginPath();
		context.moveTo(p1.x, p1.y);
		context.lineTo(p2.x, p2.y);
		context.globalAlpha = 0.9;
		context.stroke();
		context.globalAlpha = 1.0;
	}

	drawCircle(canvas, roi) { 
		var controls = canvas.controls;
		var context = canvas.context;

		// Set draw styles
		var lineWidth;
		if(roi.isHover) {
			lineWidth = 4;
			context.strokeStyle = '#FFFFFF';			
			context.fillStyle = roi.color;
		} 
		else {
			lineWidth = 2;
			context.strokeStyle = roi.color;
			context.fillStyle = roi.color;
		}

		// Transform to global coordinates
		var x = roi.x * controls.zoom + controls.panX;
		var y = roi.y * controls.zoom + controls.panY;
		var r = roi.radius * controls.zoom;

		// Render 
		r = Math.max(r - (lineWidth / 2), 0);
		context.lineWidth = lineWidth;
		context.beginPath();
		context.arc(x, y, r, 0, 2*Math.PI);
		context.stroke();

		context.globalAlpha = 0.5;
		context.fill();
		context.globalAlpha = 1.0;
	}

	drawRect(canvas, roi) {
		var context = canavs.context;

		context.lineWidth = 5;
		context.strokeStyle = '#4DF94D';
		context.rect(roi.x,roi.y,roi.width,roi.height);
		context.stroke();
	}

	drawCustomShape(canvas, roi) {
		var context = canvas.context;
		var controls = canvas.controls;

		// Set draw styles
		if(roi.isHover) {
			context.lineWidth = 2;
			context.strokeStyle = '#FFFFFF';			
			context.fillStyle = '#FFFFFF';
		} 
		else {
			context.lineWidth = 1;
			context.strokeStyle = roi.color;
			context.fillStyle = roi.color;
		}

		// Transform points to global coordinates
		var points = roi.points.map(function(point) {
			return controls.inverseTransform(point);
		});

		// Draw Points
		points.forEach(function(point) {
			var r = 2;
			if(point == roi.activePoint) {
				r = 6;
			}

			context.beginPath();
			context.arc(point.x, point.y, r, 0, 2*Math.PI);
			context.fill();
		})

		// Render Outline and ROI Fill
		context.fillStyle = roi.color;
		if(points.length > 1) {
			context.moveTo(points[0].x, points[0].y);

			points.forEach(function(point) {
				context.lineTo(point.x, point.y);
			});
			context.stroke();
		}

		if(roi.isClosedShape) {
			context.globalAlpha = 0.5;
			context.fill();
			context.globalAlpha = 1.0;
		}
	}	

}

export default CanvasShapes;
