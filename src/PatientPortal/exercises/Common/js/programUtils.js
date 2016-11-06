/**
 * Created by Richard on 22/06/2016.
 */

var ProgramUtils = function(){

    function createShader(gl,shaderCode, shaderType){
        var shader = gl.createShader(shaderType);
        gl.shaderSource(shader, shaderCode);
        gl.compileShader(shader);
        if(!gl.getShaderParameter(shader, gl.COMPILE_STATUS)){
            console.log(shaderCode);
            throw gl.getShaderInfoLog(shader);
        }
        return shader;
    }

    function initProgram(gl, vertexShaderCode, fragmentShaderCode){
        var program = gl.createProgram();
        var vertexShader = createShader(gl,vertexShaderCode, gl.VERTEX_SHADER);
        var fragmentShader = createShader(gl,fragmentShaderCode, gl.FRAGMENT_SHADER);
        gl.attachShader(program, vertexShader);
        gl.attachShader(program, fragmentShader);
        gl.linkProgram(program);
        if(!gl.getProgramParameter(program,gl.LINK_STATUS)){
            throw gl.getProgramInfoLog(program);
        }
        return program;
    }

    return {
        initProgram : initProgram
    };
}();