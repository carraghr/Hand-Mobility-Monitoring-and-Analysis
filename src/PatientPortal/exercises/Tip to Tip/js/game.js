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

    isCompleted :function(){
        return this.status == 'complete';
    },

    isPlayable :function(){
        return this.playable == 'playable';
    },

    processTracking : function(repsToDo, sequencePosition, recordings){

        let repCount = this.repsDone;
        if(sequencePosition === this.sequence){
            repCount-=1;
        }

        let start = (repCount === 1 &&  sequencePosition === 1);
        let end = (repCount === repsToDo &&  sequencePosition === this.sequence);

        var temp = { record : { rep : repCount, sequence: sequencePosition, angles : recordings }, start : start, end : end };
        this.webworker.postMessage(temp);


    },

    init : function(){
        this.repsDone = 1;
        this.sequence = seqsToDo;
        this.score = 0;

		this.numberOfBaseInput = 4;

		this.base = new FingerBase();
		this.base.createBase();

        this.webworker = new Worker('../../Tip to Tip/js/dataProcessing.js');

        this.webworker.addEventListener('message',  function (e) {

            let str = "";
            let json = JSON.stringify(e.data.record);
            if(e.data.start === true){
                str = '{ "exerciseRecord" : [' + json+ ',';
            }else if(e.data.end === true){
                let cookie = document.cookie.split(';');
                console.log(cookie);
                str = json + ']';
                for(let i = 0; i < cookie.length; i++){
                    if(cookie[i].includes("PHPSESSID")){
                        let value = cookie[i].substring(cookie[i].indexOf("=")).trim();
                        str = str + ',"PHPSESSID" : "' + value +'"';
                    }else if(cookie[i].includes("SelectedHand")){
                        let value = cookie[i].substring(cookie[i].indexOf("=")).trim();
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
                            let index2 = redirect.lastIndexOf('/exercises/Finger Separating');
                            redirect = redirect.substring(0,index2);
                            window.location.href = redirect;
                        }
                    }
                };
            }
        });
    },

    tick : function(theta){
    },

    distanceCheck : function(){
    },

    drawScene : function(){
    }
};