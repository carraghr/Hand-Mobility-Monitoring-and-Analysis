<?php

    $PageTitle = 'Login to System';

    /*Check for form submission*/
    if ($_SERVER['REQUEST_METHOD'] == 'POST'){

        //Helper functions
        require('loginFunctions.php');
        require ('../../../databaseConnection.php');

        //check the login
        list($check, $data) = validateLoginDetails($databaseConnection,$_POST['username'],$_POST['password']);

        //check if login details are right
        if ($check){
            //Set session data
            session_start();

            $PID = $data['PatientID'];
            $_SESSION['user_id'] = $PID;
            $_SESSION['name'] = $data['NameFirst']. " ". $data['NameLast'];

            $careProviderInfo = "Select CareProvider.NameFirst, CareProvider.NameLast 
                      from CareProvider
                      INNER JOIN Patient
                      where Patient.CPID = CareProvider.StaffID and '$PID' = Patient.PatientID";

            $careProviderInfoResult = @mysqli_query($databaseConnection, $careProviderInfo) OR trigger_error($databaseConnection->error."[ $careProviderInfo]");

            if ($careProviderInfoResult) {
                if (mysqli_num_rows($careProviderInfoResult) == 1) {

                    //get record
                    $row = mysqli_fetch_array($careProviderInfoResult, MYSQLI_ASSOC);

                    //return true and result
                    $_SESSION['consultant'] = $row['NameFirst'] . " " . $row['NameLast'];

                }
            }
        }else{
            $errors = $data;
            foreach($errors as $error){
                echo $error;
            }
        }

        mysqli_close($databaseConnection);
        redirectUser();
    }
?>