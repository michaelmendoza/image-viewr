
import colormap from 'colormap';

/** Creates a variety of colormaps and colorscales for images */
class ColorMap {

	/** Setup colormap with default colormap - greys */
	constructor() {
		this.options =  {
			colormap: 'greys',
			nshades: 72,
			format: 'hex',
			alpha: 1
		}
		this.colormap = colormap(this.options);
		this.options.format = 'rgb';
		this.colormapRGB = colormap(this.options);
	}

	/** Sets colormap based on name, and renders a colorscale if a canvas is supplied */
	setColorMap(colormap_name, canvas) {
		this.options.colormap = colormap_name;
		this.options.format = 'hex';		
		this.colormap = colormap(this.options);
		this.options.format = 'rgb';
		this.colormapRGB = colormap(this.options);		
		if(canvas) this.renderColorscale(canvas);
	}

	/** Renders a colorscale for current colormap */
	renderColorscale(canvas) { 
		canvas = canvas || document.createElement('canvas');
		var context = canvas.getContext('2d');
		canvas.width = 260;
		canvas.height = 40;

		var step = canvas.width / this.options.nshades;
		for(var i = 0; i < this.options.nshades; i++) {
			context.fillStyle = this.colormap[i];
			context.fillRect(i * step, 0, step, canvas.height);
		}

		return canvas;
	}

	/** Returns whether or not the current colormap is valid for use */
	isValid() {
		if(this.options.colormap == 'jet')
			return true;
		else 
			return false;
	}

	/** Returns the rgb values from the colormap for a given grey value */
	getRGB(value) { 
		var dv = this.options.nshades / 256.0;
		value = Math.floor(value * dv);
		return this.colormapRGB[value];
	}

}

export default ColorMap;
