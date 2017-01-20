Game = {

    pause : function() {
        let text = document.getElementById('gameStatus');
        text.innerHTML = "paused";
        this.status = 'paused';
    },

    resume : function(){
		let text = document.getElementById('gameStatus');
        text.innerHTML = "playing";
        this.status = 'playing';
    },

    isPaused :function(){
        return this.status == 'paused';
    },

    isCompleted :function(){
        return this.status == 'complete';
    },

    isPlayable :function(){
        return this.playable == 'playable';
    },

    processTracking : function(repsToDo, sequencePosition, finger,recordings){

        let repCount = this.repsDone;
		if(this.endOfRecord){
			repCount -=1;
		}

        var temp = { record : { rep : repCount, sequence: sequencePosition, distances : recordings, finger: finger }, start : this.startOfRecord, end : this.endOfRecord };

        if(this.startOfRecord){
			this.startOfRecord = false;
		}
        this.webworker.postMessage(temp);

    },

    init : function(){
        this.repsDone = 1;
        this.sequence = seqsToDo;
        this.score = 0;

		this.gl = Main.gl;

		this.numberOfBaseInput = 4;

		this.base = new FingerBase();
		this.base.createBase(this.gl.drawingBufferWidth / 2, this.gl.drawingBufferHeight * 0.1,this.numberOfBaseInput, [1.0, 0.5, 0.0], [0.24, 0.522, 0.863], this.gl.drawingBufferHeight * 0.2);

		this.nodes = [];

		this.fingers = fingersSelected;
		this.fingersToExercise = this.fingers.length;
		this.fingerToExerciseIndex = 0;
		this.selectNodeToHit();
		this.sequenceIndex = 0;

		this.baseNodeLocation = this.base.getNodeCenter(this.nodeToHit);
		for(let index = 0; index < this.sequence; index++){
			if(index == 0){
				this.nodes[index] = new Node();
				this.nodes[index].setCenter(this.baseNodeLocation.x, this.gl.drawingBufferHeight * 0.90);
				this.nodes[index].setSize(this.gl.drawingBufferHeight * 0.15);
				this.nodes[index].setColor([1.0, 0.0, 0.0]);
			}else{
				this.nodes[index] = new Node();
				let center = this.nodes[index -1].getCenter();
				this.nodes[index].setCenter(this.baseNodeLocation.x, center.y + (this.gl.drawingBufferHeight * 0.15) +  (this.gl.drawingBufferHeight * 0.1));
				this.nodes[index].setSize(this.gl.drawingBufferHeight * 0.15);
				this.nodes[index].setColor([1.0, 0.0, 0.0]);
			}
		}

        this.webworker = new Worker('../../Tip to Tip/js/dataProcessing.js');

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
                        console.log(request.responseText);
                        if(request.responseText == 1){
                            let redirect = window.location.href;
                            let index2 = redirect.lastIndexOf('/exercises/');
                            redirect = redirect.substring(0,index2);
                            console.log(redirect);
                            window.location.href = redirect;
                        }
                    }
                };
            }
        });

        this.startOfRecord = true;
		this.endOfRecord = false;

		this.status = 'paused';
		this.playable = 'playable';
    },

    selectNodeToHit : function(){
        let finger = this.fingers[this.fingerToExerciseIndex];
		if (finger === "index"){
			this.nodeToHit = 0;
		} else if (finger === "middle") {
			this.nodeToHit = 1;
		} else if (finger === "ring") {
			this.nodeToHit = 2;
		} else if (finger === "pinky") {
			this.nodeToHit = 3;
		}
		this.baseNodeLocation = this.base.getNodeCenter(this.nodeToHit);
    },

    checkFingerPlacement : function(finger){
		if (finger === "index"){
			return this.nodeToHit == 0;
		}else if (finger === "middle") {
			return this.nodeToHit == 1;
		}else if (finger === "ring") {
			return this.nodeToHit == 2;
		}else if (finger === "pinky") {
			return this.nodeToHit == 3;
		}
    },

	nodeToHighlight : function(finger){
		if (finger === "index"){
			return 0;
		}else if (finger === "middle") {
			return 1;
		}else if (finger === "ring") {
			return 2;
		}else if (finger === "pinky") {
			return 3;
		}
	},

	tick : function(theta,finger){
		this.highlightedNode = this.nodeToHighlight(finger);
		this.base.highlightBaseHole(this.highlightedNode);
		let lastPosition = this.sequenceIndex;
		let lastBasePosition = this.fingerToExerciseIndex;
		for(let index = this.sequenceIndex; index < this.sequence; index++){
			if(theta > 1){
				this.nodes[index].tick(1);
			}else{
				this.nodes[index].tick(theta);
			}
		}
		let rightBase = this.checkFingerPlacement(finger);//this is for scoring points
		let inBase = this.base.checkCollision(this.fingerToExerciseIndex,this.nodes[this.sequenceIndex]);
		//shortestFinger check also that the finger is on the right base node.
		let nodeDroped = this.base.baseNodeBottomHit(this.nodeToHit, this.nodes[this.sequenceIndex]);

		if(!rightBase && inBase){
			this.scored = false;
		}

		if(nodeDroped){
			this.sequenceIndex = (this.sequenceIndex + 1) % this.sequence;
			if(this.sequenceIndex == 0){
				this.fingerToExerciseIndex = (this.fingerToExerciseIndex + 1) % this.fingersToExercise ;
				if(this.fingerToExerciseIndex == 0){
					this.repsDone++;
                }
				this.selectNodeToHit();
				if(this.repsDone <= repsToDo){
					for (let index = 0; index < this.sequence; index++) {
						if (index == 0){
							this.nodes[index].setCenter(this.baseNodeLocation.x, this.gl.drawingBufferHeight * 0.90);
						}else{
							let center = this.nodes[index - 1].getCenter();
							this.nodes[index].setCenter(this.baseNodeLocation.x, center.y + (this.gl.drawingBufferHeight * 0.15) +  (this.gl.drawingBufferHeight * 0.1));
						}
					}
				}else{
					this.endOfRecord = true;
					this.status = "complete";
				}
			}
			if(rightBase && this.scored){
			    //increase score.

            }
			this.scored = true;
		}
		return { seq :lastPosition + 1, finger: lastBasePosition};
    },

    distanceCheck : function(){
		return (this.base.distanceFromNodeBaseHoleTop(this.nodeToHit,this.nodes[this.sequenceIndex]) < (this.gl.drawingBufferHeight * 0.15))
				&&
				(this.base.distanceFromNodeBaseHoleBottom(this.nodeToHit,this.nodes[this.sequenceIndex]) > 0)  ;
    },

	drawScene : function(){
		this.gl.clearColor(0.24, 0.522, 0.863, 1);
		this.gl.clear(this.gl.COLOR_BUFFER_BIT | this.gl.DEPTH_BUFFER_BIT);
		this.base.draw(this.gl);
		for(let index = this.sequenceIndex; index < this.sequence; index++){
			this.nodes[index].draw(this.gl);
		}
		if(this.highlightedNode != "undefined")
		this.base.restoreColor(this.highlightedNode);
	}
};