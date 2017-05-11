import * as THREE from 'three';
import * as dat from 'dat.gui';

console.log(dat);

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera( 90, window.innerWidth / window.innerHeight, 1, 1000 );

const renderer = new THREE.WebGLRenderer();
renderer.setSize( window.innerWidth, window.innerHeight );

const root = document.getElementById('root');
root.appendChild( renderer.domElement );

const geometry = new THREE.BoxGeometry( 20, 20, 20 );
const material = new THREE.MeshLambertMaterial( { color: 0x00ff00 } );
const cube = new THREE.Mesh( geometry, material );
scene.add( cube );

camera.position.z = 100;

var light = new THREE.PointLight( 0xFFFF00 );
light.position.set( 10, 0, 25 );
scene.add( light );

function render() {
  requestAnimationFrame( render );
  // cube.rotation.x += 0.1;
  // cube.rotation.y += 0.1;
  renderer.render( scene, camera );
}
render();
// renderer.render( scene, camera );

var gui = new dat.GUI();
var cameraGui = gui.addFolder('camera position');
cameraGui.add(camera.position, 'x');
cameraGui.add(camera.position, 'y');
cameraGui.add(camera.position, 'z');
cameraGui.open();

cameraGui = gui.addFolder('camera projection');
cameraGui.add(camera, 'fov');
cameraGui.open();

var lightGui = gui.addFolder('light position');
lightGui.add(light.position, 'x');
lightGui.add(light.position, 'y');
lightGui.add(light.position, 'z');
lightGui.open();

var cubeGui = gui.addFolder('cube position');
cubeGui.add(cube.position, 'x');
cubeGui.add(cube.position, 'y');
cubeGui.add(cube.position, 'z');
cubeGui.open()