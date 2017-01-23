<?php

header("Content-type: application/x-www-form-urlencoded");

if($_SERVER['REQUEST_METHOD']=='POST') {
    $SID = $_POST['PHPSESSID'];
    $PID = $_POST['PatientID'];

    session_id($SID);
    session_start();

    if (!isset($_SESSION['user_id'])) {
        echo 'Error Failed. Incorrect User';
        die();
    } else {

        $form = $_POST['form'];
        $selectedExercise = json_decode($_POST['exercise'], true);

        $validation = formValidation($form, $selectedExercise);

        if(!(bool)$validation['valid']){
            echo json_encode($validation);
            die();
        }

        $table = "";

        switch ($form[0]['value']) {
            case "Finger Separating":
                $table = "FingerSeparationExercise";
                break;
            case "Tip to Tip":
                $table = "ThumbFingerTipExercise";
                break;
            case "Wave":
                $table = "WaveExercise";
                break;
            default:
                $error = array("Unable to get exercise ". $form[0]['value'] ."! Please try again.");
                echo json_encode(array("valid"=> false, "errors" => $error));
                die();
        }

        require('../../../databaseConnection.php');

        $movementOrLocation = exerciseLocationOrMovement($form[0]['value'], $databaseConnection);

        if(strcmp($movementOrLocation,"Location") ==0 ){
            if(strcmp($validation['location'], "all") == 0){
                $whereLocation = "";
            }else{
                $whereLocation = "Location = '" . $validation['location']."'";
            }
            $selectLocation = "Location";
        }else{
            if(strcmp($validation['location'], "all") == 0){
                $whereLocation = "";
            }else{
                $whereLocation = "Movement = '" . $validation['location']."' ";
            }
            $selectLocation = "Movement";
        }

        if($validation['allRepetition']){
            $whereRepetition = "";
        }else{
            $whereRepetition = "Repetition = '" .$validation['repetitionIndex']."' " ;
        }
        if($validation['allSequences']){
            $whereSequences = "";
        }else{
            $whereSequences = "Sequence = '" .$validation['sequenceIndex']."' " ;
        }

        $query = "select DOE, " . $validation['measurement'] . ", Repetition, Sequence, ". $selectLocation. " from " . $table;

        $query = str_replace(array(", , ,",", ,",",  from",", from"),array(",",","," from"," from"),$query);

        $query = $query . " where PID = '" . $PID . "' and Date(DOE) between STR_TO_DATE( '".$validation['startDate']."', '%Y-%m-%d') and STR_TO_DATE('".$validation['endDate'] ."', '%Y-%m-%d') and " .$whereRepetition ." and " . $whereSequences . " and ".$whereLocation ." ";

        $query = str_replace(array("and  and  ", "and  ", "  "),array("","",""),$query);
        $query = $query . " order by DOE, Repetition, Sequence;";


        $recordQuery = @mysqli_query($databaseConnection, $query) OR trigger_error($databaseConnection->error . "[$query]");

        require('./TableObject.php');

        $dateTime = new DateTime($validation['startDate']. '00:00:00');
        $table = new Table();

        $table->setHeader(array("Date and Time of Exercise","Repetition","Sequence",$selectLocation,$validation['measurement']));

        while($resultRow = mysqli_fetch_assoc($recordQuery)){
           $table->addRow(array($resultRow['DOE'],$resultRow['Repetition'],$resultRow['Sequence'],$resultRow[$movementOrLocation],(float)$resultRow[$validation['measurement']]));
        }
        if($table->size() == 0){
            $valid = false;
            $errors = array("Error: Can not find results for query!");
        }else{
            $valid = true;
            $errors = array();
        }
        echo json_encode(array("valid"=>$valid ,"errors"=>$errors, "tableInfo"=>$table));
        die();
    }
}else{
    echo 'Error Failed. Incorrect Send Method';
}

function exerciseLocationOrMovement($exerciseName, $databaseConnection){
    $exerciseQuery = "select Area from exercises where Name = '$exerciseName'";
    $exerciseType = @mysqli_query($databaseConnection, $exerciseQuery) OR trigger_error($databaseConnection->error . "[$exerciseQuery]");
    $resultRow = mysqli_fetch_assoc($exerciseType);
    if(strcmp($resultRow['Area'],"Hand" ) == 0){
        return "Location";
    }else{
        return "Movement";
    }
}

function formValidation($form, $exercise){

    $correctName = strcmp($form[0]['value'],$exercise['Name']) == 0;
    $hand = $form[1]['value'];

    $allRepetition = false;
    $allSequences = false;
    $repetitionIndex = 0;
    $sequenceIndex = 0;
    $repInRange = true;
    $seqInRange = true;

    $startDateInRange = true;
    $endDateInRange = true;
    $dateOrder = true;
    $startDate ="";
    $endDate ="";

    if(strcmp($hand,'Left') == 0){
        $location = $form[2]['value'];
    }else{
        $location = $form[3]['value'];
    }

    $measurement = $form[4]['value'];

    $error  = array();

    if(strcmp($form[5]['name'],'allRepetition') != 0){//request is not asking for all repetitions on exercise
        $repInRange = $form[5]['value'] >= 1 && $form[5]['value'] <= $exercise['reps'];
        $repetitionIndex = $form[5]['value'];
        if(strcmp($form[6]['name'],'allSequences') != 0){//request is not asking for all seq in exercise seqs
            $seqInRange = $form[6]['value'] >= 1 && $form[6]['value'] <= $exercise['seq'];
            $sequenceIndex = $form[6]['value'];
        }else{
            $allSequences = true;
        }
    }
    else if(strcmp($form[7]['name'],'allSequences') != 0){//request is asking for all reps but not all all sequences
        $seqInRange = $form[7]['value'] >= 1 && $form[7]['value'] <= $exercise['seq'];
        $sequenceIndex = $form[7]['value'];
        $allRepetition = true;
    }else{
        $allRepetition = true;
        $allSequences = true;
    }

    $currentDateInTime = strtotime(date('y-m-d'));

    for($dateIndex = 7; $dateIndex<11;$dateIndex++){
        if(strcmp($form[$dateIndex]['name'],'startDate') == 0){
            $startDate = $form[$dateIndex]['value'];
            $endDate = $form[$dateIndex+1]['value'];
            $startDateInRange = (strtotime($form[$dateIndex]['value']) <= $currentDateInTime);
            $endDateInRange = (strtotime($form[$dateIndex+1]['value']) <= $currentDateInTime);
            $dateOrder =  (strtotime($form[$dateIndex]['value']) <= strtotime($form[$dateIndex+1]['value']));
        }
    }

    if(!$correctName){
        array_push($error,'Error: Incorrect exercise submitted');
    }
    if(!$repInRange){
        array_push($error,'Error: Selected repetition is not within range!');
    }
    if(!$seqInRange){
        array_push($error,'Error: Selected sequence is not within range!');
    }
    if(!$startDateInRange){
        array_push($error,'Error: Start date is in the future!');
    }
    if(!$endDateInRange){
        array_push($error,'Error: End date is in the future!');
    }
    if(!$dateOrder){
        array_push($error,'Error: start date mush be before end Date!');
    }

    return array("valid"=> (count($error) == 0), "errors" => $error, "allRepetition"=> $allRepetition, "allSequences"=> $allSequences,"repetitionIndex"=>$repetitionIndex, "sequenceIndex"=>$sequenceIndex, "location"=>$location, "measurement"=>$measurement, "startDate"=>$startDate, "endDate"=>$endDate);
}