var meanOfAngles = function(angles) {
    let total = 0;
    for(let i = 0; i < angles.length; i++){
        let temp = 1 * angles[i];
        total +=temp;
    }
    return (total / angles.length).toPrecision(2);
};

var minOfAngles = function(angles){
    let min =   1 * angles[0];
    for(let i = 1; i < angles.length; i++){
        if(min > 1 * angles[i]){
            min = 1 * angles[i];
        }
    }
    return min;
};

var maxOfAngles = function(angles) {
    let max = 1 * angles[0];
    for(let i = 1; i < angles.length; i++){
        if(max < 1 * angles[i]){
            max = 1 * angles[i];
        }
    }
    return max;
};

var medianOfAngles = function(angles) {
    angles.sort(function(a, b){
        return a - b;
    });
    if(angles.length % 2 == 0){
        return ( (1 *angles[(angles.length/2) -1]) + (1 * angles[angles.length/2]))/2
    }else{
        return 1 * angles[Math.floor(angles.length/2)];
    }
};


self.addEventListener('message', function (e) {

    let data = e.data.record.angles;
    var mean = meanOfAngles(data);
    var min = minOfAngles(data);
    var max = maxOfAngles(data);
    var median = medianOfAngles(data);

    self.postMessage({record : { rep : ""+e.data.record.rep, sequence : ""+e.data.record.sequence, minimum : ""+min, avg:""+ mean, maximum : ""+max, median : ""+median} , start : e.data.start, end : e.data.end });
});