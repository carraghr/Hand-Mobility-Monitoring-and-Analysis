Main = {

    init : function(){

        this.canvas = document.getElementById('the-canvas');

        this.canvas.width = this.canvas.clientWidth;
        this.canvas.height = this.canvas.clientHeight;

        this.gl = this.canvas.getContext('webgl');

        if (!this.gl) {
            console.log('WebGL not supported, falling back on experimental-webgl');
            this.gl = this.canvas.getContext('experimental-webgl');
        }

        if (!this.gl) {
            alert('Your browser does not support WebGL');
        }

        this.glPolygonProgram = ProgramUtils.initProgram(this.gl, Shaders.polygonVertexShaderCode.join('\n'), Shaders.polygonFragmentShaderCode.join('\n'));

        _.extend(this.glPolygonProgram,{positionLoc : this.gl.getAttribLocation(this.glPolygonProgram, "vertPosition"),
            colorLoc : this.gl.getAttribLocation(this.glPolygonProgram, "color"),
            u_resolution : this.gl.getUniformLocation(this.glPolygonProgram, "u_resolution")});

		this.glFilledCircleProgram = ProgramUtils.initProgram(this.gl, Shaders.circleFilledVertexShaderCode.join('\n'), Shaders.circleFilledFragmentShaderCode.join('\n'));

		_.extend(this.glFilledCircleProgram,{positionLoc : this.gl.getAttribLocation(this.glFilledCircleProgram, "vertPosition"),
			colorLoc : this.gl.getUniformLocation(this.glFilledCircleProgram, "color"),
			u_resolution : this.gl.getUniformLocation(this.glFilledCircleProgram, "u_resolution")});


        this.glCircleProgram = ProgramUtils.initProgram(this.gl, Shaders.circleVertexShaderCode.join('\n'), Shaders.circleFragmentShaderCode.join('\n'));

        _.extend(this.glCircleProgram,{ positionLoc : this.gl.getAttribLocation(this.glCircleProgram, "vertPosition"),
            u_resolution : this.gl.getUniformLocation(this.glCircleProgram, "u_resolution"),
            centerLocation : this.gl.getAttribLocation(this.glCircleProgram, "a_center"),
            radiusLocation : this.gl.getAttribLocation(this.glCircleProgram, "a_radius"),
            circleColorLoc : this.gl.getUniformLocation(this.glCircleProgram, "circle"),
            backgroundColorLoc : this.gl.getUniformLocation(this.glCircleProgram, "background")});

        Game.init();
        Game.drawScene();
    }
};