Game = {

    pause : function() {
		let dialog = document.getElementById('gameStatus');
		dialog.showModal();
		document.getElementById('gameStatusTitle').innerText = "Game Paused!";
		document.getElementById('gameStatusContent').innerText = "The game has been paused. To continue the game please place your "+ selectedHand +" hand over the leap motion.";

        this.status = 'paused';
    },

    resume : function(){
		let dialog = document.getElementById('gameStatus');
		dialog.close();
        this.status = 'playing';
    },

    isPaused :function(){
        return this.status === 'paused';
    },

    isCompleted :function(){
        return this.status == 'complete';
    },

    isPlayable :function(){
        return this.playable === 'playable';
    },

    processTracking : function(repsToDo, sequencePosition, recordings,lastElement){

        let repCount = this.repsDone;
		if(this.endOfRecord || lastElement){
			repCount -=1;
		}

        var temp = { record : { rep : repCount, sequence: sequencePosition, angles : recordings }, start : this.startOfRecord, end : this.endOfRecord };

		if(this.startOfRecord){
			this.startOfRecord = false;
		}

        this.webworker.postMessage(temp);
    },

    init: function(){
        this.repsDone = 1;
        this.sequence = seqsToDo;
        this.score = 0;

        this.webworker = new Worker('../../Finger Separating/js/dataProcessing.js');
        this.webworker.addEventListener('message',  function (e) {

            let str = "";
            let json = JSON.stringify(e.data.record);
            if(e.data.start === true){
                str = '{ "exerciseRecord" : [';
            }
            str = str + json;
            if(e.data.end === true){
                let cookie = document.cookie.split(';');
                str = str + ']';
                for(let i = 0; i < cookie.length; i++){
					if(cookie[i].includes("PHPSESSID")){
						let value = cookie[i].substring(cookie[i].indexOf("=")).trim().substring(1);
						str = str + ',"PHPSESSID" : "' + value +'"';
					}else if(cookie[i].includes("SelectedHand")){
						let value = cookie[i].substring(cookie[i].indexOf("=")).trim().substring(1);
						str = str + ',"SelectedHand" : "' + value +'"';
					}
                }
                str = str + ' }';
            }else{
                str =  str + ',';
            }

            document.getElementById('json').insertAdjacentHTML( 'beforeend', str );

            if (e.data.end ===true){
                let jsonString = document.getElementById('json').innerHTML;
                let request = new XMLHttpRequest();
                let url = window.location.href;
                let index = url.lastIndexOf('/');
                url = url.substring(0,index) + '/submitData.php';
                request.open("POST", url, true);
                request.setRequestHeader("Content-type","application/json");
                request.send(jsonString);
                request.onreadystatechange = function(){
                    if (request.readyState == 4 && request.status == 200){
                        if(request.responseText == 1){
							setTimeout(function(){
								let redirect = window.location.href;
								let index2 = redirect.lastIndexOf('/exercises/');
								redirect = redirect.substring(0,index2);
								window.location.href = redirect;
							}, 3000);
                        }
                    }
                };
            }
        });

        this.gl = Main.gl;
        this.speed = 1;
        this.bucket = new Bucket();
        this.bucket.setSize(this.gl.drawingBufferWidth * 0.15, this.gl.drawingBufferHeight * 0.25);
        this.bucket.create(this.gl.drawingBufferWidth/2, this.gl.drawingBufferHeight * 0.15 ,4);
        this.bucket.setBucketColor([0.6,0.274,0.0], [1,0,0]);

        this.nodes = [];
        this.sequenceIndex = 0;
        for(let index = 0; index < this.sequence; index++){
            if(index == 0){
                this.nodes[index] = new Drop();
                this.nodes[index].setCenter(this.gl.drawingBufferWidth / 2, this.gl.drawingBufferHeight * 0.90);
                this.nodes[index].setSize(this.gl.drawingBufferHeight * 0.15);
                this.nodes[index].setColor([1.0, 0.5, 0.0],[0.24, 0.522, 0.863]);
            }else{
                this.nodes[index] = new Drop();
                let center = this.nodes[index -1].getCenter();
                this.nodes[index].setCenter(center.x, center.y + (this.gl.drawingBufferHeight * 0.15) +  (this.gl.drawingBufferHeight * 0.1));
                this.nodes[index].setSize(this.gl.drawingBufferHeight * 0.15);
                this.nodes[index].setColor([1.0, 0.5, 0.0],[0.24, 0.522, 0.863]);
            }
        }
        this.status = 'paused';
        this.playable = 'playable';

		this.startOfRecord = true;
		this.endOfRecord = false;

        let dialog = document.getElementById('gameStatus');
        dialog.showModal();
        document.getElementById('gameStatusTitle').innerText = "Game Ready!";
        document.getElementById('gameStatusContent').innerText = "The game is ready to be Played. \n\n Please place your "+ selectedHand +" hand over the leap motion to begin.";

		this.noScore = true;
    },

    separateLid: function(distance){
        return this.bucket.separateLids(distance);
    },

    tick : function(theta){
        let lastPosition = this.sequenceIndex;
		let lastElement = false;
        for(let index = this.sequenceIndex; index < this.sequence; index++){
            if(theta > 1){
                this.nodes[index].tick(1);
            }else{
                this.nodes[index].tick(theta);
            }
        }
        let miss = this.bucket.dropLidCollision(this.nodes[this.sequenceIndex]);
        let goal = !this.bucket.dropInBucket(this.nodes[this.sequenceIndex]);
        if(miss){
            this.noScore = true;
        }
        if(goal){

			this.sequenceIndex = (this.sequenceIndex + 1) % this.sequence;
            if(this.sequenceIndex == 0){
                this.repsDone++;
				lastElement = true;
                if(this.repsDone <= repsToDo){
                    for(let index = 0; index < this.sequence; index++){
                        if (index == 0){
                            this.nodes[index].setCenter(this.gl.drawingBufferWidth / 2, this.gl.drawingBufferHeight * 0.90);
                            this.nodes[index].setSize(this.gl.drawingBufferHeight * 0.15);
                        }else{
                            let center = this.nodes[index - 1].getCenter();
                            this.nodes[index].setCenter(center.x, center.y + (this.gl.drawingBufferHeight * 0.15) +  (this.gl.drawingBufferHeight * 0.1));
                            this.nodes[index].setSize(this.gl.drawingBufferHeight * 0.15);
                        }
                    }
                }else{
                    this.status = "complete";
					this.endOfRecord = true;

					let dialog = document.getElementById('gameStatus');
					dialog.showModal();
					document.getElementById('gameStatusTitle').innerText = "Game Completed!";
					document.getElementById('gameStatusContent').innerText = "The game complete please wait while data is processed.";
                }
            }
            if(goal && !this.noScore){
                this.score++;
				this.noScore=false;
            }else{
				this.noScore=false;
			}
        }
        return {lastPosition: lastPosition + 1, lastElement:lastElement};
    },

    distanceCheck : function(){
        let x = this.bucket.dropInBucket(this.nodes[this.sequenceIndex]) &&
			this.bucket.distanceFromDrop(this.nodes[this.sequenceIndex]) < ((this.nodes[this.sequenceIndex].getSize()/2)/3);
        console.log("Distance "+x);
        return x;
    },

    drawScene : function(){
        this.gl.clearColor(0.24, 0.522, 0.863, 1);
        this.gl.clear(this.gl.COLOR_BUFFER_BIT | this.gl.DEPTH_BUFFER_BIT);
        for(let index = this.sequenceIndex; index < this.sequence; index++){
            this.nodes[index].draw(this.gl);
        }
        this.bucket.draw(this.gl);
    }
};