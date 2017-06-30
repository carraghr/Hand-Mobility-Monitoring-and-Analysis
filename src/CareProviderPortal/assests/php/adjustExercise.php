<?php
    header("Content-type: application/x-www-form-urlencoded");

    if($_SERVER['REQUEST_METHOD']=='POST') {
        $SID = $_POST['PHPSESSID'];
        $PID = $_POST['PatientID'];

        session_id($SID);
        session_start();

        if (!isset($_SESSION['user_id'])) {
            echo 'Error Failed. Incorrect User';
            die();

        }else{

            require_once('addExerciseHelper.php');

            $form = $_POST['form'];

            $exerciseName = $form[0]['value'];
            $repetitions = $form[1]['value'];
            $sequences = $form[2]['value'];

            if($repetitions < 1){
                echo "Error Repetitions must be 1 or above";
                die();
            }
            if($sequences < 1){
                echo "Error Sequences must be 1 or above";
                die();
            }

            require('../../../databaseConnection.php');

            //update repetitions and sequences for all current exercises.
            updateRepSeq($databaseConnection, $exerciseName,$repetitions,$sequences);


            $targetLocations = exerciseTargetLookup($databaseConnection, $exerciseName);

            $leftHand = formatTargetImput('leftHand', $targetLocations, $form, 3);
            $rightHand = formatTargetImput('rightHand', $targetLocations, $form, count($targetLocations) + 3 );



            for($index = 0; $index < count($leftHand);$index++){
                if(((float)$leftHand[$index]->target) >= 0.0 ){
                    $changed = changedExerciseComponent($databaseConnection, $PID, $exerciseName, 'left',$leftHand[$index]->location,(float)$leftHand[0]->target,(int)$repetitions,(int)$sequences);
                    if(!$changed){
                        submitExercise($databaseConnection, $PID, $exerciseName, 'left',$leftHand[$index]->location,$leftHand[0]->target,(int) $repetitions,(int) $sequences);
                    }
                }else{
                    removeExerciseComponent($databaseConnection, $PID, $exerciseName, 'left',$leftHand[$index]->location);
                }
            }
            for($index = 0; $index < count($rightHand);$index++){
                if(((float)$rightHand[$index]->target) > 0.0 ){
                    $changed = changedExerciseComponent($databaseConnection, $PID, $exerciseName, 'right', $rightHand[$index]->location, (float)$rightHand[$index]->target,(int) $repetitions,(int)$sequences);
                    if(!$changed){
                        submitExercise($databaseConnection, $PID, $exerciseName, 'right', $rightHand[$index]->location, (float)$rightHand[$index]->target, (int)$repetitions, (int)$sequences);
                    }
                }else if(((float)$rightHand[$index]->target) == -1.0 ){
                    echo removeExerciseComponent($databaseConnection, $PID, $exerciseName, 'right',$rightHand[$index]->location);
                }
            }
        }
    }else{
        echo 'Error Failed. Incorrect Send Method';
    }

function updateRepSeq($databaseConnection, $exerciseName, $reps,$seqs){

    $exerciseAdditionQuery = "select Area from exercises where Name = '$exerciseName'";

    $exerciseType = @mysqli_query($databaseConnection, $exerciseAdditionQuery) OR trigger_error($databaseConnection->error . "[$exerciseAdditionQuery]");
    $resultRow = mysqli_fetch_assoc($exerciseType);

    if(strcmp($resultRow['Area'],"Hand" ) == 0){
        $exerciseAdditionQuery = "update handtargets set Repetition='$reps', Sequence='$seqs' where Exercise='$exerciseName'";
        $exerciseNameQueryResult = @mysqli_query($databaseConnection, $exerciseAdditionQuery) OR trigger_error($databaseConnection->error . "[$exerciseAdditionQuery]");
    }else{
        $exerciseAdditionQuery = "update wristtargets set Repetition='$reps', Sequence='$seqs' where Exercise='$exerciseName'";
        $exerciseNameQueryResult = @mysqli_query($databaseConnection, $exerciseAdditionQuery) OR trigger_error($databaseConnection->error . "[$exerciseAdditionQuery]");
    }
}