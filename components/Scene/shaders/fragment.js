export const fragment = `
precision mediump float;

uniform float opacity;
uniform float progress;
uniform float uTime;
uniform vec3 uColor;
uniform vec2 resolution;
uniform sampler2D pointText;
varying vec2 vUv;

float PI = 3.141592653589793238;

void main(){
    vec2 coord = vec2(gl_PointCoord.x, gl_PointCoord.y );

    float disc=1.-smoothstep(-.2,.5,length(gl_PointCoord-vec2(.5)));


    vec4 point = texture2D(pointText, coord);
    vec4 finalPoint = mix(point, point*(sin(uTime/2.)+1.)*0.5, progress );
    gl_FragColor = vec4(uColor*vec3(coord,(sin(uTime/2.)+1.)*0.5), disc);
    gl_FragColor *= finalPoint;
}
`