<?php
function submitExericse($databaseConnection, $patientID, $exerciseName, $hand, $location, $target, $reps, $seqs){

    $exerciseAdditionQuery = "select Area from exercises where Name = '$exerciseName'";

    $exerciseType = @mysqli_query($databaseConnection, $exerciseAdditionQuery) OR trigger_error($databaseConnection->error . "[$exerciseAdditionQuery]");
    $resultRow = mysqli_fetch_assoc($exerciseType);
    if(strcmp($resultRow['Area'],"Hand" ) == 0){
        $exerciseAdditionQuery = "insert into handtargets values ('$patientID','$exerciseName','$hand','$location','$target','$reps','$seqs')";

        $exerciseNameQueryResult = @mysqli_query($databaseConnection, $exerciseAdditionQuery) OR trigger_error($databaseConnection->error . "[$exerciseAdditionQuery]");

        return $exerciseNameQueryResult;
    }else{
        $exerciseAdditionQuery = "insert into WristTargets values ('$patientID','$exerciseName','$hand','$location','$target','$reps','$seqs')";

        $exerciseNameQueryResult = @mysqli_query($databaseConnection, $exerciseAdditionQuery) OR trigger_error($databaseConnection->error . "[$exerciseAdditionQuery]");

        return $exerciseNameQueryResult;
    }
}

function exerciseTargetLookup($databaseConnection, $exerciseName){
    $exerciseAdditionQuery = "select Area from exercises where Name = '$exerciseName'";

    $exerciseType = @mysqli_query($databaseConnection, $exerciseAdditionQuery) OR trigger_error($databaseConnection->error . "[$exerciseAdditionQuery]");
    $resultRow = mysqli_fetch_assoc($exerciseType);
    if(strcmp($resultRow['Area'],"Hand" ) == 0){
        $exerciseLocationQuery = "select Location
                  from HandExerciseTargetLocations
                  where Exercise = '$exerciseName'";

        $exerciseNameQueryResult = @mysqli_query($databaseConnection, $exerciseLocationQuery) OR trigger_error($databaseConnection->error . "[$exerciseLocationQuery]");

        $results = array();

        while($resultRow = mysqli_fetch_assoc($exerciseNameQueryResult)){
            array_push($results,$resultRow['Location']);
        }

        return $results;
    }else{
        $exerciseLocationQuery = "select Movement
                  from WristExerciseTargetLocations
                  where Exercise = '$exerciseName'";

        $exerciseNameQueryResult = @mysqli_query($databaseConnection, $exerciseLocationQuery) OR trigger_error($databaseConnection->error . "[$exerciseLocationQuery]");

        $results = array();

        while($resultRow = mysqli_fetch_assoc($exerciseNameQueryResult)){
            array_push($results,$resultRow['Movement']);
        }

        return $results;
    }
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