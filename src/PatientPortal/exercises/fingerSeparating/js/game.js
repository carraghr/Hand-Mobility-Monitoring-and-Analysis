Game = {

    pause : function() {
        var text = document.getElementById('gameStatus');
        text.innerHTML = "paused";
        this.status = 'paused';
    },

    resume : function(){
        var text = document.getElementById('gameStatus');
        text.innerHTML = "playing";
        this.status = 'playing';
    },

    isPaused :function(){
        return this.status == 'paused';
    },

    init : function() {
        this.gl = Main.gl;
        this.speed = 1;
        this.bucket = new Bucket();
        this.bucket.setSize(this.gl.drawingBufferWidth * 0.1, this.gl.drawingBufferHeight * 0.15);
        this.bucket.setDefaultPosition(this.gl.drawingBufferWidth/2, this.gl.drawingBufferHeight * 0.075 ,1);

        this.droplets = [];
        this.leader = 0;
        for(let index = 0; index < 5; index++){
            if(index == 0){
                this.droplets[index] = new Drop();
                this.droplets[index].setCenter(this.gl.drawingBufferWidth / 2, this.gl.drawingBufferHeight * 0.90);
                this.droplets[index].setSize(this.gl.drawingBufferHeight * 0.15);
                this.droplets[index].setColor([1.0, 0.5, 0.0],[0.24, 0.522, 0.863]);

            }else{
                this.droplets[index] = new Drop();
                var center = this.droplets[index -1].getCenter();

                this.droplets[index].setCenter(center[0], center[1] + (this.gl.drawingBufferHeight * 0.15));
                this.droplets[index].setSize(this.gl.drawingBufferHeight * 0.15);
                this.droplets[index].setColor([1.0, 0.5, 0.0],[0.24, 0.522, 0.863]);
            }
        }
        this.status = 'playing';
    },

    separateLid : function(distance){
        return this.bucket.separateLids(distance);
    },

    tick : function(theta){

        for(var index = this.leader; index < 5; index++){
            this.droplets[index].tick(theta);
        }
        if(this.bucket.dropLidCollision(this.droplets[this.leader])){
            this.leader = (this.leader + 1) % 5;
            console.log(this.leader);
            if(this.leader == 0){
                for(let index = 0; index < 5; index++){
                    if(index == 0) {
                        this.droplets[index].setCenter(this.gl.drawingBufferWidth / 2, this.gl.drawingBufferHeight * 0.90);
                        this.droplets[index].setSize(this.gl.drawingBufferHeight * 0.15);
                    }else{
                        let center = this.droplets[index -1].getCenter();
                        this.droplets[index].setCenter(center[0], center[1] + (this.gl.drawingBufferHeight * 0.15));
                        this.droplets[index].setSize(this.gl.drawingBufferHeight * 0.15);
                    }
                }
            }
        }
    },

    distanceCheck : function(){
        console.log(this.gl.drawingBufferHeight * 0.1);
        return this.bucket.distanceFromDrop(this.droplets[this.leader]) <= this.gl.drawingBufferHeight * 0.1;
    },

    drawScene : function(){
        this.gl.clearColor(0.24, 0.522, 0.863, 1);
        this.gl.clear(this.gl.COLOR_BUFFER_BIT | this.gl.DEPTH_BUFFER_BIT);
        for(var index = this.leader; index < 5; index++){
            this.droplets[index].draw(this.gl);
        }
        this.bucket.draw(this.gl);
    }


};