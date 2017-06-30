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

    //echo json_encode($recordsOfResults);
    //die();

    foreach($recordsOfResults as $record){
        for($index = 0; $index < count($record); $index++){
            $rep = $record[$index]->rep;
            $seq = $record[$index]->sequence;
            $finger = $record[$index]->finger;
            $minimum = 1.0 * $record[$index]->minimum;
            $avg = $record[$index]->avg;
            $maximum = $record[$index]->maximum;
            $median = $record[$index]->median;

            $insertResultQuery = "insert into FingerSeparationExercise VALUES ('$PID','$date','$Hand','$rep','$seq','$finger','$minimum','$avg','$median','$maximum')";
            $flag = @mysqli_query($databaseConnection, $insertResultQuery) OR trigger_error($databaseConnection->error . "[ $flag ]");

            if (!$flag) {
                echo $flag;
            }
        }
    }

    echo $flag;
