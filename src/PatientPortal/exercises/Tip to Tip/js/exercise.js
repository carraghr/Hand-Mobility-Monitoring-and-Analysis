window.TO_DEG = 180 / Math.PI;

var time = Date.now();
var record = [];
var recording = false;
var trackRecord;

var resetRecord = function(){
    for(let index = 0; index < fingersSelected.length; index++){
        record[fingersSelected[index]] = [];
    }
};

var measurement = function(hand,fingers){
    let distances = {};
    let joint = 0;
    let thumb = vec3.create();
    hand.thumb.distal.lerp(thumb,joint);

    for(let fingerTip = 0; fingerTip < fingers.length; fingerTip++){
        let finger = vec3.create();
        if (fingers[fingerTip] === "index") {
            hand.indexFinger.distal.lerp(finger,joint);
        } else if (fingers[fingerTip] === "middle") {
           hand.middleFinger.distal.lerp(finger,joint);
        } else if (fingers[fingerTip] === "ring") {
            hand.ringFinger.distal.lerp(finger,joint);
        } else if (fingers[fingerTip] === "pinky") {
            hand.pinky.distal.lerp(finger,joint);
        }
        let distance = vec3.distance(thumb,finger);
        distances[fingers[fingerTip]]=(distance / 10).toPrecision(2);
    }
    return distances;
};

var targetMeet = function(distances, targets){
    let targetMet = 0;
    let fingers = Object.keys(distances);

    for (let finger of fingers){
        if(distances[finger] >= targets[finger]){
            targetMet++;
        }
    }
    return (targetMet/fingers.length);
};

var fingerShortestDistance = function(distances){
	let fingers = Object.keys(distances);
	let shortestDistance = distances[fingers[0]];
	let shortestFinger = fingers[0];

	for(let finger of fingers){
		if(shortestDistance > distances[finger]){
			shortestDistance = distances[finger];
			shortestFinger = finger;
		}
	}
	return shortestFinger;
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
                         let distances = measurement(hand, fingersSelected);
                         let shortestFinger = fingerShortestDistance(distances);
                         let t1 = Date.now();
                         let theta = (t1 - time) / 0.001;
                         time = t1;
                         trackRecord  = Game.tick(theta,shortestFinger);
                         if (Game.distanceCheck()) {
                             record.push(distances[fingersSelected[trackRecord.finger]]);
                             recording = true;
                         }else if (recording) {
							 Game.processTracking(repsToDo, trackRecord.seq, fingersSelected[trackRecord.finger], record);
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
					let distances = measurement(hand, fingersSelected);
					let shortestFinger = fingerShortestDistance(distances);
					let t1 = Date.now();
					let theta = (t1 - time) / 0.001;
					time = t1;
					trackRecord  = Game.tick(theta,shortestFinger);
					if (Game.distanceCheck()) {
						record.push(distances[fingersSelected[trackRecord.finger]]);
						recording = true;
					}else if (recording) {
						Game.processTracking(repsToDo, trackRecord.seq, trackRecord.finger, record);
						record=[];
						recording = false;
					}
                }
            }
        }else if(Game.isCompleted()){
            if (recording) {
                Game.processTracking(repsToDo, trackRecord, record);
                record = [];
                recording = false;
                Game.tick(1);
            }

        }
    }
});

