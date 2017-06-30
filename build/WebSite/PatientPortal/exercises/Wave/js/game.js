Game = {

	/*set up pause and resume screens for game play*/
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

	/*Send information received from exercise to web worker*/
    processTracking : function(repsToDo, sequencePosition, finger,recordings,lastElement){

        let repCount = this.repsDone;
		if(this.endOfRecord || lastElement){
			repCount -=1;//formatting of results
		}

        let temp = { record : { rep : repCount, sequence: sequencePosition, distances : recordings, finger: finger }, start : this.startOfRecord, end : this.endOfRecord };

        if(this.startOfRecord){
			this.startOfRecord = false;
		}
        this.webworker.postMessage(temp);
    },

    init : function(){

    	//init reps and seq for exercise
        this.repsDone = 1;
        this.sequence = seqsToDo;
        this.score = 0;

        this.movementIndex = 0;
        this.movement = movementKeys[this.movementIndex];
        this.totalAmountOfMovements = movementKeys.length;

        //get webgl object
		this.gl = Main.gl;

		//create red blocking bar at side of screen
		this.bar = new Bar();
		this.bar.createBar((this.gl.drawingBufferWidth*.1) + this.gl.drawingBufferHeight * 0.15,this.gl.drawingBufferHeight/2, this.gl.drawingBufferHeight * 0.15, this.gl.drawingBufferHeight);
		this.bar.createOpening((this.gl.drawingBufferWidth*.1) + this.gl.drawingBufferHeight * 0.15,this.gl.drawingBufferHeight/2, this.gl.drawingBufferHeight * 0.15, this.gl.drawingBufferHeight/4);
		this.bar.setColors([102,0,0],[255,102,102]);

		//set moving nodes
		this.nodes = [];
		this.sequenceIndex = 0;

		let offset = (this.gl.drawingBufferHeight * 0.5)+(this.gl.drawingBufferHeight * 0.15);
		//loop for each sequence to do in a rep
		for(let index =0; index < this.sequence; index++){
			this.nodes[index] = [];
			//loop for each movement to be done in a sequence
			/**
			 * For indexing and placement of next node use the one before.
			 */
			for(let moveIndex = 0; moveIndex < this.totalAmountOfMovements; moveIndex++){
				if(movementKeys[moveIndex] === "extension"){
					if(moveIndex == 0 && index == 0){
						//start of both movement and sequence
						let tempObj = new Node();
						tempObj.create(this.gl.drawingBufferWidth, this.gl.drawingBufferHeight * 0.90, this.gl.drawingBufferHeight * 0.15, [1.0, 0.5, 0.0],"Left");
						this.nodes[index][moveIndex] = tempObj;
					}else if(moveIndex == 0){
						//not the first sequence but the first element of next sequence
						let tempObj = new Node();
						let center = this.nodes[index - 1][this.totalAmountOfMovements - 1].getCenter();
						offset =(center.x + this.gl.drawingBufferWidth/4);
						tempObj.create(offset, this.gl.drawingBufferHeight * 0.90, this.gl.drawingBufferHeight * 0.15, [1.0, 0.5, 0.0],"Left");
						this.nodes[index][moveIndex] = tempObj;
					}else{
						let tempObj = new Node();
						let center = this.nodes[index][moveIndex-1].getCenter();
						offset =(center.x + this.gl.drawingBufferWidth/4);
						tempObj.create(offset, this.gl.drawingBufferHeight * 0.90, this.gl.drawingBufferHeight * 0.15, [1.0, 0.5, 0.0],"Left");
						this.nodes[index][moveIndex] = tempObj;
					}
				}else{
					if(moveIndex == 0 && index == 0){
						//start of both movement and sequence
						let tempObj = new Node();
						tempObj.create(this.gl.drawingBufferWidth, this.gl.drawingBufferHeight * 0.10, this.gl.drawingBufferHeight * 0.15, [1.0, 0.5, 0.0],"Left");
						this.nodes[index][moveIndex] = tempObj;
					}else if(moveIndex == 0){
						//not the first sequence but the first element of next sequence
						let tempObj = new Node();
						let center = this.nodes[index - 1][this.totalAmountOfMovements - 1].getCenter();
						offset =(center.x + this.gl.drawingBufferWidth/4);
						tempObj.create(offset, this.gl.drawingBufferHeight * 0.10, this.gl.drawingBufferHeight * 0.15, [1.0, 0.5, 0.0],"Left");
						this.nodes[index][moveIndex] = tempObj;
					}else{
						let tempObj = new Node();
						let center = this.nodes[index][moveIndex-1].getCenter();
						offset =(center.x + this.gl.drawingBufferWidth/4);
						tempObj.create(offset, this.gl.drawingBufferHeight * 0.10, this.gl.drawingBufferHeight * 0.15, [1.0, 0.5, 0.0],"Left");
						this.nodes[index][moveIndex] = tempObj;
					}
				}
			}
		}

		//create web working for back ground processing
        this.webworker = new Worker('../../Wave/js/dataProcessing.js');

		//respond to workers results
        this.webworker.addEventListener('message',  function (e) {

            let str = "";
            let json = JSON.stringify(e.data.record);
            if(e.data.start === true){
                str = '{ "exerciseRecord" : [' + json+ ',';
            }else if(e.data.end === true){
                let cookie = document.cookie.split(';');
                str = json + ']';
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
                str = json + ',';
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

        this.startOfRecord = true;
		this.endOfRecord = false;

		this.status = 'paused';
		this.playable = 'playable';

		let dialog = document.getElementById('gameStatus');
		dialog.showModal();
		document.getElementById('gameStatusTitle').innerText = "Game Ready!";
		document.getElementById('gameStatusContent').innerText = "The game is ready to be Played. \n\n Please place your "+ selectedHand +" hand over the leap motion to begin.";
    },

	moveBar : function(amount){
    	if(amount > 0){
			this.bar.moveFromCenter(((this.gl.drawingBufferHeight / 2) * amount) - this.bar.getBarHeight() / 2);
		}else{
			this.bar.moveFromCenter(((this.gl.drawingBufferHeight / 2) * amount) + this.bar.getBarHeight() / 2);
		}
	},

	requiredMovement : function (){
		return movementKeys[this.movementIndex];
	},

    tick : function(theta,targetMet){

		let lastElement = false;

		let lastmovement = this.movement;
		let lastPosition = this.sequenceIndex;
		this.moveBar(targetMet);
		for(let index = this.sequenceIndex; index < this.sequence; index++){
			for(let moveIndex = 0; moveIndex < this.totalAmountOfMovements; moveIndex++){
				if(theta > 1){
					this.nodes[index][moveIndex].tick(1);
				}else{
					this.nodes[index][moveIndex].tick(theta);
				}
			}
		}

		if(this.bar.behindBullet(this.nodes[this.sequenceIndex][this.movementIndex])){
			this.nodes[this.sequenceIndex][this.movementIndex].invisable();
			this.movementIndex = (this.movementIndex + 1) % this.totalAmountOfMovements;
			if(this.movementIndex == 0){
				this.sequenceIndex = (this.sequenceIndex + 1) % this.sequence;
				if(this.sequenceIndex == 0){
					this.repsDone++;
					lastElement = true;
					if(this.repsDone <= repsToDo){
						let offset = (this.gl.drawingBufferHeight * 0.5)+(this.gl.drawingBufferHeight * 0.15);
						for(let index = 0; index < this.sequence; index++){
							for(let moveIndex = 0; moveIndex < this.totalAmountOfMovements; moveIndex++){
								if(movementKeys[moveIndex] === "extension"){
									if(moveIndex == 0 && index == 0){
										this.nodes[index][moveIndex].setCenter(this.gl.drawingBufferWidth, this.gl.drawingBufferHeight * 0.90);
									}else if(moveIndex == 0){
										let center = this.nodes[index - 1][this.totalAmountOfMovements - 1].getCenter();
										offset = (center.x + this.gl.drawingBufferWidth / 4);
										this.nodes[index][moveIndex].setCenter(offset, this.gl.drawingBufferHeight * 0.90);
									}else{
										let center = this.nodes[index][moveIndex - 1].getCenter();
										offset = (center.x + this.gl.drawingBufferWidth / 4);
										this.nodes[index][moveIndex].setCenter(offset, this.gl.drawingBufferHeight * 0.90);
									}
								}else{
									if(moveIndex == 0 && index == 0){
										this.nodes[index][moveIndex].setCenter(this.gl.drawingBufferWidth, this.gl.drawingBufferHeight * 0.10);
									}else if(moveIndex == 0){
										let center = this.nodes[index - 1][this.totalAmountOfMovements - 1].getCenter();
										offset = (center.x + this.gl.drawingBufferWidth / 4);
										this.nodes[index][moveIndex].setCenter(offset, this.gl.drawingBufferHeight * 0.10);
									}else{
										let center = this.nodes[index][moveIndex - 1].getCenter();
										offset = (center.x + this.gl.drawingBufferWidth / 4);
										this.nodes[index][moveIndex].setCenter(offset, this.gl.drawingBufferHeight * 0.10);
									}
								}
								this.nodes[index][moveIndex].visable();
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
			}
		}
		return {seq:lastPosition + 1, movement : movementKeys[lastmovement], lastElement: lastElement};
    },

    distanceCheck : function(){
		return this.bar.distanceFromSameLevel(this.nodes[this.sequenceIndex][this.movementIndex]) < this.gl.drawingBufferWidth * 0.15;
    },

    drawScene : function(){
		this.gl.clearColor(0.24, 0.522, 0.863, 1);
		this.gl.clear(this.gl.COLOR_BUFFER_BIT | this.gl.DEPTH_BUFFER_BIT);
		this.bar.draw(this.gl);
		for(let index = this.sequenceIndex; index < this.sequence; index++){
			for(let moveIndex = 0; moveIndex < this.totalAmountOfMovements; moveIndex++){
				this.nodes[index][moveIndex].draw(this.gl);
			}
		}
	}
};