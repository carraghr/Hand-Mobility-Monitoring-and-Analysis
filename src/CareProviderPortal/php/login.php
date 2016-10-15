<?php

    $PageTitle = 'Login to System';
    include ('../html/header.html');


    /*Check for form submission*/
    if ($_SERVER['REQUEST_METHOD'] == 'POST'){

        //Helper functions
        require ('loginFunctions.php');
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

            redirectUser('loggedIn.php');

        }else{
            $errors = $data;
            foreach($errors as $error){
                echo $error;
            }
        }

        mysqli_close($databaseConnection);

    }
?>

    <div class = "content">
        <div class = "loginBox">
            <div class = "LogIn_message">
                <p>Login into Care Provider Portal</p>
            </div>
            <form id = "careProviderLogin"  action = "login.php" accept-charset="utf-8" method="POST">
                <input type="text" name="username"  <?php if (isset($_POST['username'])) { echo 'value = ' . $_POST['username'];} else ' placeholder="Username" '; ?> required autofocus/>
                <br/>
                <input type="password" name="pass" placeholder="Password" required/>
                <br/>
                <input type="submit" name = "login" value ="Sign in" >
            </form>
        </div>
    </div>
<?php
include ('../html/footer.html');
?>