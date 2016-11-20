<?php

    header("Content-type: application/x-www-form-urlencoded");

    $SID = $_POST['PHPSESSID'];

    session_id($SID);
    session_start();

    //require('./loginFunctions.php');
    if(!isset($_SESSION['user_id'])){
        //need to echo an error
        echo "failed";
    }else {

        require('../../../databaseConnection.php');

        $PID = $_SESSION['user_id'];

        $query = "select Exercise, Hand
                    FROM Targets
                    WHERE PID ='$PID' group by Hand";

        $queryResult = @mysqli_query($databaseConnection, $query) OR trigger_error($databaseConnection->error."[ $query]");

        $Hands = array();


        /*
         * In here split data by hand then by exercise
         */
        require_once('./HandExercises.php');

        $results = new HandExercises();

        while($resultRow = mysqli_fetch_assoc($queryResult)) {
            $results->addExercise($resultRow['Hand'],$resultRow['Exercise']);
        }
        echo $results->exportExercises();
    }