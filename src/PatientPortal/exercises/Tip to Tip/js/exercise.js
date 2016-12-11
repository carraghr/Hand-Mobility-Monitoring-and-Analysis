window.TO_DEG = 180 / Math.PI;

var time = Date.now();
var record = {};
var recording = false;
var seq;
var fingeresSelected = Object.keys(targets);

var resetRecord = function(){
    for(let index = 0; index < fingeresSelected.length; index++){
        record[fingeresSelected[index]] = [];
    }
};

(function () {
    resetRecord();
})();

var measurement = function(hand,fingers){

    let distances = {};
    let joint = 0;
    let thumb = vec3.create();
    hand.thumb.distal.lerp(thumb,joint);

    for(let fingerGap = 0; fingerGap < fingers.length; fingerGap++){
        let finger = vec3.create();
        if (fingers[fingerGap] === "index") {
            hand.indexFinger.distal.lerp(finger,joint);
        } else if (fingers[fingerGap] === "middle") {
           hand.middleFinger.distal.lerp(finger,joint);
        } else if (fingers[fingerGap] === "ring") {
            hand.ringFinger.distal.lerp(finger,joint);
        } else if (fingers[fingerGap] === "pinky") {
            hand.pinky.distal.lerp(finger,joint);
        }
        let distance = vec3.distance(thumb,finger);
        distances[fingers[fingerGap]]=(distance / 10).toPrecision(2);
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

var shortestDistance = function(distances){
	let fingers = Object.keys(distances);
	let shortestDistance =distances[fingers[0]];
	let shortestFinger;

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
            } else if (frame.hands.length == 1 && frame.hands[0].type != selectedHand) {
                Game.pause();
            } else {
                for (let handIndex = 0, numberOfHands = frame.hands.length; handIndex < numberOfHands; handIndex++) {

                    let hand = frame.hands[handIndex];

                    if (hand.type == selectedHand){

                         let distances = measurement(hand, fingeresSelected);

                         let t1 = Date.now();
                         let theta = (t1 - time) / 0.001;
                         time = t1;
                         seq  = Game.tick(theta);
                         Game.drawScene();

                         if (Game.distanceCheck()) {
							 for(let index = 0; index < fingeresSelected.length; index++) {
							 	record[fingeresSelected[index]].push(angles[fingeresSelected[index]]);
							 }
							 recording = true;
                         }else if (recording) {
							 Game.processTracking(repsToDo, seq, record);
							 resetRecord();
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

                    let angles = measurement(hand, fingeresSelected);

                    Game.separateLid(targetMeet(angles, targets));

                    let t1 = Date.now();
                    let theta = 0.001;
                    time = t1;
                    seq  = Game.tick(theta);
                    Game.drawScene();

                    if (Game.distanceCheck()) {
                        for(let index = 0; index < fingeresSelected.length; index++) {
                            record[fingeresSelected[index]].push(angles[fingeresSelected[index]]);
                        }recording = true;
                    } else if (recording) {
                        Game.processTracking(repsToDo, seq, record);
                        resetRecord();
                        recording = false;
                    }
                }
            }
        }else if(Game.isCompleted()){
            if (recording) {
                Game.processTracking(repsToDo, seq, record);
                record = [];
                recording = false;
                Game.tick(1);
            }

        }
    }
});

