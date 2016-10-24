Drop = function(){
    var drop = new Circle();
    drop.setSize(100);
    drop.setCenter(0,1);

    return{

        setCenter : function (x,y) {
            drop.setCenter(x,y);
        },

        setSize : function (r) {
            drop.setSize(r);
        },

        getCenter :function () {
            return drop.getCenter();
        },

        getSize : function () {
            return drop.getSize();
        },

        tick : function(theta) {
            drop.moveDown(.5);
        },

        draw : function(gl,ratio) {
            drop.draw(gl,ratio)
        }
    }
};

Bucket = function(){

    var leftSide = new Rectangle();
    var rightSide = new Rectangle();
    var contents = new Rectangle();
    var bottom = new Rectangle();
    var rightLid = new Rectangle();
    var leftLid = new Rectangle();

    var defaultPosition = [0, 0, 0];

    var width = 0.15;
    var height = 0.25;
    var center = [0, 0];
    var depth = 1;

    return{

        dropLidCollision : function(circle) {
            return leftLid.circleCollision(circle)||rightLid.circleCollision(circle);
        },

        dropLeftLidCollision : function (circle) {

            return leftLid.circleCollision(circle);
        },

        dropRightLidCollision : function (circle) {

            return rightLid.circleCollision(circle);
        },

        getLids : function (){
            return [leftLid,rightLid];
        },

        setDefaultPosition : function (x, y, z){


            defaultPosition = [x, y, z];

            center[0] = x;
            center[1] = y;

            depth = z;

            /**/
            contents.setDefaultPosition(center[0], center[1] - (height * 2 )*0.07, depth);
            contents.setSize((width * 2) * 0.90, (height * 2 ) * 0.83);

            leftSide.setDefaultPosition(center[0] + (width * 0.95), center[1],depth);
            leftSide.setSize((width * 2) * 0.05, (height * 2 ) * 0.9);

            rightSide.setDefaultPosition(center[0] - (width * 0.95), center[1],depth);
            rightSide.setSize((width * 2) * 0.05, (height * 2 ) * 0.9);

            bottom.setDefaultPosition(center[0], center[1] - ((height) * 0.95),depth );
            bottom.setSize( (width * 2), (height * 2 ) * 0.05);

            leftLid.setDefaultPosition(center[0] - width/2, center[1] + ((height) * 0.95) ,depth);
            leftLid.setSize(width, (height * 2 ) * 0.05);

            rightLid.setDefaultPosition( center[0] + (width/2) , center[1] + ((height) * 0.95),depth);
            rightLid.setSize(width , (height * 2 ) * 0.05);

        },

        setCenter : function(x, y){
            center[0] = x;
            center[1] = y;
        },

        setSize : function(w, h){
            width = w/2;
            height = h/2;
        },

        separateLids : function (distance) {
            var distanceEqualApart = distance/2;

            var defaultPosition = rightLid.getDefaultPosition();
            var setPosition = rightLid.getCenter();
            rightLid.setCenter(defaultPosition[0] + distanceEqualApart, setPosition[1]);

            var defaultPosition = leftLid.getDefaultPosition();
            var setPosition = leftLid.getCenter();
            leftLid.setCenter(defaultPosition[0] - distanceEqualApart, setPosition[1]);
        },

        draw : function(gl){
            leftSide.draw(gl);
            rightSide.draw(gl);
            contents.draw(gl);

            rightLid.draw(gl);
            leftLid.draw(gl);
            bottom.draw(gl);
        }

    };
};

Circle = function(){

    var program = Main.glCircleProgram;

    var center = [0,0];
    var radius = 1;
    var colorOfCircle = [];
    var backgroundColor = [];
    var defaultPosition = [0, 0, 0];
    var hasChangedLocation = true, hasChangedSize = false;

    return {

        setColor : function(circle, background){
            colorOfCircle = circle;
            backgroundColor = background;
        },

        setDefaultPosition : function (x, y) {

            defaultPosition[0] = x;
            defaultPosition[1] = y;

            center[0] = x;
            center[1] = y;

            hasChangedLocation = true;
        },

        restoreDefaultPosition : function (){
            center[0] = defaultPosition[0];
            center[1] = defaultPosition[1];
            hasChangedLocation = true;
        },

        setCenter : function (x, y) {

            center[0] = x;
            center[1] = y;

            hasChangedLocation = true;
        },

        getCenter : function(){
            return center;
        },


        setSize : function(size){
            radius = size/2;
            hasChangedSize = true;
        },

        getSize : function(){
            return radius
        },

        moveRight : function(space){
            center[0] += space;
        },

        moveLeft : function(space){
            center[0] -= space;
        },

        moveUp : function(space){
            center[1] += space;
        },

        moveDown : function(space){
            center[1] -= space;
        },

        draw : function(gl){

            gl.useProgram(program);
            gl.uniform2f(program.u_resolution, gl.drawingBufferWidth, gl.drawingBufferHeight);


            var data = [center[0] - radius, center[1] - radius,
                        center[0], center[1], radius,
                        center[0] + (1 + Math.sqrt(2)) * radius, center[1] - radius,
                        center[0], center[1], radius,
                        center[0] - radius, center[1] + (1 + Math.sqrt(2)) * radius,
                        center[0], center[1], radius];

            var vertexDataTyped = new Float32Array(data);

            var buffer = gl.createBuffer();

            gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
            gl.bufferData(gl.ARRAY_BUFFER, vertexDataTyped, gl.STATIC_DRAW);

            gl.enableVertexAttribArray(program.positionLoc);
            gl.enableVertexAttribArray(program.centerLocation);
            gl.enableVertexAttribArray(program.radiusLocation);

            gl.vertexAttribPointer(program.positionLoc, 2, gl.FLOAT, false, 5 * Float32Array.BYTES_PER_ELEMENT, 0);
            gl.vertexAttribPointer(program.centerLocation, 2, gl.FLOAT, false, 5 * Float32Array.BYTES_PER_ELEMENT, 8);
            gl.vertexAttribPointer(program.radiusLocation, 1, gl.FLOAT, false, 5 * Float32Array.BYTES_PER_ELEMENT, 16);

            gl.uniform3f(program.circleColorLoc, colorOfCircle[0], colorOfCircle[1], colorOfCircle[2]);
            gl.uniform3f(program.backgroundColorLoc, backgroundColor[0], backgroundColor[1], backgroundColor[2]);

            gl.drawArrays(gl.TRIANGLE_FAN, 0, 3);
        },

        tick: function(theta){
        }
    };
};

Rectangle = function(){

    var program = Main.glPolygonProgram;

    var height = 0.5;
    var width = 1;
    var center = [0,0];

    var vertices = [center[0] - width, center[1] + height,
                    center[0] - width, center[1] - height,
                    center[0] + width, center[1] - height,
                    center[0] + width, center[1] + height];

    var colors  = [0.3,  0.0,  0.0,
        0,  1.0,  0.0,
        0,  0.0,  1.0,
        1,  0.0,  0.0];

    var defaultPosition = [0, 0, 0];
    var hasChangedLocation = false, hasChangedSize = false;

    return{

        circleCollision : function (circle) {

            var circleCenter = circle.getCenter();
            var circleRadius = circle.getSize();

            // check circle position inside the rectangle quadrant
            //The vertical and horizontal distances between the circles center and the rectangles center
            var distanceBetween = {
                vertical: Math.abs(circleCenter[0] - center[0]),
                horizontal: Math.abs(circleCenter[1] - center[1])
            };

            if((distanceBetween.vertical > (width + circleRadius)) || distanceBetween.horizontal > (height + circleRadius)){
                return false;
            }else if ((distanceBetween.vertical <= (width)) || (distanceBetween.horizontal <= height)){
                return true;
            }else{
                var oppositeSide = distanceBetween.vertical - width;
                var AdjacentSide = distanceBetween.horizontal - height;
                return oppositeSide * oppositeSide + AdjacentSide * AdjacentSide <= circleRadius * circleRadius;
            }
        },

        setCenter : function(x, y){
            center[0] = x;
            center[1] = y;
        },

        getCenter : function(){
            return center;
        },

        setDefaultPosition : function (x, y) {

            defaultPosition[0] = x;
            defaultPosition[1] = y;

            center[0] = x;
            center[1] = y;

            hasChangedLocation = true;
        },

        restoreDefaultPosition : function (){
            center[0] = defaultPosition[0];
            center[1] = defaultPosition[1];
            hasChangedLocation = true;
        },

        getDefaultPosition : function(){
            return defaultPosition;
        },

        setSize : function(w, h){
            width = w/2;
            height = h/2;
            hasChangedSize = true;
        },

        setWidth : function(w){
            width = w/2;
            hasChangedSize = true;
        },

        getWidth : function(){
            return width*2;
        },

        setHeight: function(h){
            height = h/2;
            hasChangedSize = true;
        },

        setColor : function(color){
            colors = _.flatten([color,color,color,color]);
        },

        setColorLevels : function(upperLevel, lowerLevel){
            colors = _.flatten([upperLevel, lowerLevel, lowerLevel, upperLevel]);
        },

        setColorSides : function(rightSide, leftSide){
            colors = _.flatten([rightSide, rightSide, leftSide, leftSide]);
        },

        draw : function(gl){

            gl.useProgram(program);

            gl.uniform2f(program.u_resolution, gl.drawingBufferWidth, gl.drawingBufferHeight);

            var vertBuffer = gl.createBuffer();
            var colorBuffer = gl.createBuffer();

            var indices = [ 3, 2, 1, 3, 1, 0 ];

            if(hasChangedLocation || hasChangedSize){
                vertices = [center[0] - width, center[1] + height,
                            center[0] - width, center[1] - height,
                            center[0] + width, center[1] - height,
                            center[0] + width, center[1] + height];
            }

            gl.bindBuffer(gl.ARRAY_BUFFER, vertBuffer);
            gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertices), gl.STATIC_DRAW);
            gl.vertexAttribPointer(program.positionLoc, 2, gl.FLOAT, gl.FALSE, 2 * Float32Array.BYTES_PER_ELEMENT, 0);
            gl.enableVertexAttribArray(program.positionLoc);

            var indexBuffer = gl.createBuffer();
            gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, indexBuffer);
            gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Uint16Array(indices),gl.STATIC_DRAW);


            gl.enableVertexAttribArray(program.colorLoc);
            gl.bindBuffer(gl.ARRAY_BUFFER, colorBuffer);
            gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(colors), gl.STATIC_DRAW);
            gl.vertexAttribPointer(program.colorLoc, 3, gl.FLOAT, gl.FALSE,  0, 0);

            gl.drawElements(gl.TRIANGLES, indices.length, gl.UNSIGNED_SHORT, 0);

        },

        tick: function(theta){
        }
    };
};

Square = function(){

    var program = Main.glPolygonProgram;
    var radius = 1;
    var center = [0,0];
    var vertices = [center[0] - radius, center[1] + radius,
                    center[0] - radius, center[1] - radius,
                    center[0] + radius, center[1] - radius,
                    center[0] + radius, center[1] + radius];
    var colors  = [0.3,  0.0,  0.0,
        0,  1.0,  0.0,
        0,  0.0,  1.0,
        1,  0.0,  0.0];
    var defaultPosition = [0, 0, 0];
    var hasChangedLocation = false, hasChangedSize = false;


    return{

        getCenter : function(){
            return center;
        },

        setCenter : function(x, y){
            center[0] = x;
            center[1] = y;
        },

        setDefaultPosition : function (x, y) {

            defaultPosition[0] = x;
            defaultPosition[1] = y;

            center[0] = x;
            center[1] = y;

            hasChangedLocation = true;
        },

        restoreDefaultPosition : function (){
            center[0] = defaultPosition[0];
            center[1] = defaultPosition[1];

            hasChangedLocation = true;
        },

        getDefaultPosition : function(){
            return defaultPosition;
        },

        setSize : function(size){
            radius = size /2;
            hasChangedSize = true;
        },

        setColor : function(color){
            colors = _.flatten([color,color,color,color])
        },

        setColorLevels : function(upperLevel, lowerLevel){
            colors = _.flatten([upperLevel, lowerLevel, lowerLevel, upperLevel])
        },

        setColorSides : function(rightSide, leftSide){
            colors = _.flatten([rightSide, rightSide, leftSide, leftSide])
        },

        draw : function(gl){
            gl.useProgram(program);

            gl.uniform2f(program.u_resolution, gl.drawingBufferWidth, gl.drawingBufferHeight);

            var vertBuffer = gl.createBuffer();
            var colorBuffer = gl.createBuffer();

            var indices = [ 3, 2,
                1, 3,
                1, 0 ];

            if(hasChangedLocation || hasChangedSize){
                vertices = [center[0] - radius, center[1] + radius,
                            center[0] - radius, center[1] - radius,
                            center[0] + radius, center[1] - radius,
                            center[0] + radius, center[1] + radius];
            }

            gl.bindBuffer(gl.ARRAY_BUFFER, vertBuffer);
            gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertices), gl.STATIC_DRAW);
            gl.vertexAttribPointer(program.positionLoc, 2, gl.FLOAT, gl.FALSE, 2 * Float32Array.BYTES_PER_ELEMENT, 0);
            gl.enableVertexAttribArray(program.positionLoc);

            var indexBuffer = gl.createBuffer();
            gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, indexBuffer);
            gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Uint16Array(indices),gl.STATIC_DRAW);


            gl.enableVertexAttribArray(program.colorLoc);
            gl.bindBuffer(gl.ARRAY_BUFFER, colorBuffer);
            gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(colors), gl.STATIC_DRAW);
            gl.vertexAttribPointer(program.colorLoc, 3, gl.FLOAT, gl.FALSE,  0, 0);

            gl.drawElements(gl.TRIANGLES, indices.length, gl.UNSIGNED_SHORT, 0);

        },

        tick: function(theta){
        }
    };
};

Triangle = function(){

    var program = Main.glPolygonProgram;
    var radius= 50;
    var center = [400,400];

    var vertices = [center[0] - radius, center[1] - radius,
                    center[0] - radius, center[1] + (1 + Math.sqrt(2)) * radius,
                    center[0] + (1 + Math.sqrt(2)) * radius, center[1] - radius];

    var colors  = [ 1,  0.0,  0.0,
        0,  1.0,  0.0,
        0,  0.0,  1.0];

    var defaultPosition = [0, 0];
    var hasChangedLocation = false, hasChangedSize = false;

    return{

        getCenter : function(){
            return center;
        },

        setCenter : function(x, y){
            center[0] = x;
            center[1] = y;
        },

        setDefaultPosition : function (x, y) {

            defaultPosition[0] = x;
            defaultPosition[1] = y;

            center[0] = x;
            center[1] = y;

            hasChangedLocation = true;
        },

        restoreDefaultPosition : function (){
            center[0] = defaultPosition[0];
            center[1] = defaultPosition[1];
            hasChangedLocation = true;
        },

        getDefaultPosition : function(){
            return defaultPosition;
        },

        setSize : function(size){
            radius = size /2;
            hasChangedSize = true;
        },

        setColor : function(color){
            colors = _.flatten([color,color,color])
        },

        setColorLevels : function(upperLevel, lowerLevel){
            colors = _.flatten([lowerLevel, upperLevel, lowerLevel])
        },

        setColorSides : function(rightSide, leftSide){
            colors = _.flatten([rightSide, rightSide, leftSide])
        },

        setColorPoints : function(rightSideBottom, rightSideBottomTop, leftBottom){
            colors = _.flatten([rightSideBottom, rightSideBottomTop, leftBottom])
        },

        draw : function(gl){
            gl.useProgram(program);

            gl.uniform2f(program.u_resolution, gl.drawingBufferWidth, gl.drawingBufferHeight);

            var vertBuffer = gl.createBuffer();
            var colorBuffer = gl.createBuffer();

            if(hasChangedLocation || hasChangedSize){
                vertices = [center[0] - radius, center[1] - radius,
                            center[0] + (1 + Math.sqrt(2)) * radius, center[1] - radius,
                            center[0] - radius, center[1] + (1 + Math.sqrt(2)) * radius];
            }

            gl.bindBuffer(gl.ARRAY_BUFFER, vertBuffer);
            gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertices), gl.STATIC_DRAW);
            gl.vertexAttribPointer(program.positionLoc, 2, gl.FLOAT, gl.FALSE, 2 * Float32Array.BYTES_PER_ELEMENT, 0);
            gl.enableVertexAttribArray(program.positionLoc);

            gl.enableVertexAttribArray(program.colorLoc);
            gl.bindBuffer(gl.ARRAY_BUFFER, colorBuffer);
            gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(colors), gl.STATIC_DRAW);
            gl.vertexAttribPointer(program.colorLoc, 3, gl.FLOAT, gl.FALSE,  0, 0);

            gl.drawArrays(gl.TRIANGLES, 0, 3);
        },

        tick: function(theta){
        }
    };
};
