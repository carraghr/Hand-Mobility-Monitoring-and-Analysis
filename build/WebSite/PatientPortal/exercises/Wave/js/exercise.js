let time = Date.now();
let record = [];
let recording = false;
let trackRecord;

let measurement = function(hand){
	let wristPos = Leap.vec3.create();

	hand.arm.lerp(wristPos, 1);
	wristPos[0] = 0;

	let palmPos = hand.palmPosition;
	palmPos[0] = 0;

	let corner  = [0, wristPos[1], palmPos[2]];

	let opposite = vec3.distance(corner, palmPos);
	let Adjacent = vec3.distance(wristPos, corner);

	if( palmPos[1]> wristPos[1]){
		return (Math.atan(opposite/Adjacent) * (180 / Math.PI));
	}else{
		return -1 * (Math.atan(opposite/Adjacent) * (180 / Math.PI));
	}
};

let targetMeet = function(movement, angleOfMovement){
	let goal = targets[movement];

    let percentageOfGoal = angleOfMovement/goal;

	if(percentageOfGoal > 1){
		return 1;
	}
    else if(percentageOfGoal < -1){
    	return -1;
	}else{
    	return percentageOfGoal;
	}
};

Leap.loop({background:false, frameEventName:"animationFrame"},function (frame){
    if(Game.isPlayable()){
        if (!Game.isPaused() && !Game.isCompleted()){
            if (frame.hands.length == 0) {
                Game.pause();
            }else if (frame.hands.length == 1 && frame.hands[0].type != selectedHand){
                Game.pause();
            }else {
                for(let handIndex = 0, numberOfHands = frame.hands.length; handIndex < numberOfHands; handIndex++){
                    let hand = frame.hands[handIndex];
                    if(hand.type == selectedHand){
                    	 let movement = Game.requiredMovement();
                         let angleOfMovement = measurement(hand);
                         let targetmet = targetMeet(movement, angleOfMovement);

                         let t1 = Date.now();
                         let theta = (t1 - time) / 0.001;
                         time = t1;

						 let trackRecord = Game.tick(theta,targetmet);
                         Game.drawScene();
                         if(Game.distanceCheck()){
                             record.push(angleOfMovement);
                             recording = true;
                         }else if(recording){
							 Game.processTracking(repsToDo, trackRecord.seq, movement, record, trackRecord.lastElement);
							 record=[];
							 recording = false;
                         }
					}
				}
			}
        }else if(Game.isPaused()){
            for (let handIndex = 0, numberOfHands = frame.hands.length; handIndex < numberOfHands; handIndex++) {

                let hand = frame.hands[handIndex];

                if (hand.type == selectedHand) {

                    Game.resume();

					let movement = Game.requiredMovement();
					let angleOfMovement = measurement(hand);
					let targetmet = targetMeet(movement, angleOfMovement);

					let t1 = Date.now();
					let theta = 0.001;
					time = t1;
					let trackRecord = Game.tick(theta,targetmet);
					Game.drawScene();

					if(Game.distanceCheck()){
						record.push(angleOfMovement);
						recording = true;
					}else if(recording){
						Game.processTracking(repsToDo, trackRecord.seq, movement, record,trackRecord.lastElement);
						record=[];
						recording = false;
					}
                }
            }
        }else if(Game.isCompleted()){
            if (recording) {
                Game.processTracking(repsToDo, trackRecord, record, true);
                record = [];
                recording = false;
                Game.tick(1);
            }

        }
    }
});

