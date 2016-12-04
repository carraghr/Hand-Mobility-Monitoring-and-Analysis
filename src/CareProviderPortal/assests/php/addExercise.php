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
        } else {

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

            $targetLocations = exerciseTargetLookup($databaseConnection, $exerciseName);

            $leftHand = getTargets('leftHand', $targetLocations, $form, 3);
            $rightHand = getTargets('rightHand', $targetLocations, $form, count($targetLocations) + 3 );

            if(count($leftHand) == 0  && count($rightHand) == 0 ){
                echo 'Error targets must be filled with at least one location above 0.';
                die();
            }else{
                for($index = 0; $index < count($leftHand);$index++){
                    if($leftHand[0]->target > 0 ){
                       submitExericse($databaseConnection, $PID, $exerciseName, 'left',$leftHand[0]->location,$leftHand[0]->target, $repetitions, $sequences);
                    }
                }
                for($index = 0; $index < count($rightHand);$index++){
                    submitExericse($databaseConnection, $PID, $exerciseName, 'right',$leftHand[0]->location,$leftHand[0]->target, $repetitions, $sequences);
                }
                echo $exerciseName;
            }
        }
    }else{
        echo 'Error Failed. Incorrect Send Method';
    }