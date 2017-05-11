import * as THREE from 'three';

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );

const renderer = new THREE.WebGLRenderer();
renderer.setSize( window.innerWidth, window.innerHeight );

const root = document.getElementById('root');
root.appendChild( renderer.domElement );

const geometry = new THREE.BoxGeometry( 1, 3, 2 );
const material = new THREE.MeshBasicMaterial( { color: 0x00ff00 } );
const cube = new THREE.Mesh( geometry, material );
scene.add( cube );

camera.position.z = 5;
function render() {
  requestAnimationFrame( render );
  cube.rotation.x += 0.02;
  cube.rotation.y += 0.1;
  renderer.render( scene, camera );
}
render();