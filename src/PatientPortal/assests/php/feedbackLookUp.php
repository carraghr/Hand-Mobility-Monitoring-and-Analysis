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

        $query = "select Comment, DOF
                        FROM feedback
                        WHERE PID ='$PID' LIMIT 25";

        $queryResult = @mysqli_query($databaseConnection, $query) OR trigger_error($databaseConnection->error."[ $query]");

        $Hands = array();

        require_once('./Comments.php');

        $results = new Comments();

        while($resultRow = mysqli_fetch_assoc($queryResult)) {
            $dateTime = new DateTime($resultRow['DOF']);
            $date = $dateTime->format('Y-m-d');
            $time = $dateTime->format('H:i:s');
            $results->addComment($date, $time,$resultRow['Comment']);
        }

        echo $results->exportExercises();
    }