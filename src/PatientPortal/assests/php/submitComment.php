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

        $PID = $_SESSION['user_id'];
        $comment = $_POST['Comment'];
        $DateTime = date("Y-m-d H:i:s");
        $query = "insert into feedback values ('$PID','$DateTime','$comment')";
        $queryResult = @mysqli_query($databaseConnection, $query) OR trigger_error($databaseConnection->error."[ $query]");

        echo $queryResult;
    }