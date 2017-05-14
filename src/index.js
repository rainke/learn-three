import * as utils from './utils';
import Matrix4 from './utils/Matrix4';

const VSHADER_SOURCE = `
attribute vec4 a_Position;
uniform mat4 u_ModelMatrix;
void main(){
  gl_Position = u_ModelMatrix * a_Position;
}`;

const FSHADER_SOURCE = `
precision mediump float;
uniform vec4 u_FragColor;
void main(){
  gl_FragColor = u_FragColor;
}`;
const ANGLE_STEP = 45;

function main() {

  const canvas = document.getElementById('canvas');
  const gl = canvas.getContext('webgl');

  if(!utils.initShaders(gl, VSHADER_SOURCE, FSHADER_SOURCE)){
    throw new Error('err');
  }
  gl.clearColor(0.0, 0.0, 0.0, 0.1);
  let angle = 45;
  let currentAngle = 0;
  const n = initVertexBuffers(gl, angle);
  const modelMatrix = new Matrix4();
  const u_ModelMatrix = gl.getUniformLocation(gl.program, 'u_ModelMatrix');
  const tick = () => {
    currentAngle = animate(currentAngle);
    draw(gl,n, currentAngle, modelMatrix, u_ModelMatrix);
    requestAnimationFrame(tick);
  };
  tick();

}

function draw(gl, n, currentAngle, modelMatrix, u_ModelMatrix){
  gl.clear(gl.COLOR_BUFFER_BIT);
  modelMatrix.setRotate(currentAngle, 0, 0, 1);
  gl.uniformMatrix4fv(u_ModelMatrix, false, modelMatrix.elements);
  gl.drawArrays(gl.TRIANGLES, 0, n);
}

function initVertexBuffers(gl) {
  const vertices = new Float32Array([
    0, 0.5, -0.5, -0.5, 0.5, -0.5
  ]);

  const vertexBuffer = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, vertexBuffer);
  gl.bufferData(gl.ARRAY_BUFFER, vertices, gl.STATIC_DRAW);

  const u_FragColor = gl.getUniformLocation(gl.program, 'u_FragColor');
  gl.uniform4f(u_FragColor, 1.0, 1.0, 0.0, 1.0);

  const a_Position = gl.getAttribLocation(gl.program, 'a_Position');
  gl.vertexAttribPointer(a_Position, 2, gl.FLOAT, false, 0, 0);
  gl.enableVertexAttribArray(a_Position);
  
  return 3;

}
let g_last = Date.now();
function animate(angle) {
  let now = Date.now();
  let elapsed = now -g_last;
  g_last = now;
  let new_angle = angle + (ANGLE_STEP * elapsed) / 1000;
  return new_angle % 360;
}


window.onload = main;