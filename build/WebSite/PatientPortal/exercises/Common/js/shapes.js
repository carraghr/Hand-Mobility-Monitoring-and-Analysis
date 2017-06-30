Bar = function(){
   let bar = new Rectangle();
   let originalCenter = {x:0,y:0};
   let openingOriginalCenter = {x:0,y:0};
   let opening = new Rectangle();

   return {

       createBar: function(x, y, width, height){
		   originalCenter.x = x;
		   originalCenter.y = y;
		   bar.setCenter(x, y);
		   bar.setWidth(width);
		   bar.setHeight(height);
	   },

	   createOpening: function(x, y, width, height){
		   openingOriginalCenter.x = x;
		   openingOriginalCenter.y = y;
		   opening.setCenter(x, y);
		   opening.setWidth(width);
		   opening.setHeight(height);

	   },

	   setColors: function(barColor, openingColor){
		   bar.setColor(barColor);
		   opening.setColor(openingColor);
	   },

       moveDownfromCenter: function(amount){
           bar.setCenter(originalCenter.x, originalCenter.y - amount)
	   },

	   moveUpfromCenter: function(amount){
		   opening.setCenter(originalCenter.x, originalCenter.y + amount)
	   },

	   moveFromCenter: function(amount){
		   opening.setCenter(openingOriginalCenter.x, openingOriginalCenter.y + amount)
	   },

	   distanceFromSameLevel: function(bullet){
		   let circleCenter = bullet.getCenter();
		   return Math.abs(openingOriginalCenter.x - circleCenter.x);
	   },

	   behindBullet:function(bullet){
		   let bulletCenter = bullet.getCenter();
		   let width = bullet.getSize();

		   let distance =  (bulletCenter.x + width/2) - (openingOriginalCenter.x - (opening.getWidth()/2));

		   return distance <= 0;
	   },

       draw:function(gl){
           bar.draw(gl);
		   opening.draw(gl);
	   },

	   getBarHeight:function(){
		   return opening.getHeight();
	   }

   };
};

Node = function(){
	var node = new CircleWithoutBackground();
	let direction;
	let show = true;

	return{

		create: function (x, y, size, color, directionToGo){
			node.setCenter(x,y);
			node.setSize(size);
			node.setColor(color);
			direction = directionToGo;
		},

		setCenter : function (x,y) {
			node.setCenter(x,y);
		},

		setColor : function (color) {
			node.setColor(color);
		},

		setSize : function (r) {
			node.setSize(r);
		},

		getCenter :function () {
			return node.getCenter();
		},

		getSize : function () {
			return node.getSize();
		},

		invisable:function(){
			show = false;
		},

		visable:function(){
			show = true;
		},

		tick: function (theta){
			if(direction === "Up"){
				node.moveUp(theta * 1);
			}else if(direction === "Down"){
				node.moveDown(theta * 1);
			}else if(direction === "Left"){
				node.moveLeft(theta * 1);
			}else if(direction === "Right"){
				node.moveRight(theta * 1);
			}
		},

		draw: function (gl){
			if(show){
				node.draw(gl);
			}
		}
	};
};

FingerBase = function(){
    var baseHoles = [];
    var center = {x:0, y:0};
    var height;
    var colorNode = [];
    var background = [];

	return{

	    createBase : function(x, y, numberOfElements, elementColor, backgroundColor, elementSize){
            center.x = x;
            center.y = y;
			let elementRadius = elementSize;
			height = elementSize/2;
			colorNode = elementColor;
			background = backgroundColor;

			let offset = 1;
            let rightIndex= 0;
            if(numberOfElements % 2 != 0){
                let index = Math.floor(numberOfElements/2);
                baseHoles[index] = new Circle();
				baseHoles[index].setCenter(center.x,center.y);
				baseHoles[index].setColor(elementColor, backgroundColor);
                baseHoles[index].setSize(elementRadius);
				rightIndex = Math.floor(index) + 1;
				offset += elementRadius ;
            }else{
				rightIndex = Math.floor(numberOfElements / 2);
				offset += elementRadius/2;
            }
            for(let leftIndex = Math.floor(numberOfElements/2) - 1; rightIndex < numberOfElements && leftIndex >= 0; rightIndex++,leftIndex--){
                baseHoles[rightIndex] = new Circle();
				baseHoles[rightIndex].setCenter(center.x + offset,center.y);
				baseHoles[rightIndex].setColor(elementColor, backgroundColor);
				baseHoles[rightIndex].setSize(elementRadius);

				baseHoles[leftIndex] = new Circle();
				baseHoles[leftIndex].setCenter(center.x - offset,center.y);
				baseHoles[leftIndex].setColor(elementColor, backgroundColor);
				baseHoles[leftIndex].setSize(elementRadius);
				offset += (elementRadius) + 1;
            }
        },

        highlightBaseHole :function(index){
			if(index >= 0 && index < baseHoles.length){
				baseHoles[index].highlight(0.1);
			}
        },

        restoreColor : function(index){
			if(index >= 0 && index < baseHoles.length){
				baseHoles[index].setColor([1,0.5,0],background);
			}
        },

		restoreColorForAllBut: function(index){
			for(let i = 0; i<baseHoles.length; i++){
				if(i != index){
					baseHoles[i].setColor([1,0.5,0],background);
				}
			}
		},

		getNodeCenter : function (index){
			if(index >= 0 && index < baseHoles.length){
                return baseHoles[index].getCenter();
			}
		},

		draw : function(gl) {
			for(let index = 0; index < baseHoles.length; index++){
			    baseHoles[index].draw(gl);
            }
		},

		distanceFromNodeBaseHoleTop: function(baseHoleIndex, node){
            let circleCenter = baseHoles[baseHoleIndex].getCenter();
			let holeCenter = node.getCenter();
			let holeHeight = node.getSize()/2;
            return (holeCenter.y - holeHeight) - (circleCenter.y +height);
        },

		nodeHasNotPassed: function(baseHoleIndex, node){
			let circleCenter = baseHoles[baseHoleIndex].getCenter();
			let holeCenter = node.getCenter();
			let holeHeight = node.getSize()/2;
			let x = (holeCenter.y + holeHeight) - (circleCenter.y - height);
			return x >= 0;
		},

		checkCollision:function (baseHoleIndex,node){
            return baseHoles[baseHoleIndex].circleCollision(node);
        }
	};
};

Drop = function(){
    var drop = new Circle();
    drop.setSize(100);
    drop.setCenter(0,1);

    return{

        setCenter : function (x,y) {
            drop.setCenter(x,y);
        },

        setColor : function (dropColor, background) {
            drop.setColor(dropColor,background);
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
            drop.moveDown(theta * 1);
        },

        draw : function(gl,ratio) {
            drop.draw(gl,ratio);
        }
    };
};

Bucket = function(){

    var leftSide = new Rectangle();
    var rightSide = new Rectangle();
    var content = new Rectangle();
    var bottom = new Rectangle();
    var rightLid = new Rectangle();
    var leftLid = new Rectangle();

    var defaultPosition = {x: 0, y:0};

    var width = 0.15;
    var height = 0.25;
    var center = {x:0,y:0};

    return{

        setBucketColor: function(bucketColor, lidColor){
            leftSide.setColor(bucketColor);
            rightSide.setColor(bucketColor);
            bottom.setColor(bucketColor);
            leftLid.setColor(lidColor);
            rightLid.setColor(lidColor);
        },

        distanceFromDrop : function(drop){
            let dropCenter = drop.getCenter();
			let dorpHeight = drop.getSize()/2;
			return (dropCenter.y - dorpHeight) - (center.y + (height));
        },

        dropInBucket: function(drop){
            let lidLocation = rightLid.getCenter();
            let dropCenter = drop.getCenter();
			let x = ((dropCenter.y + (drop.getSize()/2)) - (lidLocation.y - (rightLid.getHeight()/2)));
			return x >= 0;
        },

        dropContentCollision : function(circle) {
            return leftLid.circleCollision(circle)||rightLid.circleCollision(circle);
        },

        dropLidCollision : function(circle) {
            return rightLid.circleCollision(circle);
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

        setDefaultPosition : function (x, y){

            defaultPosition.x = x;
            defaultPosition.y = y;

            center.x = x;
            center.y = y;

            leftSide.setDefaultPosition(center.x + (width * 0.95), center.y);
            leftSide.setSize((width * 2) * 0.05, (height * 2 ) * 0.9);

            rightSide.setDefaultPosition(center.x - (width * 0.95), center.y);
            rightSide.setSize((width * 2) * 0.05, (height * 2 ) * 0.9);

            bottom.setDefaultPosition(center.x, center.y - ((height) * 0.95));
            bottom.setSize( (width * 2), (height * 2 ) * 0.05);

            leftLid.setDefaultPosition(center.x - width/2, center.y + ((height) * 0.95));
            leftLid.setSize(width, (height * 2 ) * 0.05);

            rightLid.setDefaultPosition( center.x + (width/2) , center.y + ((height) * 0.95));
            rightLid.setSize(width , (height * 2 ) * 0.05);

            content.setDefaultPosition( center.x, center.y - ((height * 2 )*0.07));
            content.setSize((width * 2) * 0.90 , (height * 2 ) * 0.83);

        },

        setContentLevels : function(numberOfLevels){

        },

        create : function(x, y, levels){
            this.setDefaultPosition(x,y);
            this.setContentLevels(levels);
        },

        setCenter : function(x, y){
            center.x = x;
            center.y = y;
        },

        setSize : function(w, h){
            width = w/2;
            height = h/2;
        },

        separateLids : function (distance){

            //distance is 0 to 100 percent /100
            let distanceEqualApart = distance * ( (width * 2) * 0.90 )/2;

            let defaultLidPosition = rightLid.getDefaultPosition();
            rightLid.setCenter(defaultLidPosition.x + distanceEqualApart, defaultLidPosition.y);

            defaultLidPosition = leftLid.getDefaultPosition();
            leftLid.setCenter(defaultLidPosition.x - distanceEqualApart, defaultLidPosition.y);
        },

        draw : function(gl){
            leftSide.draw(gl);
            rightSide.draw(gl);
            rightLid.draw(gl);
            leftLid.draw(gl);
            bottom.draw(gl);
        }

    };
};

Circle = function(){

    var program = Main.glCircleProgram;

    var center = {x:0,y:0};
    var radius = 1;
    var color = [];
    var backupColor = [];
    var backgroundColor = [];
    var defaultPosition = [0, 0, 0];
    var hasChangedLocation = true, hasChangedSize = false;

    return {

        setColor : function(circle, background){
            color = circle;
            backgroundColor = background;
        },

        setDefaultPosition : function (x, y) {

            defaultPosition[0] = x;
            defaultPosition[1] = y;

            center.x = x;
            center.y = y;

            hasChangedLocation = true;
        },

        restoreDefaultPosition : function (){
            center.x = defaultPosition[0];
            center.y = defaultPosition[1];
            hasChangedLocation = true;
        },

        setCenter : function (x, y) {

            center.x = x;
            center.y = y;

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
            return radius * 2;
        },

        moveRight : function(space){
            center.x += space;
			hasChangedLocation = true;
        },

        moveLeft : function(space){
            center.x -= space;
			hasChangedLocation = true;
        },

        moveUp : function(space){
            center.y += space;
			hasChangedLocation = true;
        },

        moveDown : function(space){
            center.y -= space;
			hasChangedLocation = true;
        },

        draw : function(gl){

            gl.useProgram(program);
            gl.uniform2f(program.u_resolution, gl.drawingBufferWidth, gl.drawingBufferHeight);


            var data = [center.x - radius, center.y - radius,
                center.x, center.y, radius,
                center.x + (1 + Math.sqrt(2)) * radius, center.y - radius,
                center.x, center.y, radius,
                center.x - radius, center.y + (1 + Math.sqrt(2)) * radius,
                center.x, center.y, radius];

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
            gl.uniform3f(program.circleColorLoc, color[0], color[1], color[2]);
            gl.uniform3f(program.backgroundColorLoc, backgroundColor[0], backgroundColor[1], backgroundColor[2]);

            gl.drawArrays(gl.TRIANGLE_FAN, 0, 3);
        },

        tick: function(theta){
        },

        circleCollision : function(circle){
            let circleCenter = circle.getCenter();
            let circleRadius = circle.getSize()/2;

            return Math.pow(Math.abs(circleCenter.x - center.x),2) + Math.pow(Math.abs(circleCenter.y - center.y),2) <= Math.pow(radius + circleRadius,2);
        },

		highlight : function(lighterby){
			if((1*color[0]) - lighterby > 0){
				color[0] = (1*color[0]) + lighterby;
			}
			if((1*color[1]) - lighterby > 0){
				color[1] = (1*color[1]) + lighterby;
			}
			if((1*color[2]) - lighterby > 0){
				color[2] = (1*color[2]) + lighterby;
			}
		}

	};
};

Rectangle = function(){

    var program = Main.glPolygonProgram;

    var height = 0.5;
    var width = 1;
    var center = {x:0,y:0};

    var vertices = [center.x - width, center.y + height,
        center.x - width, center.y - height,
        center.x + width, center.y - height,
        center.x + width, center.y + height];

    var colors  = [0.3,  0.0,  0.0,
        0,  1.0,  0.0,
        0,  0.0,  1.0,
        1,  0.0,  0.0];

    var defaultPosition = { x: 0, y:0};
    var hasChangedLocation = false, hasChangedSize = false;

    return{

        circleCollision : function (circle) {

            let circleCenter = circle.getCenter();
            let circleRadius = circle.getSize()/2;

            // check circle position inside the rectangle quadrant
            //The vertical and horizontal distances between the circles center and the rectangles center
            let distanceBetween = {
                vertical: Math.abs(circleCenter.x - center.x),
                horizontal: Math.abs(circleCenter.y - center.y)
            };

            if((distanceBetween.vertical > (width + circleRadius)) || distanceBetween.horizontal > (height + circleRadius)){
                return false;
            }else if ((distanceBetween.vertical <= (width)) || (distanceBetween.horizontal <= height)){
                return true;
            }else{
                let oppositeSide = distanceBetween.vertical - width;
                let AdjacentSide = distanceBetween.horizontal - height;
                return oppositeSide * oppositeSide + AdjacentSide * AdjacentSide <= circleRadius * circleRadius;
            }
        },

        setCenter : function(x, y){
            center.x = x;
            center.y = y;
        },

        getCenter : function(){
            return center;
        },

        setDefaultPosition : function (x, y) {

            defaultPosition.x = x;
            defaultPosition.y = y;

            center.x = x;
            center.y = y;

            hasChangedLocation = true;
        },

        restoreDefaultPosition : function (){
            center.x = defaultPosition.x;
            center.y = defaultPosition.y;
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

        getHeight: function(){
            return height* 2;
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
                vertices = [center.x - width, center.y + height,
                    center.x - width, center.y - height,
                    center.x + width, center.y - height,
                    center.x + width, center.y + height];
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
    var center = {x:0,y:0};
    var vertices = [center.x - radius, center.y + radius,
        center.x - radius, center.y - radius,
        center.x + radius, center.y - radius,
        center.x + radius, center.y + radius];
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
            center.x = x;
            center.y = y;
        },

        setDefaultPosition : function (x, y) {

            defaultPosition[0] = x;
            defaultPosition[1] = y;

            center.x = x;
            center.y = y;

            hasChangedLocation = true;
        },

        restoreDefaultPosition : function (){
            center.x = defaultPosition[0];
            center.y = defaultPosition[1];

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
                vertices = [center.x - radius, center.y + radius,
                    center.x - radius, center.y - radius,
                    center.x + radius, center.y - radius,
                    center.x + radius, center.y + radius];
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
    var center = {x : 400, y :400};

    var vertices = [center.x - radius, center.y - radius,
        center.x - radius, center.y + (1 + Math.sqrt(2)) * radius,
        center.x + (1 + Math.sqrt(2)) * radius, center.y - radius];

    var colors  = [ 1,  0.0,  0.0,
        0,  1.0,  0.0,
        0,  0.0,  1.0];

    var defaultPosition = {x:0, y: 0};
    var hasChangedLocation = false, hasChangedSize = false;

    return{

        getCenter : function(){
            return center;
        },

        setCenter : function(x, y){
            center.x = x;
            center.y = y;
        },

        setDefaultPosition : function (x, y) {

            defaultPosition.x = x;
            defaultPosition.y = y;

            center.x = x;
            center.y = y;

            hasChangedLocation = true;
        },

        restoreDefaultPosition : function (){
            center.x = defaultPosition[0];
            center.y = defaultPosition[1];
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
                vertices = [center.x - radius, center.y - radius,
                    center.x + (1 + Math.sqrt(2)) * radius, center.y - radius,
                    center.x - radius, center.y + (1 + Math.sqrt(2)) * radius];
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

CircleWithoutBackground = function(){

	var program = Main.glFilledCircleProgram;

	var center = {x:0,y:0};
	var radius = 1;
	var color= [];
	var defaultPosition = [0, 0, 0];

	var vertices = [];

	var hasChangedLocation = true, hasChangedSize = false;

	var ATTRIBUTES = 2;
	var numFans = 32;

	return {

		setColor : function(colorOfCircle){
			color = colorOfCircle;
		},

		highlight : function(lighterby){
			color[0] = color[0] + lighterby;
			color[1] = color[1] + lighterby;
			color[2] = color[2] + lighterby;
		},

		setDefaultPosition : function (x, y) {

			defaultPosition[0] = x;
			defaultPosition[1] = y;

			center.x = x;
			center.y = y;

			hasChangedLocation = true;
		},

		restoreDefaultPosition : function (){
			center.x = defaultPosition[0];
			center.y = defaultPosition[1];
			hasChangedLocation = true;
		},

		setCenter : function (x, y) {

			center.x = x;
			center.y = y;

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
			return radius * 2;
		},

		moveRight : function(space){
			center.x += space;
			hasChangedLocation = true;
		},

		moveLeft : function(space){
			center.x -= space;
			hasChangedLocation = true;
		},

		moveUp : function(space){
			center.y += space;
			hasChangedLocation = true;
		},

		moveDown : function(space){
			center.y -= space;
			hasChangedLocation = true;
		},

		draw : function(gl){

			gl.useProgram(program);

			gl.uniform2f(program.u_resolution, gl.drawingBufferWidth, gl.drawingBufferHeight);

			if(hasChangedLocation || hasChangedSize){
				let degreePerFan = (2 * Math.PI) / numFans;
				vertices = [center.x, center.y];
				for(let i = 0; i <= numFans; i ++ ){
                    let index = ATTRIBUTES * i + 2;
					let angle = degreePerFan * (i+1);
					vertices[index]= center.x + Math.cos(angle) * radius;
					vertices[index + 1] = center.y + Math.sin(angle) * radius;
				}
			}
			gl.uniform3f(program.colorLoc, color[0], color[1], color[2]);

            let vertBuffer = gl.createBuffer();
			gl.bindBuffer(gl.ARRAY_BUFFER, vertBuffer);
			gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertices), gl.STATIC_DRAW);
			gl.vertexAttribPointer(program.positionLoc, 2, gl.FLOAT, gl.FALSE, ATTRIBUTES * Float32Array.BYTES_PER_ELEMENT, 0);
			gl.enableVertexAttribArray(program.positionLoc);

			gl.drawArrays(gl.TRIANGLE_FAN, 0, vertices.length/ATTRIBUTES);
		},

		tick: function(theta){
		},

		circleCollision : function(circle){
			let circleCenter = circle.getCenter();
			let circleRadius = circle.getSize()/2;

			return Math.pow(Math.abs(circleCenter.x - center.x),2) + Math.pow(Math.abs(circleCenter.y - center.y),2) <= Math.pow(radius + circleRadius,2);
		}
	};
};
