var Shaders = {

    polygonVertexShaderCode: ['precision mediump float;',     //Precision Qualifiers
        'attribute vec2 vertPosition;', //Incoming data from user for position of shape
        'attribute vec3 color;',        //Incoming data from user for colour of shape
        'uniform vec2 u_resolution;',   //Incoming data from user for resolution of shape in respect to canvas
        '',
        'varying vec3 fragColor;', //Output for fragment shader
        '',
        'void main(void){',
            'fragColor = color;',
            'vec2 clipSpace = vertPosition / u_resolution * 2.0  - 1.0;',
            'gl_Position = vec4(clipSpace , 0, 1);',
        '}'
    ],

    polygonFragmentShaderCode: ['precision mediump float;',
        '',
        'varying vec3 fragColor;',
        '',
        'void main(){',
            '',
            'gl_FragColor = vec4(fragColor,1.0);',
            '',
        '}'
    ],

	circleFilledVertexShaderCode: ['precision mediump float;',     //Precision Qualifiers
		'attribute vec2 vertPosition;', //Incoming data from user for position of shape
		'uniform vec3 color;',        //Incoming data from user for colour of shape
		'uniform vec2 u_resolution;',   //Incoming data from user for resolution of shape in respect to canvas
		'',
		'varying vec3 fragColor;', //Output for fragment shader
		'',
		'void main(void){',
		'fragColor = color;',
		'vec2 clipSpace = vertPosition / u_resolution * 2.0  - 1.0;',
		'gl_Position = vec4(clipSpace , 0, 1);',
		'}'
	],

	circleFilledFragmentShaderCode: ['precision mediump float;',
		'',
		'varying vec3 fragColor;',
		'',
		'void main(){',
		'',
		'gl_FragColor = vec4(fragColor,1.0);',
		'',
		'}'
	],

    circleVertexShaderCode : [  'precision mediump float;',  // Precision Qualifiers
        'attribute vec2 vertPosition;',//Incoming data from user for position of shape
        '',
        'uniform vec2 u_resolution;',//Incoming data from user on the resolution of canvas for clipspace
        'attribute vec2 a_center;',
        'attribute float a_radius;',
        '',
        'uniform vec3 circle;',
        'uniform vec3 background;',
        '',
        'varying vec2 center;',
        'varying vec2 resolution;',
        'varying float radius;',
        '',
        'varying vec3 circleColor;',
        'varying vec3 backgroundColor;',
        '',
        'void main(void){',
            'vec2 clipSpace = vertPosition / u_resolution * 2.0  - 1.0;',
            'gl_Position = vec4(clipSpace , 0, 1);',
            '',
            'radius = a_radius;',
            'center = a_center;',
            'resolution = u_resolution;',
            'circleColor = circle;',
            'backgroundColor = background;',
        '}'],

    circleFragmentShaderCode : ['precision mediump float;',
        '',
        'varying vec2 center;',
        'varying vec2 resolution;',
        'varying float radius;',
        '',
        'varying vec3 circleColor;',
        'varying vec3 backgroundColor;',
        '',
        'void main() {',
            '',
            'float x = gl_FragCoord.x;',
            'float y = gl_FragCoord.y;',
            '',
            'float dx = center[0] - x;',
            'float dy = center[1] - y;',
            'float distance = sqrt(dx*dx + dy*dy);',
            'float diff = distance - radius +0.5 ;',
            'if ( diff < 0.0 ||  diff >= 0.0 && diff <= 1.0)',
                'gl_FragColor = vec4(circleColor, 1.0);',
            'else',
                'gl_FragColor = vec4(backgroundColor, 1.0);',
        '}']
};