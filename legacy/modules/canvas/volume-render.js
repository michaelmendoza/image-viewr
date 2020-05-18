import Renderer from '../webgl/renderer.js';
import VolumeRenderThreeJS from '../threejs/volume-render.js';

class VolumeRender {

	constructor() {
		this.renderProps = {
			steps: 256.0,
			alphaFactor: 1.0,
			color1: "#000000",
			stepPos1: 0.1,
			color2: "#b6b6b6",
			stepPos2: 0.5,
			color3: "#FFFFFF",
			stepPos3: 1.0
		}
	}

	updateAlphaFactor(alphaFactor) {
		this.renderProps.alphaFactor = alphaFactor;
	}	

	render(elementID, imgURL) {
		//var canvas = document.getElementById(elementID);		
		//var renderer = new Renderer(canvas);
		this.renderProps.id = elementID;
		this.renderProps.imgURL = imgURL;
		this.renderer = VolumeRenderThreeJS(this.renderProps);
	}
}

export default VolumeRender;