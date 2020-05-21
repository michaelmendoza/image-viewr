import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';
 
var camera, scene, renderer;
var geometry, material, mesh;
  
const Viewport3D = () => {
    const ref = useRef();

    useEffect(()=>{
        init();
        animate();
    }, [])
    
    const init = () => {
 
        camera = new THREE.PerspectiveCamera( 70, window.innerWidth / window.innerHeight, 0.01, 10 );
        camera.position.z = 1;
     
        scene = new THREE.Scene();
        
        geometry = new THREE.BoxGeometry( 0.2, 0.2, 0.2 );
        material = new THREE.MeshNormalMaterial();
     
        mesh = new THREE.Mesh( geometry, material );
        scene.add( mesh );
     
        renderer = new THREE.WebGLRenderer( { antialias: true } );
        renderer.setSize( ref.current.offsetWidth, ref.current.offsetHeight );
        ref.current.appendChild( renderer.domElement );
    }
    
    const animate = () => {
     
        requestAnimationFrame( animate );
     
        mesh.rotation.x += 0.01;
        mesh.rotation.y += 0.02;
     
        renderer.render( scene, camera );
    }

    return (
        <div className="viewport viewport-3d flex-50" ref={ref}>
        </div>
    )
}

export default Viewport3D;