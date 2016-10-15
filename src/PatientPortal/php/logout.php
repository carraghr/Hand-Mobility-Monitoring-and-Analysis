<?php
    session_start();
    require('loginFunctions.php');
    if(!isset($_SESSION['user_id'])){

        redirectUser();

    }else{
        $_SESSION = array();
        session_destroy();
        setcookie('PHPSESSID','',time()-3600,'/','',0,0);
    }

    redirectUser();
?>