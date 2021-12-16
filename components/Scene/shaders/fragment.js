export const fragment = `
#ifdef GL_ES
precision mediump float;
#endif

uniform float time;
uniform float opacity;
uniform float colorProgress;
uniform vec4 resolution;
uniform vec3 uColor;
varying vec2 vUv;

float PI = 3.141592653589793238;

float draw_circle(vec2 coord, float radius) {
    return step(length(coord), radius);
}

void main(){
    vec2 coord = gl_FragCoord.xy / resolution.xy;
    // vec4 color = vec4(1.,1.,colorProgress, 1.);
    float circle = draw_circle(coord, 0.3);
    
    vec3 color = step(vec3(circle), uColor);
    
    // gl_FragColor = vec4(color, 1.);

    gl_FragColor = vec4(uColor, opacity);
}
`