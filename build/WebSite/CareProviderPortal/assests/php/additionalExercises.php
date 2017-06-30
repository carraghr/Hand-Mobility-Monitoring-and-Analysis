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

        $exerciseNameQuery = "select Name
                              from Exercises
                              where Name not in 
                                  (select Hand.Exercise  
                                   from HandTargets as Hand 
                                   where PID='$PID') 
                                  and Name not in
                                   (select Wrist.Exercise 
                                    from WristTargets as Wrist  
                                    where PID='$PID');";

        $exerciseNameQueryResult = @mysqli_query($databaseConnection, $exerciseNameQuery) OR trigger_error($databaseConnection->error . "[$exerciseNameQuery]");

        require_once('./Exercises.php');

        $results = new Exercises();

        while($resultRow = mysqli_fetch_assoc($exerciseNameQueryResult)){

            $exerciseName = $resultRow['Name'];

            $FindAreaQuery = "select Area from exercises where Name = '$exerciseName'";

            $FindAreaQuery = @mysqli_query($databaseConnection, $FindAreaQuery) OR trigger_error($databaseConnection->error . "[$FindAreaQuery]");
            $Area = mysqli_fetch_assoc($FindAreaQuery);

            if(strcmp($Area['Area'],"Hand" ) == 0){
                $exerciseTargetLocationsQuery = "select Location
                                     from HandExerciseTargetLocations
                                     where Exercise = '$exerciseName'";

                $exerciseTargetLocationsQueryResult = @mysqli_query($databaseConnection, $exerciseTargetLocationsQuery) OR trigger_error($databaseConnection->error . "[$exerciseTargetLocationsQuery]");

                while($locationRow = mysqli_fetch_assoc($exerciseTargetLocationsQueryResult)){
                    $results->addExercise($exerciseName, 0, 0, "Hand", "left", $locationRow['Location'], 0);
                    $results->addExercise($exerciseName, 0, 0, "Hand", "right", $locationRow['Location'], 0);
                }
            }else{
                $exerciseTargetLocationsQuery = "select Movement
                                     from WristExerciseTargetLocations
                                     where Exercise = '$exerciseName'";

                $exerciseTargetLocationsQueryResult = @mysqli_query($databaseConnection, $exerciseTargetLocationsQuery) OR trigger_error($databaseConnection->error . "[$exerciseTargetLocationsQuery]");

                while($locationRow = mysqli_fetch_assoc($exerciseTargetLocationsQueryResult)){
                    $results->addExercise($exerciseName, 0, 0, "Wrist", "left", $locationRow['Movement'], 0);
                    $results->addExercise($exerciseName, 0, 0, "Wrist", "right", $locationRow['Movement'], 0);
                }
            }


        }

        echo json_encode($results);
    }