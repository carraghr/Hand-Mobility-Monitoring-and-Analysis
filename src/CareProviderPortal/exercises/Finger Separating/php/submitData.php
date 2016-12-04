<?php
    header("Content-type: application/json");
    $JSON = json_decode(stripslashes(file_get_contents("php://input")));

    $SID = $JSON->PHPSESSID;
    $Hand = $JSON->SelectedHand;

    session_id($SID);
    session_start();

    require('../../../../assets/php/redirect.php');
    if(!isset($_SESSION['user_id'])){
        redirectUser('../../../../index.php');
    }

    require('../../../../databaseConnection.php');

    $recordsOfResults = $JSON->exerciseRecord;

    $date = "".  date('Y-m-d') ." ". gmdate("H:i:s",time());
    $PID = $_SESSION['user_id'];
    $flag = true;

    foreach($recordsOfResults as $record){
        $rep = $record[0]->rep;
        $seq = $record[0]->sequence;
        $finger = $record[0]->finger;
        $minimum = 1.0 * $record[0]->minimum;
        $avg = $record[0]->avg;
        $maximum = $record[0]->maximum;
        $median = $record[0]->median;

        $insertResultQuery = "insert into FingerSeparationExercise VALUES ('$PID','$date','$Hand','$rep','$seq','$finger','$minimum','$avg','$median','$maximum')";
        $flag = @mysqli_query($databaseConnection, $insertResultQuery) OR trigger_error($databaseConnection->error."[ $flag ]");

        if(!$flag){
            echo $flag;
        }
    }

    echo $flag;
