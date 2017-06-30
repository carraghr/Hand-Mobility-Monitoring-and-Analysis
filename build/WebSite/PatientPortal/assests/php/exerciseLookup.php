<?php

    header("Content-type: application/x-www-form-urlencoded");

    //get session id for client and then access to ensure that they are logged in on local computer.
    $SID = $_POST['PHPSESSID'];
    session_id($SID);
    session_start();

    if(!isset($_SESSION['user_id'])){
        //need to echo an error
        echo "failed";
    }else {

        require('../../../databaseConnection.php');

        $PID = $_SESSION['user_id'];

        $query = "select Exercise, Hand
                    FROM HandTargets
                    WHERE PID ='$PID' group by Hand, Exercise";

        $queryResult = @mysqli_query($databaseConnection, $query) OR trigger_error($databaseConnection->error."[ $query]");

        /*
         * In here split data by hand then by exercise
         */
        require_once('./HandExercises.php');

        $results = new HandExercises();

        while($resultRow = mysqli_fetch_assoc($queryResult)) {
            $results->addExercise($resultRow['Hand'],$resultRow['Exercise']);
        }

        $query = "select Exercise, Hand
                  FROM WristTargets
                  WHERE PID ='$PID' group by Hand, Exercise";

        $queryResult = @mysqli_query($databaseConnection, $query) OR trigger_error($databaseConnection->error."[ $query]");

        while($resultRow = mysqli_fetch_assoc($queryResult)) {
            $results->addExercise($resultRow['Hand'],$resultRow['Exercise']);
        }



        echo $results->exportExercises();
    }