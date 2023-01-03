varying vec3 v_Normal;
varying vec2 v_Uv;
varying vec3 v_Position;
varying vec3 v_Color;

uniform float time;

void main() {
    //vec2 newUV = (vUv - vec2(0.5)) * resolution.zw + vec2(0.5);
	// newUV.x += 0.02*sin(newUV.y*20. + time);
    gl_FragColor = vec4(v_Uv, 1.0, 1.0);
    gl_FragColor = vec4(v_Color, 1.0);
}