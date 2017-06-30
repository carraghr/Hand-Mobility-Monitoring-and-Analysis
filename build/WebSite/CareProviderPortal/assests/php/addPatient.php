<?php
header("Content-type: application/x-www-form-urlencoded");

if($_SERVER['REQUEST_METHOD']=='POST') {
    $SID = $_POST['PHPSESSID'];

    session_id($SID);
    session_start();

    if (!isset($_SESSION['user_id'])) {
        echo 'Error Failed. Incorrect User';
        die();
    }else{
        require_once('../../../databaseConnection.php');

        $form = $_POST['form'];

        $firstName = $form[0]['value'];
        $lastName = $form[1]['value'];
        $PID = $form[2]['value'];
        $DOB = $form[3]['value'];
        $error = array();

        //echo array(false,$error);
        //die()
        if(checkPID($databaseConnection, $PID)){

            $username = $form[4]['value'];
            $password = $form[5]['value'];
            $passwordConformation = $form[6]['value'];
            if(checkUsername($databaseConnection, $username)){
                if(strcmp($password,$passwordConformation) == 0){
                    if(strcmp($_SESSION['Level'], 'pro') == 0){
                        $CPID = $_SESSION['user_id'];
                    }else{
                        $CPID = $_SESSION['SupID'];
                    }

                    //add patient to table
                    $salt = '$6$rounds=5000$'.  bin2hex(random_bytes (16)).'$';
                    $hash = crypt($password, $salt);
                    $query = "insert into Patient values ('$firstName','$lastName','$PID','$CPID','$DOB','$username','$hash','$salt')";
                    $queryResult = @mysqli_query($databaseConnection, $query) OR trigger_error($databaseConnection->error."[ $query]");
                    $validUser = true;
                }else{
                    array_push($error,"Passwords do not match!");
                    $validUser = false;
                }
            }else{
                array_push($error,"Username already on system");
                $validUser = false;
            }
        }else{
            array_push($error,"Patient already on system");
            $validUser = false;
        }
        echo json_encode(array("valid"=> $validUser, "errors" => $error));
    }
}else{
    echo 'Error Failed. Incorrect Send Method';
}

function checkPID($databaseConnection, $PID){
    $query = "select PatientID from Patient where '$PID' = PatientID";

    $QueryResult = @mysqli_query($databaseConnection, $query) OR trigger_error($databaseConnection->error . "[$query]");

    return mysqli_num_rows($QueryResult) == 0;
}

function checkUsername($databaseConnection, $UserName){
    $query = "select UserName from Patient where '$UserName' = UserName";

    $QueryResult = @mysqli_query($databaseConnection, $query) OR trigger_error($databaseConnection->error . "[$query]");

    return mysqli_num_rows($QueryResult) == 0;
}