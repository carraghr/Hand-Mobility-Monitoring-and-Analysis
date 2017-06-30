<?php
function submitExercise($databaseConnection, $patientID, $exerciseName, $hand, $location, $target, $reps, $seqs){

    $exerciseAdditionQuery = "select Area from exercises where Name = '$exerciseName'";

    $exerciseType = @mysqli_query($databaseConnection, $exerciseAdditionQuery) OR trigger_error($databaseConnection->error . "[$exerciseAdditionQuery]");
    $resultRow = mysqli_fetch_assoc($exerciseType);

    if(strcmp($resultRow['Area'],"Hand" ) == 0){
        $exerciseAdditionQuery = "insert into handtargets values ('$patientID','$exerciseName','$hand','$location','$target','$reps','$seqs')";
        $exerciseNameQueryResult = @mysqli_query($databaseConnection, $exerciseAdditionQuery) OR trigger_error($databaseConnection->error . "[$exerciseAdditionQuery]");

        return $exerciseNameQueryResult;
    }else{
        $exerciseAdditionQuery = "insert into wristtargets values ('$patientID','$exerciseName','$hand','$location','$target','$reps','$seqs')";

        $exerciseNameQueryResult = @mysqli_query($databaseConnection, $exerciseAdditionQuery) OR trigger_error($databaseConnection->error . "[$exerciseAdditionQuery]");

        return $exerciseNameQueryResult;
    }
}

function changedExerciseComponent($databaseConnection, $patientID, $exerciseName, $hand, $location, $target, $reps, $seqs){

    //Query to dfind out if exercise if for hand or wrist
    $exerciseAdditionQuery = "select Area from exercises where Name = '$exerciseName'";

    $exerciseType = @mysqli_query($databaseConnection, $exerciseAdditionQuery) OR trigger_error($databaseConnection->error . "[$exerciseAdditionQuery]");
    $resultRow = mysqli_fetch_assoc($exerciseType);

    if(strcmp($resultRow['Area'],"Hand" ) == 0){
        //update hand targets for hand in exercise
        $exerciseAdditionQuery = "update handtargets set Target = ".$target.", Repetition = ".$reps.", Sequence = ".$seqs." where PID = '$patientID' and Exercise = '$exerciseName' and Location = '$location' and Hand = '$hand';";
    }else{
        $exerciseAdditionQuery = "update wristtargets set Target = ".$target.", Repetition = ".$reps.", Sequence = ".$seqs." where PID = '$patientID' and Exercise = '$exerciseName' and Movement = '$location' and Hand = '$hand';";
    }

    $stmt = mysqli_prepare($databaseConnection, $exerciseAdditionQuery);// OR trigger_error($databaseConnection->error . "[$exerciseAdditionQuery]");

    mysqli_stmt_execute($stmt);

    return 1 == mysqli_stmt_affected_rows($stmt);
}

function exerciseTargetLookup($databaseConnection, $exerciseName){
    $exerciseAdditionQuery = "select Area from exercises where Name = '$exerciseName'";

    $exerciseType = @mysqli_query($databaseConnection, $exerciseAdditionQuery) OR trigger_error($databaseConnection->error . "[$exerciseAdditionQuery]");
    $resultRow = mysqli_fetch_assoc($exerciseType);
    if(strcmp($resultRow['Area'],"Hand" ) == 0){
        $exerciseLocationQuery = "select Location
                  from handexercisetargetlocations
                  where Exercise = '$exerciseName'";

        $exerciseNameQueryResult = @mysqli_query($databaseConnection, $exerciseLocationQuery) OR trigger_error($databaseConnection->error . "[$exerciseLocationQuery]");

        $results = array();

        while($resultRow = mysqli_fetch_assoc($exerciseNameQueryResult)){
            array_push($results,$resultRow['Location']);
        }

        return $results;
    }else{
        $exerciseLocationQuery = "select Movement
                  from wristexercisetargetlocations
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
            if(strcmp($targetInstance, $hand. $locations[$locationIndex])==0 && $form[$index]['value'] > 0){
                array_push($targets, new Target($locations[$locationIndex],$form[$index]['value']));
            }
        }
    }
    return $targets;
}

function formatTargetImput($hand, $locations, $form, $indexOfLocations){
    require_once('Exercises.php');

    $targets = array();
    $numberOfLocations = count($locations);
    for($index = $indexOfLocations, $count= 0;   $count < $numberOfLocations; $index++, $count++){
        $targetInstance = $form[$index]['name'];
        for($locationIndex = 0; $locationIndex < $numberOfLocations;$locationIndex++){
            if(strcmp($targetInstance, $hand. $locations[$locationIndex])==0 && ($form[$index]['value'] > 0 || $form[$index]['value'] == -1)){
                array_push($targets, new Target($locations[$locationIndex],$form[$index]['value']));
            }
        }
    }
    return $targets;
}

function removeExerciseComponent($databaseConnection, $patientID, $exerciseName, $hand, $location){

    //Query to find out if exercise if for hand or wrist
    $exerciseAdditionQuery = "select Area from exercises where Name = '$exerciseName'";

    $exerciseType = @mysqli_query($databaseConnection, $exerciseAdditionQuery) OR trigger_error($databaseConnection->error . "[$exerciseAdditionQuery]");
    $resultRow = mysqli_fetch_assoc($exerciseType);

    if(strcmp($resultRow['Area'],"Hand" ) == 0){
        //update hand targets for hand in exercise
        $exerciseAdditionQuery = "delete from handtargets where PID = '$patientID' and Exercise = '$exerciseName' and Location = '$location' and Hand = '$hand';";
    }else{
        $exerciseAdditionQuery = "delete from wristtargets where PID = '$patientID' and Exercise = '$exerciseName' and Location = '$location' and Hand = '$hand';";
    }

    $stmt = mysqli_prepare($databaseConnection, $exerciseAdditionQuery);// OR trigger_error($databaseConnection->error . "[$exerciseAdditionQuery]");

    mysqli_stmt_execute($stmt);

    return 1 == mysqli_stmt_affected_rows($stmt);
}