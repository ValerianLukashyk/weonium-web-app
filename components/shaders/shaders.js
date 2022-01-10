export const fragment = `
uniform sampler2D uTexture;
uniform sampler2D uDisplacement;
uniform vec2 resolution;

float PI = 3.141592653589793238;

void main(){
    
    
    vec2 st = gl_FragCoord.xy / resolution;
    
    vec4 disp = texture2D(uDisplacement, st);
    float theta = disp.r*2.*PI;

    vec2 dir = vec2(sin(theta), -cos(theta));
    vec2 uv = st + dir * disp.r * 0.5;



    vec4 color=texture2D(uTexture,uv);
    gl_FragColor = color;
}
`

export const vertex = `

void main(){
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
}
`