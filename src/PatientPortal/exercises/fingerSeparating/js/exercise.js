window.TO_DEG = 180 / Math.PI;

var time = Date.now();

var targets = [5];
var repsToDo = 2;
var fingeresSelected = ["index"];
var selectedHand = 'right';
var record = [];
var recording = false;
var seq;
var measurement = function(hand,fingers){

    let angles = [];

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
        var dir = Leap.vec3.dot(hand.palmNormal, crossInFingers);
        if (dir < 0) {
            angle *= -1;
        }
        angles[fingerGap]=(angle * TO_DEG).toPrecision(2);
    }

    return angles;
};

var targetMeet = function(angles, targets){
    let targetMet = 0;
    for (let i =0; i<angles.length; i++){
        if(angles[i] >= targets[i]){
            targetMet++;
        }
    }
    return (targetMet/targets.length);// * 100;
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
                        seq  = Game.tick(1);
                        Game.drawScene();

                        if (Game.distanceCheck()) {
                            record.push(angles);
                            recording = true;
                        } else if (recording) {
                            Game.processTracking(repsToDo, seq, record);
                            record = [];
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
                    seq  = Game.tick(1);
                    Game.drawScene();

                    if (Game.distanceCheck()) {
                        record.push(angles);
                        recording = true;
                    } else if (recording) {
                        Game.processTracking(repsToDo, seq, record);
                        record = [];
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

