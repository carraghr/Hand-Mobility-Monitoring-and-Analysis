<?php
    header("Content-type: application/x-www-form-urlencoded");

    $SID = $_POST['PHPSESSID'];

    session_id($SID);
    session_start();

    if(!isset($_SESSION['user_id'])){
        echo "failed";
    }else{

        require('../../../databaseConnection.php');

        $PID = $_POST['PatientID'];

        $exerciseNameQuery = "select Name
                  from Exercises
                  where Name not in (select Exercise from targets where PID='$PID')";

        $exerciseNameQueryResult = @mysqli_query($databaseConnection, $exerciseNameQuery) OR trigger_error($databaseConnection->error . "[$exerciseNameQuery]");

        require_once('./Exercises.php');

        $results = new Exercises();

        while($resultRow = mysqli_fetch_assoc($exerciseNameQueryResult)){

            $exerciseName = $resultRow['Name'];

            $exerciseTargetLocationsQuery = "select Location
                                     from ExerciseTargetLocations
                                     where Exercise = '$exerciseName'";

            $exerciseTargetLocationsQueryResult = @mysqli_query($databaseConnection, $exerciseTargetLocationsQuery) OR trigger_error($databaseConnection->error . "[$exerciseTargetLocationsQuery]");

            while($locationRow = mysqli_fetch_assoc($exerciseTargetLocationsQueryResult)){
                $results->addExercise($exerciseName, 0, 0, "left", $locationRow['Location'], 0);
                $results->addExercise($exerciseName, 0, 0, "right", $locationRow['Location'], 0);
            }
        }

        echo json_encode($results);
    }