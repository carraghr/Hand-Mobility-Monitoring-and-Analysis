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

        $query = "select NameLast,NameFirst,DOB
                        FROM Patient
                        WHERE PatientID ='$PID'";

        $queryResult = @mysqli_query($databaseConnection, $query) OR trigger_error($databaseConnection->error . "[ $query]");

        $results = array();


        while ($resultRow = mysqli_fetch_assoc($queryResult)) {
            $results['NameLast'] = $resultRow['NameLast'];
            $results['NameFirst'] = $resultRow['NameFirst'];
            $results['DOB'] = $resultRow['DOB'];
        }
        echo json_encode($results);
    }