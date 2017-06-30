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

    let angles = {};

    for(let fingerGap = 0; fingerGap < fingers.length; fingerGap++){
        let firstFinger, secondFinger;
        if (fingers[fingerGap] === "thumb") {
            firstFinger = hand.thumb.proximal.direction();
            secondFinger = hand.indexFinger.proximal.direction();
        } else if (fingers[fingerGap] === "index") {
            firstFinger = hand.indexFinger.proximal.direction();
            secondFinger = hand.middleFinger.proximal.direction();
        } else if (fingers[fingerGap] === "middle") {
            firstFinger = hand.middleFinger.proximal.direction();
            secondFinger = hand.ringFinger.proximal.direction();
        } else if (fingers[fingerGap] === "ring") {
            firstFinger = hand.ringFinger.proximal.direction();
            secondFinger = hand.pinky.proximal.direction();
        }

        var dotProduct = vec3.dot(firstFinger, secondFinger);
        var angle = Math.acos(dotProduct / (vec3.length(firstFinger) * vec3.length(secondFinger)));

        var crossInFingers = vec3.create();
        vec3.cross(crossInFingers,firstFinger,secondFinger);
        var dir =vec3.create();
        vec3.dot(dir,hand.palmNormal, crossInFingers);
        if (dir < 0) {
            angle *= -1;
        }
        angles[fingers[fingerGap]]=(angle * TO_DEG).toPrecision(2);
    }
    return angles;
};

var targetMeet = function(angles, targets){
    let targetMet = 0;

    let fingers = Object.keys(angles);

    for (let finger of fingers){
        if( 1.0*angles[finger] > 1.0*targets[finger]){
            targetMet++;
        }
    }
    return (targetMet/fingers.length);
};

Leap.loop({background:false, frameEventName:"animationFrame"},function (frame){

    if(Game.isPlayable()){
        if (!Game.isPaused() && !Game.isCompleted()) {
            if (frame.hands.length == 0) {
                Game.pause();
            } else if (frame.hands.length == 1 && frame.hands[0].type != selectedHand) {
                Game.pause();
            } else {
                for (let handIndex = 0, numberOfHands = frame.hands.length; handIndex < numberOfHands; handIndex++) {

                    let hand = frame.hands[handIndex];

                    if (hand.type == selectedHand) {

                        let angles = measurement(hand, fingeresSelected);
                        Game.separateLid(targetMeet(angles, targets));

                        let t1 = Date.now();
                        let theta = (t1 - time) / 0.001;
                        time = t1;
                        seq  = Game.tick(theta);
                        Game.drawScene();


                        if (Game.distanceCheck()) {
                            for(let index = 0; index < fingeresSelected.length; index++) {
                                record[fingeresSelected[index]].push(angles[fingeresSelected[index]]);
                            }recording = true;
                        } else if (recording) {
                            Game.processTracking(repsToDo, seq.lastPosition, record,seq.lastElement);
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
                        Game.processTracking(repsToDo, seq.lastPosition, record,seq.lastElement);
                        resetRecord();
                        recording = false;
                    }
                }
            }
        }else if(Game.isCompleted()){
            if (recording){
                Game.processTracking(repsToDo, seq.lastPosition, record,true);
                record = [];
                recording = false;
                Game.tick(1);
            }
        }
    }
});

