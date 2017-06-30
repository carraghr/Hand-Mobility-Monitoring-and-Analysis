<?php

    function validateLoginDetails($databaseConnection, $username = '', $password = ''){


        //format user input to remove risk of sql injection
        $user = mysqli_real_escape_string($databaseConnection, trim($username));
        $pass = mysqli_real_escape_string($databaseConnection, trim($password));

        $salt = null;

        //get salt of a password
        $saltQuery = "Select Salt
                      from Patient 
                      where UserName = '$user'";


        $saltQueryResult = @mysqli_query($databaseConnection, $saltQuery) OR trigger_error($databaseConnection->error."[ $saltQueryResult]");

        //get salt of password for user
        if ($saltQueryResult) {
            if (mysqli_num_rows($saltQueryResult) == 1) {
                //get salt from returned results
                $row = mysqli_fetch_array($saltQueryResult, MYSQLI_ASSOC);
                $salt = $row['Salt'];
            }
        }else{//if there is no salt there is no
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

        //get patient information and return it to caller
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