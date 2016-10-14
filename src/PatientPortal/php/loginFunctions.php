<?php
    # Script containing functionallity of login process for a care provider.

    function redirectUser($page = 'LoginComplete.php'){

        $url = 'http://' . $_SERVER['HTTP_HOST'] . dirname($_SERVER['PHP_SELF']);

        //Because of \\ and // difference in OS need to remove
        $url = rtrim($url,'/\\');

        $url .= '/' . $page;

        //redirect happens here
        header("location: $url");
        exit(0);
    }

    /*
     * validate login details
     */
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

        $query = "Select PatientID 
                      from Patient 
                      where UserName = '$user' and Pass = '$hash'";

        $queryResult = @mysqli_query($databaseConnection, $query) OR trigger_error($databaseConnection->error."[ $query]");

        if ($queryResult){
            if(mysqli_num_rows($queryResult) == 1){

                //get record
                $row = mysqli_fetch_array($queryResult,MYSQLI_ASSOC);

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