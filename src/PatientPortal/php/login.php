<?php

    $PageTitle = 'Login to System';
    include ('../html/header.html');


    /*Check for form submission*/
    if ($_SERVER['REQUEST_METHOD'] == 'POST'){

        //Helper functions
        require ('loginFunctions.php');
        require ('../../databaseConnection.php');

        //check the login
        list($check, $data) = validateLoginDetails($databaseConnection,$_POST['username'],$_POST['password']);

        //check if login details are right
        if ($check){
            //Set session data
            session_start();

            $_SESSION['user_id'] = $data['PatientID'];

            redirectUser('loggedIn.php');

        }else{
            $errors = $data;
            foreach($errors as $error){
                echo $error;
            }
        }

        mysqli_close($databaseConnection);

    }

    include ('../html/content.html');
    include ('../html/footer.html');
?>