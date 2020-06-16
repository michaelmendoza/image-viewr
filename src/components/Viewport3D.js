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
 
        var width = window.innerWidth;
        var height = window.innerHeight;

        camera = new THREE.PerspectiveCamera( 70, window.innerWidth / window.innerHeight, 0.01, 10 );     
        camera.position.z = 1;

        scene = new THREE.Scene();
        
        geometry = new THREE.BoxGeometry( 0.2, 0.2, 0.2 );
        material = new THREE.MeshNormalMaterial();
        mesh = new THREE.Mesh( geometry, material );

        var sphereGeo = new THREE.SphereGeometry(0.2, 32, 32);
        var sphereMat = new THREE.MeshBasicMaterial( { color: 0xffff00 });
        var sphere = new THREE.Mesh( sphereGeo, sphereMat);

        mesh.position.set(0.2, 0, 0);
        sphere.position.set(-0.2, 0, 0);

        var boxGeometry = new THREE.IcosahedronGeometry(4, 1);
        var boxMaterial = new THREE.MeshPhongMaterial({
          color: 0x99FFFF,
          shading: THREE.FlatShading
        });
        var cube = new THREE.Mesh(boxGeometry, boxMaterial);
        cube.castShadow = true;
        cube.position.x = -4;
        cube.position.y = 5;
        cube.position.z = 0;
        scene.add(cube);

        scene.add( mesh );
        scene.add( sphere );
        
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