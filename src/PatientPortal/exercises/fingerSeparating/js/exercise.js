window.TO_DEG = 180 / Math.PI;

var time = Date.now();

var targets = [];

var measurement = function(hand,fingers){

    var angles = [];

    for(let fingerGap = 0; fingerGap < fingers; fingerGap++){
        let firstFinger, secondFinger;
        switch (fingers[fingerGap]){
            case "thumb":
                firstFinger = hand.thumb.proximal.direction();
                secondFinger = hand.indexFinger.proximal.direction();
                break;
            case "index":
                firstFinger = hand.indexFinger.proximal.direction();
                secondFinger = hand.middleFinger.proximal.direction();
                break;
            case "middle":
                firstFinger =  hand.middleFinger.proximal.direction();
                secondFinger = hand.ringFinger.proximal.direction();
                break;
            case "ring":
                firstFinger = hand.ringFinger.proximal.direction();
                secondFinger = hand.pinky.proximal.direction();
                break;
        }

        var dotProduct = vec3.dot(firstFinger, secondFinger);
        var angle = Math.acos(dotProduct / (vec3.length(firstFinger) * vec3.length(secondFinger)));

        var crossInFingers = vec3.create();
        vec3.cross(crossInFingers,firstFinger,secondFinger);
        var dir = Leap.vec3.dot(hand.palmNormal, crossInFingers);
        if (dir < 0) {
            angle *= -1;
        }

        angles.push((angle * TO_DEG).toPrecision(4) * 100);
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
    return (targetMet/targets);
};

var selectedHand = 'right';

Leap.loop({background:false, frameEventName:"animationFrame"},function (frame){

    if(!Game.isPaused()){
        if(frame.hands.length == 0){
            Game.pause();
        }else if(frame.hands.length == 1 && frame.hands[0].type != selectedHand){
            Game.pause();
        }else{
            for (let handIndex = 0, numberOfHands = frame.hands.length; handIndex < numberOfHands; handIndex++){
                var hand = frame.hands[handIndex];

                if(hand.type==selectedHand){
                    let angles = measurement(hand,["index"]);
                    console.log(angles);

                    Game.separateLid(targetMeet(angles,targets));

                    var t1 = Date.now();
                    var theta = (t1 - time) * 0.001;
                    time = t1;
                    Game.tick(theta);
                    Game.drawScene();
                }
            }
        }
    }
    if(Game.isPaused()){
        for (let handIndex = 0, numberOfHands = frame.hands.length; handIndex < numberOfHands; handIndex++) {

            var hand = frame.hands[handIndex];

            if(hand.type==selectedHand){

                Game.resume();
                let angles = measurement(hand,["index"]);
                console.log(angles);

                Game.separateLid(targetMeet(angles,targets));

                var t1 = Date.now();
                var theta = 1 * 0.001;
                time = t1;
                Game.tick(theta);
                Game.drawScene();
            }
        }
    }
});

