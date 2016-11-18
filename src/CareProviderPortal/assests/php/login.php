<?php
    /*Check for form submission*/
    if ($_SERVER['REQUEST_METHOD'] == 'POST'){

        //Helper functions
        require('loginFunctions.php');
        require ('../../databaseConnection.php');

        //check the login
        list($check, $data) = validateLoginDetails($databaseConnection,$_POST['username'],$_POST['pass']);

        //check if login details are right
        if ($check){
            //Set session data
            session_start();

            $_SESSION['user_id'] = $data['StaffID'];
            $_SESSION['Level'] = $data['Level'];
            if(strcmp($data['Level'], 'pro') !== 0){
                $_SESSION['SupID'] = $data['SupID'];

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