<?php
include('../../../../databaseConnection.php');

    $query = "select Movement, Target
                        FROM wristtargets
                        WHERE Exercise ='$Exercise' and Hand = '$SelectedHand' and PID = '$ID'";

    $queryResult = @mysqli_query($databaseConnection, $query) OR trigger_error($databaseConnection->error."[ $query]");

    $movement = array();
    $targets = array();

    while($resultRow = mysqli_fetch_assoc($queryResult)) {
        array_push($movement,$resultRow['Movement']);
        array_push($targets,$resultRow['Target']);
    }

    $results = array_combine($movement,$targets);

    $query = "select Repetition, Sequence
                            FROM wristtargets
                            WHERE Exercise ='$Exercise' and Hand = '$SelectedHand' and PID = '$ID' LIMIT 1";

    $queryResult = @mysqli_query($databaseConnection, $query) OR trigger_error($databaseConnection->error."[ $query]");

    $reps;
    $seq;

    if($resultRow = mysqli_fetch_assoc($queryResult)) {
        $reps = $resultRow['Repetition'];
        $seq = $resultRow['Sequence'];
    }
