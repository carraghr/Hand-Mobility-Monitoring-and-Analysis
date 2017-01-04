<?php
    header("Content-type: application/x-www-form-urlencoded");

    $SID = $_POST['PHPSESSID'];

    session_id($SID);
    session_start();

    if(!isset($_SESSION['user_id'])){
        echo "failed";
    }else {

        require('../../../databaseConnection.php');

        $PID = $_POST['PatientID'];

        $query = "select Exercise, Hand, Location, Target, Repetition,Sequence
                        FROM HandTargets
                        WHERE PID ='$PID'";

        $queryResult = @mysqli_query($databaseConnection, $query) OR trigger_error($databaseConnection->error . "[ $query]");

        require_once('./Exercises.php');

        $results = new Exercises();
        while($resultRow = mysqli_fetch_assoc($queryResult)) {

            $results->addExercise($resultRow['Exercise'], $resultRow['Repetition'], $resultRow['Sequence'], $resultRow['Hand'], $resultRow['Location'], $resultRow['Target']);
        }

        $query = "select Exercise, Hand, Movement, Target, Repetition,Sequence
                        FROM WristTargets
                        WHERE PID ='$PID'";

        $queryResult = @mysqli_query($databaseConnection, $query) OR trigger_error($databaseConnection->error . "[ $query]");

        while($resultRow = mysqli_fetch_assoc($queryResult)){

            $results->addExercise($resultRow['Exercise'], $resultRow['Repetition'], $resultRow['Sequence'], $resultRow['Hand'], $resultRow['Movement'], $resultRow['Target']);
        }
        echo json_encode($results);
    }