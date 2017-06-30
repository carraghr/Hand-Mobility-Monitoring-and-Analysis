<?php
    header("Content-type: application/x-www-form-urlencoded");


    //get session id for client and then access to ensure that they are logged in on local computer.
    $SID = $_POST['PHPSESSID'];
    session_id($SID);
    session_start();


    //Check that patient is logged in through a session id.
    if(!isset($_SESSION['user_id'])){
        //need to echo an error
        echo "failed";
    }else {

        require('../../../databaseConnection.php');

        $PID = $_SESSION['user_id'];
        $PID = mysqli_real_escape_string($databaseConnection, trim($PID));


        //Get feedback for a Patient ID
        $query = "select Comment, DOF
                        FROM feedback
                        WHERE PID ='$PID' ORDER BY DOF DESC LIMIT 75";

        $queryResult = @mysqli_query($databaseConnection, $query) OR trigger_error($databaseConnection->error."[ $query]");

        $Hands = array();

        require_once('./Comments.php');

        $results = new Comments();

        //get each row from feedback query and format for front end.
        while($resultRow = mysqli_fetch_assoc($queryResult)) {
            $dateTime = new DateTime($resultRow['DOF']);
            $date = $dateTime->format('d/m/Y');
            $time = $dateTime->format('H:i');
            $results->addComment($date, $time,$resultRow['Comment']);
        }

        echo $results->exportExercises();
    }