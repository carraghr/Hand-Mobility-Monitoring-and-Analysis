<?php

    function validateLoginDetails($databaseConnection, $username = '', $password = ''){

        $user = mysqli_real_escape_string($databaseConnection, trim($username));

        $pass = mysqli_real_escape_string($databaseConnection, trim($password));

        $salt = null;

        $saltQuery = "Select Salt
                      from careprovider 
                      where UserName = '$user'";

        $saltQueryResult = @mysqli_query($databaseConnection, $saltQuery) OR trigger_error($databaseConnection->error."[ $saltQueryResult]");
        if ($saltQueryResult) {
            if (mysqli_num_rows($saltQueryResult) == 1) {
                //get record
                $row = mysqli_fetch_array($saltQueryResult, MYSQLI_ASSOC);

                $salt=$row['Salt'];
            }
        }else{
            $error = array();
            $error[] = "Account could not be found on the system";
            return array(false,$error);
        }

        //get record
        // Retrieve information

        $hash = crypt($pass, $salt);

        $query = "Select StaffID, Level, NameFirst,NameLast 
                      from careprovider 
                      where UserName = '$user' and Pass = '$hash'";

        $queryResult = @mysqli_query($databaseConnection, $query) OR trigger_error($databaseConnection->error."[ $query]");

        if ($queryResult){
            if(mysqli_num_rows($queryResult) == 1){

                //get record
                $row = mysqli_fetch_array($queryResult,MYSQLI_ASSOC);

                if(strcmp($row['Level'], 'pro') !== 0){

                    $staffID = $row['StaffID'];

                    $query = "Select SupID
                                  from supervisor
                                  where '$staffID' = SID";

                    $queryResult = @mysqli_query($databaseConnection, $query) or trigger_error($databaseConnection->error."[ $query]");

                    if($queryResult){
                        if (mysqli_num_rows($queryResult) == 1) {

                            $additionAttribute = array('SupID' => '12328901');
                            $row = array_merge($row, $additionAttribute);

                        }
                    }else{
                        $error = array();
                        $error[] = "Account does not have supervisor";

                        return array(false,$error);
                    }

                }
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