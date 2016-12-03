<?php
function submitExericse($databaseConnection, $patientID, $exerciseName, $hand, $location, $target, $reps, $seqs){
    $exerciseAdditionQuery = "insert into targets values ('$patientID','$exerciseName','$hand','$location','$target','$reps','$seqs')";

    $exerciseNameQueryResult = @mysqli_query($databaseConnection, $exerciseAdditionQuery) OR trigger_error($databaseConnection->error . "[$exerciseAdditionQuery]");

    return $exerciseNameQueryResult;
}

function exerciseTargetLookup($databaseConnection, $name){
    $exerciseLocationQuery = "select Location
                  from exercisetargetlocations
                  where Exercise = '$name'";

    $exerciseNameQueryResult = @mysqli_query($databaseConnection, $exerciseLocationQuery) OR trigger_error($databaseConnection->error . "[$exerciseLocationQuery]");

    $results = array();

    while($resultRow = mysqli_fetch_assoc($exerciseNameQueryResult)){
        array_push($results,$resultRow['Location']);
    }

    return $results;
}

function getTargets($hand, $locations, $form, $indexOfLocations){
    require_once('Exercises.php');

    $targets = array();
    $numberOfLocations = count($locations);
    for($index = $indexOfLocations, $count= 0;   $count < $numberOfLocations; $index++, $count++){
        $targetInstance = $form[$index]['name'];
        for($locationIndex = 0; $locationIndex < $numberOfLocations;$locationIndex++){
            if(strcmp($targetInstance,$hand. $locations[$locationIndex])==0 && $form[$index]['value'] > 0){
                array_push($targets, new Target($locations[$locationIndex],$form[$index]['value']));
            }
        }
    }
    return $targets;
}