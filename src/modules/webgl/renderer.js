
import Geometry from './geometry.js';
import Program from './program.js';
import { mat4, glMatrix } from 'gl-matrix';

class Renderer {
	constructor(canvas) {
		this.init(canvas);
	}

	init(canvas) {
		this.canvas = canvas;
		this.canvas.width = canvas.parentNode.offsetWidth;
		this.canvas.height= canvas.parentNode.offsetHeight;

		this.gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl');
		if(!this.gl) {
			console.log('Error: Webgl not supported');
			return;
		}

		window.addEventListener('resize', this.onResizeWindow.bind(this));
		window.addEventListener('mousemove', this.onMouseMove.bind(this));

		this.setProps();
		this.program = new Program(this.gl);
		this.startRender();
	}

	setProps() { 
		// Set CPU-side variables for all our shader varibles
		this.props = {};
		this.texture = null;

		this.props.worldMatrix = new Float32Array(16);
		this.props.viewMatrix = new Float32Array(16);
		this.props.projMatrix = new Float32Array(16);
		this.props.xRotationMatrix = new Float32Array(16);
		this.props.yRotationMatrix = new Float32Array(16);
		this.props.identityMatrix = new Float32Array(16);
		
		mat4.identity(this.props.identityMatrix);
		mat4.identity(this.props.worldMatrix);
		mat4.lookAt(this.props.viewMatrix, [0, 0, -3], [0, 0, 0], [0, 1, 0]); // Eye, Center, Up
		mat4.perspective(this.props.projMatrix, glMatrix.toRadian(45), this.canvas.width / this.canvas.height, 0.1, 1000.0);

		this.props.angleX = 0;
		this.props.angleY = 0;
	}

	render() { 
		var gl = this.gl;
		var uniforms = this.program.uniforms;

		mat4.rotate(this.props.yRotationMatrix, this.props.identityMatrix, this.props.angleX, [0, 1, 0]);
		mat4.rotate(this.props.xRotationMatrix, this.props.identityMatrix, this.props.angleY, [1, 0, 0]);
		mat4.mul(this.props.worldMatrix, this.props.xRotationMatrix, this.props.yRotationMatrix);
		gl.uniformMatrix4fv(uniforms.matWorld, gl.FALSE, this.props.worldMatrix);

		gl.clearColor(0.75, 0.85, 0.8, 1.0);
		gl.clear(gl.DEPTH_BUFFER_BIT | gl.COLOR_BUFFER_BIT);
		gl.drawElements(gl.TRIANGLES, Geometry.box.indices.length, gl.UNSIGNED_SHORT, 0);

		requestAnimationFrame(this.render.bind(this));
	}

	startRender() {
		var gl = this.gl;
		var uniforms = this.program.uniforms;
		
		gl.uniformMatrix4fv(uniforms.matWorld, gl.FALSE, this.props.worldMatrix);
		gl.uniformMatrix4fv(uniforms.matView, gl.FALSE, this.props.viewMatrix);
		gl.uniformMatrix4fv(uniforms.matProj, gl.FALSE, this.props.projMatrix);

		requestAnimationFrame(this.render.bind(this));
		this.onResizeWindow();
	}

	onResizeWindow() { 
		var canvas = this.canvas;
		if(!canvas)
			return;

		this.canvas.width = canvas.parentNode.offsetWidth;
		this.canvas.height= canvas.parentNode.offsetHeight;
		this.gl.viewport(0, 0, canvas.width, canvas.height);
	}
	
	onMouseMove(e) {
		if(e.buttons == 1) {
			var canvas = this.canvas;

			var sensitivity = 4;
			var xDelta = sensitivity * (e.movementX / canvas.width);
			var yDelta = sensitivity * (e.movementY / canvas.height);

			this.props.angleX += xDelta;
			this.props.angleY -= yDelta;

			console.log(this.props.angleX, this.props.angleY);
		}
	}

}

export default Renderer;