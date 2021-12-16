#ifdef GL_ES
precision mediump float;
#endif
varying vec2 vUv;
uniform sampler2D positionTexture;
uniform float opacity;

void main(){
    // vec3 color = vec3(1.0,0.,0.);
    gl_FragColor=vec4(1.,1.,1.,opacity);
}