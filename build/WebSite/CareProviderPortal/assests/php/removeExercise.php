<?php
    header("Content-type: application/x-www-form-urlencoded");

    if($_SERVER['REQUEST_METHOD']=='POST') {
        $SID = $_POST['PHPSESSID'];
        $PID = $_POST['PatientID'];
        $exercise = $_POST['Exercise'];

        session_id($SID);
        session_start();

        if (!isset($_SESSION['user_id'])) {
            echo 'Error Failed. Incorrect User';
            die();
        } else {
            require('../../../databaseConnection.php');

            $exerciseAdditionQuery = "select Area from exercises where Name = '$exercise'";

            $exerciseType = @mysqli_query($databaseConnection, $exerciseAdditionQuery) OR trigger_error($databaseConnection->error . "[$exerciseAdditionQuery]");
            $resultRow = mysqli_fetch_assoc($exerciseType);

            if(strcmp($resultRow['Area'],"Hand" ) == 0) {
                $table = "handtargets";
            }else{
                $table = "wristtargets";
            }

            $removeExerciseQuery = "delete from ".$table." where PID ='$PID' and Exercise ='$exercise'";
            $exerciseType = @mysqli_query($databaseConnection, $removeExerciseQuery) OR trigger_error($databaseConnection->error . "[$removeExerciseQuery]");

        }
    }else{
        echo 'Error Failed. Incorrect Send Method';
    }