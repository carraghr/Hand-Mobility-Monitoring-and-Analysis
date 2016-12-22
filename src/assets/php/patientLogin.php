<?php

    function validateLoginDetails($databaseConnection, $username = '', $password = ''){

        $user = mysqli_real_escape_string($databaseConnection, trim($username));

        $pass = mysqli_real_escape_string($databaseConnection, trim($password));

        $salt = null;

        $saltQuery = "Select Salt
                      from Patient 
                      where UserName = '$user'";

        $saltQueryResult = @mysqli_query($databaseConnection, $saltQuery) OR trigger_error($databaseConnection->error."[ $saltQueryResult]");

        if ($saltQueryResult) {
            if (mysqli_num_rows($saltQueryResult) == 1) {
                //get salt from returned results
                $row = mysqli_fetch_array($saltQueryResult, MYSQLI_ASSOC);
                $salt = $row['Salt'];
            }
        }else{
            $error = array();
            $error[] = "Account could not be found on the system";
            return array(false,$error);
        }

        //get record
        // Retrieve information

        $hash = crypt($pass, $salt);

        $patientQuery = "Select PatientID, NameFirst, NameLast 
                          from Patient 
                          where UserName = '$user' and Pass = '$hash'";

        $patientQueryResult = @mysqli_query($databaseConnection, $patientQuery) OR trigger_error($databaseConnection->error."[ $patientQuery]");

        if ($patientQueryResult){
            if(mysqli_num_rows($patientQueryResult) == 1 ){

                //get record
                $row = mysqli_fetch_array($patientQueryResult,MYSQLI_ASSOC);

                //return true and result
                return array(true,$row);

            }else{
                $error = array();
                $error[] = "The username and password entered do not match";
                return array(false,$error);
            }
        }else{
            $error = array();
            $error[] = "Account could not be found on the system";
            return array(false,$error);
        }
    }