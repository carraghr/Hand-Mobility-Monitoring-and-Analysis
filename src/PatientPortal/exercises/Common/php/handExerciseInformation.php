<?php

    include('../../../../databaseConnection.php');

    $query = "select Location, Target
                    FROM HandTargets
                    WHERE Exercise ='$Exercise' and Hand = '$SelectedHand' and PID = '$ID'";

    $queryResult = @mysqli_query($databaseConnection, $query) OR trigger_error($databaseConnection->error."[ $query]");

    $loc = array();
    $targets = array();

    while($resultRow = mysqli_fetch_assoc($queryResult)) {
        array_push($loc,$resultRow['Location']);
        array_push($targets,$resultRow['Target']);
    }

    $results = array_combine($loc,$targets);

    $query = "select Repetition, Sequence
                        FROM HandTargets
                        WHERE Exercise ='$Exercise' and Hand = '$SelectedHand' and PID = '$ID' LIMIT 1";

    $queryResult = @mysqli_query($databaseConnection, $query) OR trigger_error($databaseConnection->error."[ $query]");

    $reps;
    $seq;

    if($resultRow = mysqli_fetch_assoc($queryResult)) {
        $reps = $resultRow['Repetition'];
        $seq = $resultRow['Sequence'];
    }
