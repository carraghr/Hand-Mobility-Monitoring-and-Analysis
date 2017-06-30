<?php
header("Content-type: application/x-www-form-urlencoded");

$SID = $_POST['PHPSESSID'];

session_id($SID);
session_start();

if(!isset($_SESSION['user_id'])){
    echo "failed";
}else{

    require('../../../databaseConnection.php');

    $PID = $_POST['PatientID'];
    $Exercise = $_POST['Exercise'];

    require_once('./Exercises.php');
    $FindAreaQuery = "select Area from exercises where Name = '".$Exercise['Name']."'";

    $FindAreaQuery = @mysqli_query($databaseConnection, $FindAreaQuery) OR trigger_error($databaseConnection->error . "[$FindAreaQuery]");
    $Area = mysqli_fetch_assoc($FindAreaQuery);

    $result = new Exercise($Exercise['Name'], $Exercise['reps'], $Exercise['seq'], $Area);


    if(strcmp($Area['Area'],"Hand" ) == 0){
        $type = "Location";
        $table = "HandExerciseTargetLocations";
    }else {
        $type = "Movement";
        $table = "WristExerciseTargetLocations";
    }

    $exerciseTargetLocationsQuery = "select ".$type."
                                     from ".$table."
                                     where Exercise = '".$Exercise['Name']."'";

    $exerciseTargetLocationsQueryResult = @mysqli_query($databaseConnection, $exerciseTargetLocationsQuery) OR trigger_error($databaseConnection->error . "[$exerciseTargetLocationsQuery]");

    $hands = array("left","right");

    while($locationRow = mysqli_fetch_assoc($exerciseTargetLocationsQueryResult)){
        for($handIndex = 0; $handIndex<count($hands); $handIndex++){
            if(array_key_exists($hands[$handIndex]."Hand", $Exercise)){
                $targets = count($Exercise[$hands[$handIndex]."Hand"]);
                $recorded = false;
                for($index = 0; $index < $targets; $index++){
                    if(strcmp($Exercise[$hands[$handIndex]."Hand"][$index]['location'], $locationRow[$type]) == 0){
                        $recorded = true;
                        break;
                    }
                }
                if($recorded){
                    $result->addTarget($hands[$handIndex],$locationRow[$type], $Exercise[$hands[$handIndex]."Hand"][$index]['target']);
                }else{
                    $result->addTarget($hands[$handIndex], $locationRow[$type], 0);
                }
            }else{
                $result->addTarget($hands[$handIndex], $locationRow[$type], 0);
            }
        }
    }

    echo json_encode($result);
}