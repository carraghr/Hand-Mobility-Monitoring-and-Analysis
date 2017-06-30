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

    let returnObject = {start : e.data.start, end : e.data.end };
    let record = [];

    let distances = e.data.record.distances; // objects of fingers filled with array of angles.
    let mean = meanOfAngles(distances);
    let min = minOfAngles(distances);
    let max = maxOfAngles(distances);
    let median = medianOfAngles(distances);
    let tempObject = {rep : ""+e.data.record.rep, sequence : ""+e.data.record.sequence, finger: ""+e.data.record.finger, minimum : ""+min, avg:""+mean, maximum : ""+max, median : ""+median};
    record.push(tempObject);
    returnObject.record = record;
    self.postMessage(returnObject);
});