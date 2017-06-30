<?php
    header("Content-type: application/x-www-form-urlencoded");

    $SID = $_POST['PHPSESSID'];

    session_id($SID);
    session_start();


    if(!isset($_SESSION['user_id'])){
        //need to echo an error
        echo "failed";
    }else {

        require('../../../databaseConnection.php');

        $PID = $_POST['PatientID'];

        $query = "select Comment, DOF
                        FROM feedback
                        WHERE PID ='$PID' ORDER BY DOF DESC LIMIT 75";

        $queryResult = @mysqli_query($databaseConnection, $query) OR trigger_error($databaseConnection->error."[ $query]");

        $Hands = array();

        require_once('./Comments.php');

        $results = new Comments();

        while($resultRow = mysqli_fetch_assoc($queryResult)) {
            $dateTime = new DateTime($resultRow['DOF']);
            $date = $dateTime->format('d/m/Y');
            $time = $dateTime->format('H:i');
            $results->addComment($date, $time,$resultRow['Comment']);
        }

        echo $results->exportExercises();
    }