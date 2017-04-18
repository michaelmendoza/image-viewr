
import Shaders from './shaders.js';

// Imgs -> 4096 -> 16tiles x 16tiles -> 256 x 256 pixels per tile 

var VolumeRenderThreeJS = function(renderProps) {

	var image = document.createElement('img');
	var imageTexture = new THREE.Texture(image);
	image.src = renderProps.imgURL;

	//Load the 2D texture containing the Z slices.
	image.onload = function() {
		imageTexture.needsUpdate = true;
		imageTexture.generateMipmaps = false; 
		imageTexture.minFilter = THREE.LinearFilter;
		imageTexture.magFilter = THREE.LinearFilter;
		renderProps.imageTexture = imageTexture;

		VolumeRender(renderProps);
	}
}

var VolumeRender = function(renderProps) {
	var container, containerSize;
	var camera, sceneFirstPass, sceneSecondPass, renderer;
	var clock = new THREE.Clock();
	var rtTexture, transferTexture;
	var guiControls;
	var materialSecondPass;

	init();
	animate();
	
	function init() {
		//Parameters that can be modified.
		guiControls = renderProps;
		container = document.getElementById( renderProps.id );
		containerSize = {
			width:container.parentElement.offsetWidth, 
			height:container.parentElement.offsetHeight 
		};
		camera = new THREE.PerspectiveCamera( 40, containerSize.width / containerSize.height, 0.01, 3000.0 );
		camera.position.z = 2.0;
		var controls = new THREE.OrbitControls( camera, container );
		controls.center.set( 0.0, 0.0, 0.0 );

		var transferTexture = updateTransferFunction();
		var screenSize = new THREE.Vector2( containerSize.width, containerSize.height );
		
		rtTexture = new THREE.WebGLRenderTarget( 
			screenSize.x, screenSize.y,
			{ minFilter: THREE.LinearFilter,
				magFilter: THREE.LinearFilter,
				wrapS:  THREE.ClampToEdgeWrapping,
				wrapT:  THREE.ClampToEdgeWrapping,
				format: THREE.RGBFormat,
				type: THREE.FloatType,
				generateMipmaps: false} 
		);
		
		var materialFirstPass = new THREE.ShaderMaterial( {
			vertexShader: Shaders.vertexShaderFirstPass, 
			fragmentShader: Shaders.fragmentShaderFirstPass,
			side: THREE.BackSide
		});

		materialSecondPass = new THREE.ShaderMaterial( {
			vertexShader: Shaders.vertexShaderSecondPass,
			fragmentShader: Shaders.fragmentShaderSecondPass,
			side: THREE.FrontSide,
			uniforms: {	tex:  { type: "t", value: rtTexture },
						cubeTex:  { type: "t", value: renderProps.imageTexture },
						transferTex:  { type: "t", value: transferTexture },
						steps : {type: "1f" , value: guiControls.steps },
						alphaFactor : {type: "1f" , value: guiControls.alphaFactor }}
		 });

		sceneFirstPass = new THREE.Scene();
		sceneSecondPass = new THREE.Scene();
		var boxGeometry = new THREE.BoxGeometry(1.0, 1.0, 1.0);
		boxGeometry.doubleSided = true;
		var meshFirstPass = new THREE.Mesh( boxGeometry, materialFirstPass );
		var meshSecondPass = new THREE.Mesh( boxGeometry, materialSecondPass );
		sceneFirstPass.add( meshFirstPass );
		sceneSecondPass.add( meshSecondPass );
		renderer = new THREE.WebGLRenderer();
		container.appendChild( renderer.domElement );

		var gui = new dat.GUI();
		//gui.add(guiControls, 'steps', 0.0, 512.0);
		gui.add(guiControls, 'alphaFactor', 0.01, 5.0).step(0.01);

		//Setup transfer function steps.
		/*
		var step1Folder = gui.addFolder('Step 1');
		var controllerColor1 = step1Folder.addColor(guiControls, 'color1');
		var controllerStepPos1 = step1Folder.add(guiControls, 'stepPos1', 0.0, 1.0);
		controllerColor1.onChange(updateTextures);
		controllerStepPos1.onChange(updateTextures);

		var step2Folder = gui.addFolder('Step 2');
		var controllerColor2 = step2Folder.addColor(guiControls, 'color2');
		var controllerStepPos2 = step2Folder.add(guiControls, 'stepPos2', 0.0, 1.0);
		controllerColor2.onChange(updateTextures);
		controllerStepPos2.onChange(updateTextures);

		var step3Folder = gui.addFolder('Step 3');
		var controllerColor3 = step3Folder.addColor(guiControls, 'color3');
		var controllerStepPos3 = step3Folder.add(guiControls, 'stepPos3', 0.0, 1.0);
		controllerColor3.onChange(updateTextures);
		controllerStepPos3.onChange(updateTextures);

		step1Folder.open();
		step2Folder.open();
		step3Folder.open();
		*/

		onWindowResize();
		window.addEventListener( 'resize', onWindowResize, false );
	}
	
	function updateTextures(value)
	{
		materialSecondPass.uniforms.transferTex.value = updateTransferFunction();
	}
	
	function updateTransferFunction()
	{
		var canvas = document.createElement('canvas');
		canvas.height = 20;
		canvas.width = 256;
		var ctx = canvas.getContext('2d');
		var grd = ctx.createLinearGradient(0, 0, canvas.width -1 , canvas.height - 1);
		grd.addColorStop(guiControls.stepPos1, guiControls.color1);
		grd.addColorStop(guiControls.stepPos2, guiControls.color2);
		grd.addColorStop(guiControls.stepPos3, guiControls.color3);
		ctx.fillStyle = grd;
		ctx.fillRect(0,0,canvas.width -1 ,canvas.height -1 );
		var img = document.getElementById("transferFunctionImg");
		img.src = canvas.toDataURL();
		img.style.width = "256 px";
		img.style.height = "128 px";
		transferTexture =  new THREE.Texture(canvas);
		transferTexture.wrapS = transferTexture.wrapT = THREE.ClampToEdgeWrapping;
		transferTexture.needsUpdate = true;
		return transferTexture;
	}

	function onWindowResize( event ) {
		camera.aspect = containerSize.width / containerSize.height;
		camera.updateProjectionMatrix();
		renderer.setSize( containerSize.width, containerSize.height );
	}

	function animate() {
		requestAnimationFrame( animate );
		render();
	}

	function render() {
		var delta = clock.getDelta();
		//Render first pass and store the world space coords of the back face fragments into the texture.
		renderer.render( sceneFirstPass, camera, rtTexture, true );
		//Render the second pass and perform the volume rendering.
		renderer.render( sceneSecondPass, camera );

		materialSecondPass.uniforms.steps.value = guiControls.steps;
		materialSecondPass.uniforms.alphaFactor.value = guiControls.alphaFactor;
	}
}

export default VolumeRenderThreeJS;