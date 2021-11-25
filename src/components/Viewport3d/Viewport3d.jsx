import React, { useContext, useEffect, useRef } from 'react';
import { AppContext } from  '../../contexts/AppContext';
import * as THREE from 'three';
import { fragment, vertex } from './DataTexture2DShaders';

var camera, scene, mesh, renderer;
const planeWidth = 50;
const planeHeight = 50;

let depthStep = 0.4;

const Viewport3d = ({width = 1200, height = 600}) => {
    const ref = useRef();
    const { state } = useContext(AppContext);

    useEffect(()=>{
        if(state.file) {
            init();
            animate();
        }
    }, [state.file])
    
    const formatData = () => {
        const file = state.file;
        const xy_length = file.data.height * file.data.width;
        const length = file.data.height * file.data.width * file.data.depth;
        const histogram = {}
        let max = 0;

        const rawArray = new Uint16Array(length);
        for (let i = 0; i < length; i++) {
            const z = Math.floor(i / xy_length);
            const xy = i % xy_length;
            const value = file.data.pixelArray[z][xy];
            rawArray[i] = value;

            max = value > max ? value : max;
            histogram[value] = (histogram[value] === undefined) ? 0 : histogram[value] + 1;
        }
        
        const array = new Uint8Array(length);
        for (let i = 0; i < length; i++) {
            array[i] = Math.floor(rawArray[i] / max * 255);
        }

        return { rawArray, array, histogram, max };
    }

    const init = () => {
        camera = new THREE.PerspectiveCamera( 45, window.innerWidth / window.innerHeight, 0.1, 2000 );
        camera.position.z = 70;
        scene = new THREE.Scene();

        const data = state.file.data;
        const formatedData = formatData();
        const texture = new THREE.DataTexture2DArray( formatedData.array, data.height, data.width, data.depth );
        texture.format = THREE.RedFormat;
        texture.type = THREE.UnsignedByteType;

        const material = new THREE.ShaderMaterial( {
            uniforms: {
                diffuse: { value: texture },
                depth: { value: 55 },
                max: { value: formatedData.max },
                size: { value: new THREE.Vector2( planeWidth, planeHeight ) }
            },
            vertexShader: vertex.trim(),
            fragmentShader: fragment.trim(),
            glslVersion: THREE.GLSL3
        } );
        
        const geometry = new THREE.PlaneGeometry( planeWidth, planeHeight );
        mesh = new THREE.Mesh( geometry, material );
        scene.add( mesh );

        renderer = new THREE.WebGLRenderer();
        renderer.setSize( ref.current.offsetWidth, ref.current.offsetHeight );

        if (ref.current.firstChild) {
            ref.current.removeChild(ref.current.firstChild);
        }
        ref.current.appendChild( renderer.domElement );
    }
    
    const animate = () => { 
        requestAnimationFrame( animate );

        if ( mesh ) {

            let value = mesh.material.uniforms[ "depth" ].value;

            value += depthStep;

            const depth = state.file.data.depth;
            if ( value > depth || value < 0.0 ) {
                if ( value > 1.0 ) value = depth * 2.0 - value;
                if ( value < 0.0 ) value = - value;
                depthStep = - depthStep;
            }

            mesh.material.uniforms[ "depth" ].value = value;
        }

        renderer.render( scene, camera );
    }

    return (
        <div className="viewport viewport-3d flex-50" ref={ref}>
        </div>
    )
}

export default Viewport3d;