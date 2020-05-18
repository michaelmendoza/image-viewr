
import Geometry from './geometry.js';
import Shaders from './shaders.js';

class Program { 
	constructor(gl) {
		this.gl = gl;
		this.initProgram();
	}

	initProgram(loadedShaders) {
		this.program = this.createProgram();
		this.setupShaders(this.program);
		this.uniforms = this.setupUniforms(this.program);
	}
	
	createProgram() { 
		var gl = this.gl;

		gl.clearColor(0.75, 0.85, 0.8, 1.0);
		gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
		gl.enable(gl.DEPTH_TEST); // Depth test
		gl.enable(gl.CULL_FACE);  // Enable back-face culling i.e. don't calculate back faces not in view
		gl.frontFace(gl.CCW);
		gl.cullFace(gl.BACK);

		var vs = gl.createShader(gl.VERTEX_SHADER);
		gl.shaderSource(vs, Shaders.vertexShader);
		gl.compileShader(vs);
		if (!gl.getShaderParameter(vs, gl.COMPILE_STATUS)) {
			console.log('Error: Unable to compile vertex shader', gl.getShaderInfoLog(vs));
		}

		var fs = gl.createShader(gl.FRAGMENT_SHADER);
		gl.shaderSource(fs, Shaders.fragmentShader);
		gl.compileShader(fs);
		if (!gl.getShaderParameter(fs, gl.COMPILE_STATUS)) {
			console.log('Error: Unable to compile fragment shader', gl.getShaderInfoLog(fs));
		}

		var program = gl.createProgram();
		gl.attachShader(program, vs);
		gl.attachShader(program, fs);
		gl.linkProgram(program);
		if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
			console.log('Error: Shader Program Link Error', gl.getProgramInfoLog(program));
		}
		gl.validateProgram(program);
		if (!gl.getProgramParameter(program, gl.VALIDATE_STATUS)) {
			console.log('Error: Shader Program Validate Error', gl.getProgramInfoLog(program));
		}
		gl.useProgram(program);

		return program;
	}

	setupShaders(program) { 
		var gl = this.gl;

		var boxVertices = Geometry.box.vertices;
		var boxIndices = Geometry.box.indices;

		var boxVertexBufferObject = gl.createBuffer();
		gl.bindBuffer(gl.ARRAY_BUFFER, boxVertexBufferObject);
		gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(boxVertices), gl.STATIC_DRAW);

		var boxIndexBufferObject = gl.createBuffer();
		gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, boxIndexBufferObject);
		gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Uint16Array(boxIndices), gl.STATIC_DRAW);

		var positionAttribLocation = gl.getAttribLocation(program, 'vertPosition');
		var colorAttribLocation = gl.getAttribLocation(program, 'vertColor');
		gl.vertexAttribPointer(
			positionAttribLocation, // Attribute location
			3, // Number of elements per attribute
			gl.FLOAT, // Type of elements
			gl.FALSE,
			6 * Float32Array.BYTES_PER_ELEMENT, // Size of an indiviual vertex
			0 // Offset from the beginning of a single vertex to this attribute
		);
		gl.vertexAttribPointer(
			colorAttribLocation, // Attribute location
			3, // Number of elements per attribute
			gl.FLOAT, // Type of elements
			gl.FALSE,
			6 * Float32Array.BYTES_PER_ELEMENT, // Size of an indiviual vertex
			3 * Float32Array.BYTES_PER_ELEMENT // Offset from the beginning of a single vertex to this attribute
		);

		gl.enableVertexAttribArray(positionAttribLocation);
		gl.enableVertexAttribArray(colorAttribLocation);
	}

	setupUniforms(program) { 
		var gl = this.gl;
		
		// Get uniform locations
		var uniforms = {
			matWorld: gl.getUniformLocation(program, 'mWorld'),
			matView: gl.getUniformLocation(program, 'mView'),
			matProj: gl.getUniformLocation(program, 'mProj'),
			uSampler: gl.getUniformLocation(program, 'uSampler')
		}

		return uniforms;
	}

	setupTexture(image) {
		var gl = this.gl;
		var texture = gl.createTexture();

	  gl.bindTexture(gl.TEXTURE_2D, texture);
	  gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, image);
		gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
		gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);	  
	  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
	  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR_MIPMAP_NEAREST);
	  gl.generateMipmap(gl.TEXTURE_2D);
		//gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
		//gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR); 
	  gl.bindTexture(gl.TEXTURE_2D, null);
	  return texture;
	}

}

export default Program;