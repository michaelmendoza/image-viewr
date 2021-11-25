
/**
 * Taken and adapted from https://github.com/mrdoob/three.js/blob/master/examples/webgl2_materials_texture2darray.html
 */

export const vertex = `
uniform vec2 size;
out vec2 vUv;

void main() {

    gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );

    // Convert position.xy to 1.0-0.0

    vUv.xy = position.xy / size + 0.5;
    vUv.y = 1.0 - vUv.y; // original data is upside down

}
`

export const fragment = `
precision highp float;
precision highp int;
precision highp sampler2DArray;

uniform sampler2DArray diffuse;
in vec2 vUv;
uniform int depth;

out vec4 outColor;

void main() {
    vec4 color = texture( diffuse, vec3( vUv, depth ) );

    outColor = vec4( color.rrr, 1.0 );
}
`