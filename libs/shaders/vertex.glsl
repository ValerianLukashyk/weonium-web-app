uniform float u_time;
varying vec3 v_position;
varying float vProgress;

void main(){
  
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
}