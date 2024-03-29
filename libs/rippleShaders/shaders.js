export const fragment = `

uniform float time;
uniform sampler2D uTexture;
uniform sampler2D uDisplacement;
uniform vec4 resolution;
varying vec2 vUv;
varying vec3 vPosition;

float PI = 3.141592653589793238;

void main(){
    vec2 newUV = (vUv - vec2(0.5))*resolution.zw + vec2(0.5);
    
    vec4 disp = texture2D(uDisplacement, vUv);
    float theta = disp.r*2.*PI;

    vec2 dir = vec2(sin(theta), cos(theta));
    vec2 uv = vUv + dir * disp.r * 0.1;



    vec4 color=texture2D(uTexture,uv);
    gl_FragColor=color;
}

`

export const vertex = `
uniform float time;
uniform vec3 vPosition;
varying float vProgress;
varying vec2 vUv;

void main(){
    vUv = uv;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
}
`
